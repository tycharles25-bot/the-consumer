import { NextRequest, NextResponse } from 'next/server';
import { requestOtp } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) return NextResponse.json({ error: 'phone required' }, { status: 400 });
  try {
    const result = await requestOtp(phone);
    if (result.success) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: result.error || 'Failed to send OTP' }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'otp_failed' }, { status: 500 });
  }
}


