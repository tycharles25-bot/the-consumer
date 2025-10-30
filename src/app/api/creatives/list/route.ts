import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET() {
  // Get all approved creatives
  const allCreatives = Array.from(db.creatives.values());
  const approved = allCreatives.filter(c => c.status === 'approved');
  
  // Transform for frontend
  const ads = approved.map(c => ({
    id: c.id,
    title: c.title || 'Ad',
    description: c.description || '',
    payout: `$${((c.payoutPer || 25) / 100).toFixed(2)}`,
    duration: '0:30',
    thumb: c.thumbnail || 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
    tags: ['New', 'Verified'],
    category: 'General'
  }));
  
  return NextResponse.json(ads);
}

