import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

// Test endpoint to create an ad without payment
export async function POST(req: NextRequest) {
  try {
    const { title, description, advertiserId } = await req.json();
    
    if (!title || !description || !advertiserId) {
      return NextResponse.json({ error: 'title, description, and advertiserId required' }, { status: 400 });
    }

    const creativeId = `cr_test_${Date.now()}`;
    
    // Create a test creative (simulating what happens after payment)
    const creative = {
      id: creativeId,
      advertiserId,
      videoUrl: 'test_video_url',
      title,
      description,
      status: 'approved' as const,
      payoutPer: 25,
      advertiserUrl: 'https://example.com',
      quiz: {
        q1: {
          type: 'tf' as const,
          question: 'Is this a test?',
          options: ['True', 'False'],
          correctIndex: 0
        },
        q2: {
          type: 'tf' as const,
          question: 'Is this working?',
          options: ['True', 'False'],
          correctIndex: 0
        }
      },
      thumbnail: undefined,
      analytics: {
        totalViews: 0,
        totalQuizAttempts: 0,
        totalCorrect: 0,
        averageScore: 0
      }
    };

    db.creatives.set(creativeId, creative);
    
    console.log(`✅ Test creative ${creativeId} created`);
    console.log(`📊 Database now has ${db.creatives.size} creatives`);
    
    // Verify it was saved
    const saved = db.creatives.get(creativeId);
    if (!saved) {
      return NextResponse.json({ error: 'Creative was not saved!' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      creativeId,
      message: `Test ad created with ID: ${creativeId}`,
      databaseSize: db.creatives.size,
      allCreativeIds: Array.from(db.creatives.keys())
    });
  } catch (e: any) {
    console.error('Test endpoint error:', e);
    return NextResponse.json({ error: e?.message || 'Failed to create test ad' }, { status: 500 });
  }
}

