import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET() {
  // Return all creatives for now
  const creatives = Array.from(db.creatives.values()).map(c => ({
    id: c.id,
    advertiserId: c.advertiserId,
    title: c.title,
    description: c.description,
    status: c.status,
    analytics: c.analytics || {
      totalViews: 0,
      totalQuizAttempts: 0,
      totalCorrect: 0,
      averageScore: 0
    }
  }));

  return NextResponse.json({ creatives });
}

