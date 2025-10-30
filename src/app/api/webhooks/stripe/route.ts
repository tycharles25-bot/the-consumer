import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { db } from '@/lib/store';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !env.stripeWebhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, env.stripeWebhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata?.advertiserId && metadata?.creativeId) {
      // Add funds to advertiser account
      const advertiser = db.advertisers.get(metadata.advertiserId);
      if (advertiser) {
        const amountCents = parseInt(metadata.totalCents || '0');
        const feeCents = parseInt(metadata.feeCents || '0');
        const remainingCents = parseInt(metadata.remainingCents || '0');
        
        advertiser.balanceCents += remainingCents;
        db.advertisers.set(metadata.advertiserId, advertiser);

        // Update creative with payment info
        const creative = db.creatives.get(metadata.creativeId);
        if (creative) {
          creative.payoutPer = parseInt(metadata.payoutPer || '0');
          db.creatives.set(metadata.creativeId, creative);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}

