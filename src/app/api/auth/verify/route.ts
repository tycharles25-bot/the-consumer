import { NextRequest, NextResponse } from 'next/server';
import { verifyOtp } from '@/lib/twilio';
import { db } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();
  if (!phone || !code) return NextResponse.json({ error: 'phone and code required' }, { status: 400 });
  const result = await verifyOtp(phone, code);
  if (!result.success) return NextResponse.json({ error: result.error || 'invalid_code' }, { status: 401 });
  const id = phone; // use phone number as user ID
  if (!db.users.get(id)) {
    db.users.set(id, { 
      id, 
      phone, 
      balanceCents: 0, 
      pendingCents: 0,
      verified: false,
      verificationStatus: undefined
    });
  }
  // Set a simple cookie session
  const res = NextResponse.json({ ok: true, userId: id });
  res.cookies.set('sess_uid', id, { httpOnly: true, sameSite: 'lax', maxAge: 60*60*24*30 });
  return res;
}


