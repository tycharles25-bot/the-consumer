'use client';
import Link from 'next/link';

const POSTS = Array.from({ length: 8 }).map((_, i) => ({
  id: `post_${i+1}`,
  title: ['How to brew better coffee','Sustainable packaging 101','Focus with ambient sound','Lighting your desk'][i % 4] + ` ${i+1}`,
  excerpt: 'A short preview of the blog post to help decide if you want to read it.',
  readTime: ['2 min','3 min','4 min'][i % 3],
  payout: '$0.15'
}));

export default function ReadList() {
  return (
    <main style={{ padding:24 }}>
      <h1>Read and earn</h1>
      <p style={{ color:'var(--muted)' }}>Read a short post and answer two questions to earn $0.15.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginTop:16 }}>
        {POSTS.map(p => (
          <div key={p.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
            <h3>{p.title}</h3>
            <p style={{ color:'var(--muted)', marginTop:6 }}>{p.excerpt}</p>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              <span style={{ color:'var(--muted)' }}>{p.readTime}</span>
              <div>
                <span style={{ fontWeight:700, marginRight:8 }}>{p.payout}</span>
                <Link href={`/read/${p.id}`} style={{ background:'var(--primary)', color:'#fff', padding:'6px 10px', borderRadius:8 }}>Read</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}



