'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateStep1() {
  const router = useRouter();
  const [name, setName] = useState('');

  function next() {
    if (!name.trim()) return;
    if (typeof window !== 'undefined') {
      // Use localStorage for persistence across sessions
      localStorage.setItem('ad_businessName', name);
    }
    router.push('/post/create/step2');
  }

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:520, width:'100%' }}>
        <h1>What do you call yourself?</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Enter your business name.</p>
        <input 
          placeholder="Business name" 
          value={name} 
          onChange={e=>setName(e.target.value)}
          style={{ marginTop:16, width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }}
          onKeyDown={e=>e.key==='Enter' && next()}
        />
        <button 
          onClick={next}
          style={{ marginTop:12, background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700, width:'100%' }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
