import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(req: NextRequest, { params }: { params: Promise<{ advertiserId: string }> }) {
  const { advertiserId } = await params;
  
  if (!advertiserId) {
    return NextResponse.json({ error: 'Advertiser ID required' }, { status: 400 });
  }

  // Get all creatives for this advertiser
  // advertiserId could be either business name (from ad_businessName) or phone (from sess_uid)
  const creatives = Array.from(db.creatives.values())
    .filter(c => c.advertiserId === advertiserId)
    .map(c => ({
      id: c.id,
      title: c.title || 'Untitled Ad',
      description: c.description || '',
      status: c.status,
      analytics: c.analytics || {
        totalViews: 0,
        totalQuizAttempts: 0,
        totalCorrect: 0,
        averageScore: 0
      }
    }));

  return NextResponse.json({ campaigns: creatives });
}

