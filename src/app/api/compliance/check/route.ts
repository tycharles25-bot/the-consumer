import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

async function fetchPlainText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': 'TheConsumerBot/1.0 (+https://theconsumer.net)' } });
  const html = await res.text();
  // naive strip
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 12000);
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') return NextResponse.json({ error: 'url required' }, { status: 400 });
    // basic allowlist
    if (!/^https?:\/\//i.test(url)) return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });

    const text = await fetchPlainText(url);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const mod = await openai.moderations.create({ model: 'text-moderation-latest', input: text });
    const flagged = (mod.results?.[0] as any)?.flagged === true;

    return NextResponse.json({ ok: true, flagged });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'compliance_check_failed' }, { status: 500 });
  }
}


