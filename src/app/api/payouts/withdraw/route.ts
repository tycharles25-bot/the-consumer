import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { db } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { userId, amountCents, email } = await req.json();
  if (!userId || !amountCents || !email) return NextResponse.json({ error: 'userId, amountCents, email required' }, { status: 400 });
  const user = db.users.get(userId);
  if (!user) return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
  if (user.balanceCents < amountCents) return NextResponse.json({ error: 'insufficient_funds' }, { status: 400 });
  if (!env.tremendous.apiKey || !env.tremendous.fundingSourceId) return NextResponse.json({ error: 'tremendous_not_configured' }, { status: 500 });

  // Create Tremendous order (digital gift card sent by email)
  const res = await fetch('https://www.tremendous.com/api/v2/orders', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.tremendous.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payment: { funding_source_id: env.tremendous.fundingSourceId },
      rewards: [
        {
          value: { denomination: amountCents / 100, currency_code: 'USD' },
          recipient: { email },
          deliver_at: null
        }
      ]
    })
  });
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: 'tremendous_error', details: text }, { status: 502 });
  }

  user.balanceCents -= amountCents;
  db.users.set(userId, user);
  return NextResponse.json({ ok: true });
}


