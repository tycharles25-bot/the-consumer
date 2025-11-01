import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const { creativeId } = await req.json();
    
    if (!creativeId) {
      return NextResponse.json({ error: 'creativeId required' }, { status: 400 });
    }

    const creative = db.creatives.get(creativeId);
    
    if (!creative) {
      return NextResponse.json({ error: 'Creative not found' }, { status: 404 });
    }

    // Approve the creative
    creative.status = 'approved';
    db.creatives.set(creativeId, creative);
    
    console.log(`✅ Manually approved creative ${creativeId}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Creative approved',
      creative: {
        id: creative.id,
        title: creative.title,
        status: creative.status
      }
    });
  } catch (e: any) {
    console.error('Error approving creative:', e);
    return NextResponse.json({ error: e?.message || 'Failed to approve creative' }, { status: 500 });
  }
}


