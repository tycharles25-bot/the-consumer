import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { contentType } = await req.json();
    if (!contentType) return NextResponse.json({ error: 'contentType required' }, { status: 400 });
    
    const key = `creatives/${randomUUID()}`;
    
    // For development without AWS credentials, return a mock URL
    // This allows the app to work without S3 configured
    const mockUrl = `https://mock-storage.localhost/${key}`;
    
    return NextResponse.json({ url: mockUrl, key });
  } catch (e: any) {
    console.error('Presign error:', e);
    return NextResponse.json({ error: e?.message || 'Failed to create upload URL' }, { status: 500 });
  }
}


