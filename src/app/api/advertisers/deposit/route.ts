import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const { advertiserId, amountCents } = await req.json();
  if (!advertiserId || !amountCents) return NextResponse.json({ error: 'advertiserId and amountCents required' }, { status: 400 });
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ quantity: 1, price_data: { currency: 'usd', unit_amount: amountCents, product_data: { name: 'Advertiser deposit' } } }],
      success_url: `${req.nextUrl.origin}/advertiser?deposit=success`,
      cancel_url: `${req.nextUrl.origin}/advertiser?deposit=cancel`,
      metadata: { advertiserId }
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'stripe_error' }, { status: 500 });
  }
}


