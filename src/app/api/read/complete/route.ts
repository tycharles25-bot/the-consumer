import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { postId, userId, userEmail } = await req.json();
  if (!postId || !userId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const u = db.users.get(userId) || { id: userId, phone: userId, balanceCents: 0, pendingCents: 0 };
  u.balanceCents += 15; // $0.15
  db.users.set(userId, u);
  return NextResponse.json({ ok: true, balanceCents: u.balanceCents });
}



