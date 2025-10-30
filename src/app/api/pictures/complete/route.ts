import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  const u = db.users.get(userId) || { id: userId, phone: userId, balanceCents: 0, pendingCents: 0 };
  u.balanceCents += 5; // $0.05
  db.users.set(userId, u);
  return NextResponse.json({ ok: true, balanceCents: u.balanceCents });
}



