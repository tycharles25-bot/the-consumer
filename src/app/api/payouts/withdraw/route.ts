import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { db } from '@/lib/store';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const { userId, amountCents, email, paymentMethodId } = await req.json();
  if (!userId || !amountCents || !email) return NextResponse.json({ error: 'userId, amountCents, email required' }, { status: 400 });
  
  // Minimum $5
  if (amountCents < 500) return NextResponse.json({ error: 'Minimum withdrawal is $5.00' }, { status: 400 });
  
  const user = db.users.get(userId);
  if (!user) return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
  if (user.balanceCents < amountCents) return NextResponse.json({ error: 'insufficient_funds' }, { status: 400 });

  try {
    const stripe = getStripe();
    
    // Create a payment intent for the user's withdrawal
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        userId,
        type: 'withdrawal'
      }
    });

    // Deduct from user balance
    user.balanceCents -= amountCents;
    db.users.set(userId, user);
    
    // Return client secret for frontend confirmation
    return NextResponse.json({ 
      ok: true, 
      clientSecret: paymentIntent.client_secret,
      amount: amountCents / 100
    });
  } catch (e: any) {
    console.error('Stripe payout error:', e);
    return NextResponse.json({ error: e?.message || 'Payout processing failed' }, { status: 500 });
  }
}


