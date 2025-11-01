import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { db } from '@/lib/store';

// Recover lost creatives from Stripe payment metadata
export async function POST(req: NextRequest) {
  try {
    const { advertiserId } = await req.json();
    
    if (!advertiserId) {
      return NextResponse.json({ error: 'advertiserId required' }, { status: 400 });
    }

    const stripe = getStripe();
    
    // Search Stripe for successful payments with this advertiserId
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: 'complete',
    });

    const recoveredCreatives: any[] = [];
    const missingCreatives: any[] = [];

    for (const session of sessions.data) {
      if (session.metadata && session.metadata.advertiserId === advertiserId && session.payment_status === 'paid') {
        const creativeId = session.metadata.creativeId;
        
        if (!creativeId) continue;
        
        // Check if creative already exists
        if (db.creatives.get(creativeId)) {
          console.log(`✅ Creative ${creativeId} already exists`);
          continue;
        }
        
        // Try to recover creative - we'll create a minimal version
        // The video should still be in R2 with key pattern: creatives/{uuid}
        // But we don't have the exact UUID, so we'll need to reconstruct from creativeId
        // Actually, creativeId is like "cr_1234567890" - we can't get the R2 key from that
        
        // For now, create a placeholder creative that needs manual fixing
        const recoveredCreative = {
          id: creativeId,
          advertiserId,
          videoUrl: 'NEEDS_RECOVERY', // Video is in R2 but we lost the exact key
          status: 'approved' as const,
          payoutPer: parseInt(session.metadata.payoutPer || '25'),
          title: `Recovered Ad (${new Date(session.created * 1000).toLocaleDateString()})`,
          description: 'This ad was recovered from Stripe. Video may need to be re-uploaded.',
          advertiserUrl: session.metadata.advertiserUrl || undefined,
        };
        
        db.creatives.set(creativeId, recoveredCreative);
        recoveredCreatives.push({
          creativeId,
          sessionId: session.id,
          amount: parseInt(session.metadata.totalCents || '0') / 100,
          createdAt: new Date(session.created * 1000).toISOString()
        });
        
        console.log(`✅ Recovered creative ${creativeId} from Stripe payment ${session.id}`);
      }
    }

    return NextResponse.json({
      success: true,
      recovered: recoveredCreatives.length,
      creatives: recoveredCreatives,
      message: recoveredCreatives.length > 0 
        ? `Recovered ${recoveredCreatives.length} ad(s). Videos may need to be re-uploaded.`
        : 'No ads found to recover.'
    });
  } catch (e: any) {
    console.error('Recovery error:', e);
    return NextResponse.json({ error: e?.message || 'Failed to recover creatives' }, { status: 500 });
  }
}


