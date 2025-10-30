import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: creativeId } = await params;
  const creative = db.creatives.get(creativeId);
  
  if (!creative) {
    return NextResponse.json({ error: 'Creative not found' }, { status: 404 });
  }
  
  return NextResponse.json(creative);
}
