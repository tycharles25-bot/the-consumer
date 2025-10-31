import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET() {
  // Return ALL creatives regardless of status (so user can see their paid ads)
  console.log(`📊 GET /api/creatives/all - Database has ${db.creatives.size} creatives`);
  if (db.creatives.size > 0) {
    const ids = Array.from(db.creatives.keys());
    console.log(`📋 Creative IDs:`, ids);
  }
  
  const creatives = Array.from(db.creatives.values()).map(c => ({
    id: c.id,
    advertiserId: c.advertiserId,
    title: c.title || 'Untitled Ad',
    description: c.description || '',
    status: c.status || 'pending',
    payoutPer: c.payoutPer || 25,
    advertiserUrl: c.advertiserUrl,
    videoUrl: c.videoUrl,
    thumbnail: c.thumbnail,
    analytics: c.analytics || {
      totalViews: 0,
      totalQuizAttempts: 0,
      totalCorrect: 0,
      averageScore: 0
    }
  }));

  // Sort by most recent first (assuming id contains timestamp)
  creatives.sort((a, b) => {
    const aTime = parseInt(a.id.split('_').pop() || '0');
    const bTime = parseInt(b.id.split('_').pop() || '0');
    return bTime - aTime;
  });

  return NextResponse.json({ creatives });
}

