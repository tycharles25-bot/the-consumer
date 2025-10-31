import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    // Get advertiserId from query or could get from session/auth
    const { searchParams } = new URL(req.url);
    const advertiserId = searchParams.get('advertiserId');
    
    if (!advertiserId) {
      return NextResponse.json({ error: 'advertiserId required' }, { status: 400 });
    }

    // Get all creatives for this advertiser
    const allCreatives = Array.from(db.creatives.values());
    const myCreatives = allCreatives.filter(c => c.advertiserId === advertiserId);
    
    // Return with status information
    const ads = myCreatives.map(c => ({
      id: c.id,
      title: c.title || 'Untitled Ad',
      description: c.description || '',
      status: c.status,
      payoutPer: c.payoutPer || 25,
      advertiserUrl: c.advertiserUrl,
      analytics: c.analytics || {
        totalViews: 0,
        totalQuizAttempts: 0,
        totalCorrect: 0,
        averageScore: 0
      }
    }));
    
    return NextResponse.json({ ads });
  } catch (e: any) {
    console.error('Error fetching my ads:', e);
    return NextResponse.json({ error: e?.message || 'Failed to fetch ads' }, { status: 500 });
  }
}
