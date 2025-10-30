'use client';
import { useState } from 'react';

const PICS = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534316207-59a0214cf1a9?w=800&q=80&auto=format&fit=crop'
];

export default function Pictures() {
  const [idx, setIdx] = useState(0);
  const [userId, setUserId] = useState('user_1');
  const [result, setResult] = useState<any>(null);

  async function complete() {
    const res = await fetch('/api/pictures/complete', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ userId }) });
    setResult(await res.json());
  }

  return (
    <main style={{ padding:24 }}>
      <h1>Pictures</h1>
      <p style={{ color:'var(--muted)' }}>Click through 4 pictures to earn $0.05.</p>
      <div style={{ marginTop:12, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16, display:'grid', gap:8 }}>
        <div style={{ height:360, background:'#111', borderRadius:8, overflow:'hidden' }}>
          <img src={PICS[idx]} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <button disabled={idx===0} onClick={()=>setIdx(i=>Math.max(0,i-1))} style={{ background:'#222', color:'#fff', padding:'8px 12px', borderRadius:8 }}>Prev</button>
          <div>{idx+1} / 4</div>
          {idx<3 ? (
            <button onClick={()=>setIdx(i=>Math.min(3,i+1))} style={{ background:'var(--primary)', color:'#fff', padding:'8px 12px', borderRadius:8 }}>Next</button>
          ) : (
            <button onClick={complete} style={{ background:'var(--primary)', color:'#fff', padding:'8px 12px', borderRadius:8 }}>Finish & collect $0.05</button>
          )}
        </div>
      </div>
      <div style={{ marginTop:12, display:'flex', gap:8 }}>
        <input placeholder="userId" value={userId} onChange={e=>setUserId(e.target.value)} />
        <pre style={{ marginTop: 8, background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>{result ? JSON.stringify(result, null, 2) : ''}</pre>
      </div>
    </main>
  );
}



