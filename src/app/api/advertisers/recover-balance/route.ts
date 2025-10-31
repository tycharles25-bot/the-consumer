import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { db } from '@/lib/store';

// Recover advertiser balance from Stripe payment history
export async function POST(req: NextRequest) {
  try {
    const { advertiserId } = await req.json();
    
    if (!advertiserId) {
      return NextResponse.json({ error: 'advertiserId required' }, { status: 400 });
    }

    const stripe = getStripe();
    
    // Search Stripe for successful payments with this advertiserId in metadata
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: 'complete',
    });

    let totalRecovered = 0;
    let paymentCount = 0;
    const payments: any[] = [];

    for (const session of sessions.data) {
      if (session.metadata && session.metadata.advertiserId === advertiserId && session.payment_status === 'paid') {
        const amountCents = parseInt(session.metadata.totalCents || '0');
        const feeCents = parseInt(session.metadata.feeCents || '0');
        const remainingCents = amountCents - feeCents;
        
        payments.push({
          sessionId: session.id,
          amount: amountCents / 100,
          remaining: remainingCents / 100,
          createdAt: new Date(session.created * 1000).toISOString(),
          creativeId: session.metadata.creativeId || 'unknown'
        });
        
        totalRecovered += remainingCents;
        paymentCount++;
      }
    }

    // Restore balance to advertiser
    if (totalRecovered > 0) {
      let advertiser = db.advertisers.get(advertiserId);
      if (!advertiser) {
        advertiser = { id: advertiserId, name: advertiserId, balanceCents: 0 };
      }
      
      advertiser.balanceCents += totalRecovered;
      db.advertisers.set(advertiserId, advertiser);
      
      return NextResponse.json({
        success: true,
        recovered: totalRecovered / 100,
        balance: advertiser.balanceCents / 100,
        payments: paymentCount,
        paymentDetails: payments
      });
    }

    return NextResponse.json({
      success: false,
      message: 'No payments found for this advertiser',
      payments: 0
    });
  } catch (e: any) {
    console.error('Recovery error:', e);
    return NextResponse.json({ error: e?.message || 'Failed to recover balance' }, { status: 500 });
  }
}

