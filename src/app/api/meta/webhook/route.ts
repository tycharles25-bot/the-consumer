import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const challenge = searchParams.get('hub.challenge');
  const verifyToken = searchParams.get('hub.verify_token');

  if (!mode || !verifyToken) {
    return NextResponse.json({ error: 'Missing verification parameters' }, { status: 400 });
  }

  if (mode === 'subscribe' && verifyToken === env.meta.verifyToken) {
    console.log('✅ Meta webhook verified');
    return new Response(challenge ?? '', { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }

  console.warn('❌ Meta webhook verification failed', { mode, verifyToken });
  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  if (!env.meta.verifyToken) {
    return NextResponse.json({ error: 'Server missing META_VERIFY_TOKEN env' }, { status: 500 });
  }

  try {
    const payload = await req.json();

    if (!payload) {
      return NextResponse.json({ error: 'Empty payload' }, { status: 400 });
    }

    const source = payload.object ?? 'meta';
    const entries = Array.isArray(payload.entry) ? payload.entry : [];

    const records = entries.map((entry: any) => ({
      source,
      topic: entry.changes?.[0]?.field ?? entry.id ?? 'unknown',
      objectId: entry.id,
      payload,
    }));

    if (records.length === 0) {
      await prisma.webhookEvent.create({
        data: {
          source,
          topic: payload.topic ?? 'unknown',
          objectId: payload?.entry?.[0]?.id ?? null,
          payload,
        },
      });
    } else {
      await prisma.webhookEvent.createMany({ data: records });
    }

    console.log(`✅ Stored Meta webhook event(s): ${records.length || 1}`);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Error handling Meta webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}
