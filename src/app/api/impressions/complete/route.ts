import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';
import { sendViewerEmail } from '@/lib/postmark';

const counts = new Map<string, { date: string; c: number }>();

export async function POST(req: NextRequest) {
  const { impressionId, userId, creativeId, userEmail, quizCorrect } = await req.json();
  if (!impressionId || !userId || !creativeId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  
  // Check if user has already earned from this ad
  const completedAds = db.completedAds.get(userId) || new Set();
  if (completedAds.has(creativeId)) {
    return NextResponse.json({ 
      error: 'You have already earned from this ad. You can watch and take the quiz again, but will not be paid twice.', 
      alreadyEarned: true 
    }, { status: 200 });
  }
  
  // Only credit if quiz answers are correct
  if (!quizCorrect) {
    return NextResponse.json({ error: 'Quiz answers must be correct to earn reward', correct: false }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const rec = counts.get(userId);
  if (!rec || rec.date !== today) counts.set(userId, { date: today, c: 0 });
  const cur = counts.get(userId)!;
  if (cur.c >= 4) return NextResponse.json({ error: 'Daily view cap reached' }, { status: 429 });
  cur.c++;

  const u = db.users.get(userId) || { id: userId, phone: userId, balanceCents: 0, pendingCents: 0 };
  u.balanceCents += 25; // $0.25
  db.users.set(userId, u);

  // Mark this ad as completed for this user
  if (!db.completedAds.has(userId)) {
    db.completedAds.set(userId, new Set());
  }
  db.completedAds.get(userId)!.add(creativeId);

  try {
    if (userEmail) await sendViewerEmail(userEmail, 'Thanks for watching on The Consumer', `<p>You earned $0.25 for watching and answering correctly!</p>`);
  } catch {}

  // Update analytics for the creative
  const creative = db.creatives.get(creativeId);
  if (creative) {
    if (!creative.analytics) {
      creative.analytics = { totalViews: 0, totalQuizAttempts: 0, totalCorrect: 0, averageScore: 0 };
    }
    creative.analytics.totalViews++;
    creative.analytics.totalQuizAttempts++;
    creative.analytics.totalCorrect++;
    creative.analytics.averageScore = (creative.analytics.totalCorrect / creative.analytics.totalQuizAttempts) * 100;
    db.creatives.set(creativeId, creative);
  }

  return NextResponse.json({ ok: true, remainingToday: 4 - cur.c, balanceCents: u.balanceCents, advertiserUrl: creative?.advertiserUrl });
}


