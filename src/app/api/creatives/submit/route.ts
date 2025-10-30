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

async function fetchPlainText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': 'TheConsumerBot/1.0 (+https://theconsumer.net)' } });
  const html = await res.text();
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 12000);
}

async function moderateVideoFrame(base64Image: string): Promise<{ flagged: boolean; reasons: string[] }> {
  if (!process.env.OPENAI_API_KEY) return { flagged: false, reasons: [] };
  
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze this image for any inappropriate content, violence, nudity, or policy violations. Respond with only "SAFE" or "UNSAFE" followed by a comma and the reason if unsafe.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ],
        max_tokens: 100
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      console.warn('OpenAI vision moderation error:', txt);
      return { flagged: false, reasons: [] };
    }

    const data = await res.json();
    const response = data.choices?.[0]?.message?.content || '';
    const flagged = response.toUpperCase().startsWith('UNSAFE');
    const reasons = flagged ? [response.split(',').slice(1).join(',').trim()] : [];

    return { flagged, reasons };
  } catch (e) {
    console.warn('Video frame moderation failed:', e);
    return { flagged: false, reasons: [] };
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, advertiserId, videoUrl, title, description, advertiserUrl, quiz, videoFrames } = body || {};
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

  // Video frame moderation (if frames provided)
  if (videoFrames && Array.isArray(videoFrames) && videoFrames.length > 0) {
    for (const frame of videoFrames) {
      const frameCheck = await moderateVideoFrame(frame);
      if (frameCheck.flagged) {
        return NextResponse.json({ id, status: 'rejected', reasons: ['video_noncompliant', ...frameCheck.reasons] }, { status: 200 });
      }
    }
  }

  // Optional: website compliance moderation
  if (advertiserUrl && /^https?:\/\//i.test(advertiserUrl)) {
    try {
      const text = await fetchPlainText(advertiserUrl);
      const webCheck = await openAiModerate(text);
      if (webCheck.flagged) {
        return NextResponse.json({ id, status: 'rejected', reasons: ['website_noncompliant', ...webCheck.reasons] }, { status: 200 });
      }
    } catch (e) {
      console.warn('Website fetch/moderation failed:', e);
    }
  }

  activeByAdvertiser.set(advertiserId, id);
  return NextResponse.json({ id, status: 'approved', reasons: [] });
}



