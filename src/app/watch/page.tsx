'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Ad = { id: string; title: string; description: string; payout: string; duration: string; thumb: string; tags: string[]; category: string };

const CATEGORIES = ['All', 'Technology', 'Food', 'Fashion', 'Lifestyle', 'Health', 'Travel', 'Entertainment'];

const ADS: Ad[] = Array.from({ length: 20 }).map((_, i) => {
  const categories = ['Technology', 'Food', 'Fashion', 'Lifestyle', 'Health', 'Travel', 'Entertainment'];
  const titles = [
    ['Smart Watch Pro','Wireless Earbuds','Laptop Stand','Phone Case'],
    ['Organic Coffee','Gourmet Pizza','Fresh Salad','Smoothie Bowl'],
    ['Summer Dress','Sneakers','Sunglasses','Handbag'],
    ['Yoga Mat','Water Bottle','Travel Pillow','Desk Lamp'],
    ['Vitamins','Face Mask','Protein Shake','Workout Gear'],
    ['Beach Resort','City Tour','Mountain Hike','Cruise Trip'],
    ['Movie Night','Game Console','Streaming Service','Concert Tickets']
  ];
  const catIndex = i % categories.length;
  const category = categories[catIndex];
  return {
    id: `cr_${i+1}`,
    title: titles[catIndex][i % titles[catIndex].length] + ` ${Math.floor(i / categories.length) + 1}`,
    description: 'Short, catchy line explaining the value prop and CTA to learn more.',
    payout: '$0.25',
    duration: ['0:15','0:30','0:20'][i % 3],
    thumb: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
    tags: ['DTC','US'],
    category
  };
});

export default function WatchGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [watchedToday, setWatchedToday] = useState(0);
  const [userId, setUserId] = useState('guest');
  const maxViewsPerDay = 4;

  useEffect(() => {
    // Get userId from localStorage
    if (typeof window !== 'undefined') {
      const uid = localStorage.getItem('sess_uid') || 'guest';
      setUserId(uid);
      
      // Get watched count for today
      const today = new Date().toISOString().slice(0, 10);
      const watchedKey = `watched_today_${uid}`;
      const lastWatchDate = localStorage.getItem(`last_watch_date_${uid}`);
      
      // Reset counter if it's a new day
      if (lastWatchDate !== today) {
        localStorage.removeItem(watchedKey);
        localStorage.setItem(`last_watch_date_${uid}`, today);
      }
      
      const count = parseInt(localStorage.getItem(watchedKey) || '0');
      setWatchedToday(count);
    }
  }, []);

  const filteredAds = selectedCategory === 'All' ? ADS : ADS.filter(ad => ad.category === selectedCategory);
  const progressPercent = (watchedToday / maxViewsPerDay) * 100;

  return (
    <main style={{ padding: 24 }}>
      {/* Daily Progress Bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Daily Progress</span>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>{watchedToday}/{maxViewsPerDay} ads watched</span>
        </div>
        <div style={{ width: '100%', height: 8, background: '#f5f5f5', borderRadius: 4, overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              background: progressPercent >= 100 ? '#4CAF50' : 'var(--primary)', 
              width: `${Math.min(progressPercent, 100)}%`,
              transition: 'width 0.3s ease'
            }} 
          />
        </div>
        {watchedToday >= maxViewsPerDay && (
          <p style={{ marginTop: 8, fontSize: 12, color: '#4CAF50', fontWeight: 600 }}>✓ Daily limit reached! Come back tomorrow.</p>
        )}
      </div>
      
      {/* Category filters */}
      <div style={{ display:'flex', gap:8, marginTop:16, overflowX:'auto', paddingBottom:8 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding:'8px 16px',
              borderRadius:20,
              border:'1px solid var(--border)',
              background: selectedCategory === cat ? '#ff6a00' : '#ffffff',
              color: selectedCategory === cat ? '#fff' : 'var(--foreground)',
              fontWeight:600,
              whiteSpace:'nowrap',
              cursor:'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vertical scrollable video list */}
      <div style={{ marginTop:24, display:'flex', flexDirection:'column', gap:16 }}>
        {filteredAds.map(ad => (
          <div key={ad.id} style={{ display:'flex', gap:16, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
            <div style={{ width:280, height:160, background:'#f5f5f5', flexShrink:0 }}>
              <img src={ad.thumb} alt={ad.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <div style={{ padding:16, display:'flex', flexDirection:'column', gap:8, flex:1, justifyContent:'space-between' }}>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:6 }}>
                  <strong style={{ fontSize:18 }}>{ad.title}</strong>
                  <span style={{ color:'var(--muted)', fontSize:14 }}>{ad.duration}</span>
                </div>
                <p style={{ color:'var(--muted)', fontSize:14, marginBottom:8 }}>{ad.description}</p>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  <span style={{ fontSize:12, padding:'4px 8px', border:'1px solid var(--border)', borderRadius:6, background:'#f5f5f5' }}>{ad.category}</span>
                  {ad.tags.map(t => (<span key={t} style={{ fontSize:12, padding:'4px 8px', border:'1px solid var(--border)', borderRadius:6 }}>{t}</span>))}
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontWeight:700, color:'var(--primary)', fontSize:16 }}>{ad.payout}</span>
                <Link href={`/watch/${ad.id}`} style={{ background:'var(--primary)', color:'#fff', padding:'10px 16px', borderRadius:8, textDecoration:'none', fontWeight:600 }}>Watch</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAds.length === 0 && (
        <p style={{ marginTop:24, textAlign:'center', color:'var(--muted)' }}>No ads in this category.</p>
      )}
    </main>
  );
}


