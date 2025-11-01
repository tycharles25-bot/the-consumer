import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

// Get advertiser balance
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const advertiserId = searchParams.get('advertiserId');
    
    if (!advertiserId) {
      return NextResponse.json({ error: 'advertiserId required' }, { status: 400 });
    }

    const advertiser = db.advertisers.get(advertiserId);
    
    if (!advertiser) {
      return NextResponse.json({ 
        balance: 0,
        balanceCents: 0,
        exists: false 
      });
    }

    return NextResponse.json({
      balance: advertiser.balanceCents / 100,
      balanceCents: advertiser.balanceCents,
      exists: true,
      name: advertiser.name
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to get balance' }, { status: 500 });
  }
}


