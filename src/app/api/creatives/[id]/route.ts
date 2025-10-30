import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const creative = db.creatives.get(id);
  if (!creative) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(creative);
}


