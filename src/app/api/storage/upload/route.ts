import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getS3 } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const key = `creatives/${randomUUID()}`;
    
    // Convert File to Buffer for server-side upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      const s3 = getS3();
      const bucket = env.aws.bucket || 'dummy-bucket';
      
      // Upload directly to R2 from server (no CORS issues)
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'video/mp4',
      });
      
      await s3.send(command);
      
      // Return the key and public URL
      const r2PublicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''}/${key}`;
      
      return NextResponse.json({ 
        key, 
        url: r2PublicUrl,
        success: true 
      });
    } catch (s3Error: any) {
      console.error('R2 upload error:', s3Error);
      
      // If R2 upload fails, return mock response for development
      if (!env.aws.bucket || !env.aws.accessKeyId) {
        console.warn('R2 not configured, using mock storage');
        return NextResponse.json({ 
          key: `mock/${key}`,
          url: `https://mock-storage.localhost/${key}`,
          success: true 
        });
      }
      
      throw new Error(`R2 upload failed: ${s3Error.message}`);
    }
  } catch (e: any) {
    console.error('Upload API error:', e);
    return NextResponse.json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}

