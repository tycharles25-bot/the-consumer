import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

const activeByAdvertiser = new Map<string, string>(); // advertiserId -> creativeId

async function openAiModerate(input: string) {
  if (!env || !('' + (process as any)?.env?.OPENAI_API_KEY)) return { flagged: false, reasons: [] };
  try {
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: 'omni-moderation-latest', input })
    });
    if (!res.ok) {
      const txt = await res.text();
      console.warn('OpenAI moderation error:', txt);
      return { flagged: false, reasons: [] };
    }
    const data = await res.json();
    const result = data?.results?.[0];
    const flagged = !!result?.flagged;
    const reasons = Object.entries(result?.categories || {})
      .filter(([, v]) => v)
      .map(([k]) => k);
    return { flagged, reasons };
  } catch (e) {
    console.warn('OpenAI moderation request failed:', e);
    return { flagged: false, reasons: [] };
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, advertiserId, videoUrl, title, description } = body || {};
  if (!id || !advertiserId || !videoUrl) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  // Auto-replace existing active ad instead of requiring pause
  const existingAd = activeByAdvertiser.get(advertiserId);
  if (existingAd && existingAd !== id) {
    console.log(`Replacing existing ad ${existingAd} with new ad ${id} for advertiser ${advertiserId}`);
  }

  // OpenAI text moderation on provided metadata (title/description)
  const textToCheck = [title, description].filter(Boolean).join('\n');
  const ai = await openAiModerate(textToCheck || '');
  if (ai.flagged) {
    return NextResponse.json({ id, status: 'rejected', reasons: ai.reasons }, { status: 200 });
  }

  // If desired, additional heuristics (duration, format) could be added here

  activeByAdvertiser.set(advertiserId, id);
  return NextResponse.json({ id, status: 'approved', reasons: [] });
}



