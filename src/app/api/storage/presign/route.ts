import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createPresignedUploadKey } from '@/lib/s3';

export async function POST(req: NextRequest) {
  try {
    const { contentType } = await req.json();
    if (!contentType) return NextResponse.json({ error: 'contentType required' }, { status: 400 });
    
    const key = `creatives/${randomUUID()}`;
    
    // Try to create real presigned URL with S3/R2
    try {
      const { url } = await createPresignedUploadKey(key, contentType);
      
      // Check if it's a real URL (not mock)
      if (!url.includes('mock-storage.localhost')) {
        return NextResponse.json({ url, key });
      }
    } catch (e) {
      console.error('Real S3 presign failed:', e);
    }
    
    // Fallback: return mock URL for development
    const mockUrl = `https://mock-storage.localhost/${key}`;
    return NextResponse.json({ url: mockUrl, key });
  } catch (e: any) {
    console.error('Presign error:', e);
    return NextResponse.json({ error: e?.message || 'Failed to create upload URL' }, { status: 500 });
  }
}


