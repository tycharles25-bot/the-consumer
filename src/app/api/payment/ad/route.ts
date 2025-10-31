import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { db } from '@/lib/store';

export const maxDuration = 30; // 30 seconds for Stripe API

export async function POST(req: NextRequest) {
  const { advertiserId, amountCents, payoutPer: _payoutPerIgnored, videoUrl, creativeId } = await req.json();
  const payoutPer = 25; // fixed $0.25 per viewer
  
  if (!advertiserId || !amountCents || !videoUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (amountCents < 1000) { // $10 minimum
    return NextResponse.json({ error: 'Minimum payment is $10' }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    
    // Calculate fee (5% of total)
    const feeCents = Math.ceil(amountCents * 0.05);
    const remainingCents = amountCents - feeCents;

    // Create or update advertiser
    let advertiser = db.advertisers.get(advertiserId);
    if (!advertiser) {
      advertiser = { id: advertiserId, name: advertiserId, balanceCents: 0 };
      db.advertisers.set(advertiserId, advertiser);
    }

    // Create or update creative
    if (creativeId) {
      let creative = db.creatives.get(creativeId);
      if (!creative) {
        creative = {
          id: creativeId,
          advertiserId,
          videoUrl,
          status: 'approved',
          payoutPer // Store the payout amount per viewer (fixed)
        };
        db.creatives.set(creativeId, creative);
      } else {
        creative.payoutPer = payoutPer;
        db.creatives.set(creativeId, creative);
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            product_data: {
              name: 'Ad Campaign',
              description: `Ad campaign with $${(payoutPer / 100).toFixed(2)} per viewer payout`
            }
          }
        }
      ],
      success_url: `${req.nextUrl.origin}/post/create/done`,
      cancel_url: `${req.nextUrl.origin}/post/create/payment`,
      metadata: {
        advertiserId,
        creativeId: creativeId || '',
        payoutPer: payoutPer.toString(),
        totalCents: amountCents.toString(),
        feeCents: feeCents.toString(),
        remainingCents: remainingCents.toString()
      }
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (e: any) {
    console.error('Payment error:', e);
    return NextResponse.json({ error: e?.message || 'Payment processing failed' }, { status: 500 });
  }
}

