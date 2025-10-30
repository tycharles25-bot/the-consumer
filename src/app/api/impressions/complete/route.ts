import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';
import { sendViewerEmail } from '@/lib/postmark';

const counts = new Map<string, { date: string; c: number }>();

export async function POST(req: NextRequest) {
  const { impressionId, userId, creativeId, userEmail, quizCorrect } = await req.json();
  if (!impressionId || !userId || !creativeId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  
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

  try {
    if (userEmail) await sendViewerEmail(userEmail, 'Thanks for watching on The Consumer', `<p>You earned $0.25 for watching and answering correctly!</p>`);
  } catch {}

  const creative = db.creatives.get(creativeId);
  return NextResponse.json({ ok: true, remainingToday: 4 - cur.c, balanceCents: u.balanceCents, advertiserUrl: creative?.advertiserUrl });
}


