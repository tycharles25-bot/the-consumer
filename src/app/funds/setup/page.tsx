'use client';
import { useState } from 'react';

export default function FundsSetup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem('payout_verified', '1');
    setMsg('Verified! Returning to Save...');
    setTimeout(()=> location.href='/save', 800);
  }

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:520, textAlign:'center' }}>
        <h1>Payout information</h1>
        <p style={{ color:'var(--muted)' }}>Provide details so we can send your earnings.</p>
        <form onSubmit={submit} style={{ display:'grid', gap:12, marginTop:12 }}>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email for payout delivery" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Address (optional)" value={address} onChange={e=>setAddress(e.target.value)} />
          <button type="submit" style={{ background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700 }}>Verify</button>
        </form>
        <p style={{ marginTop:8 }}>{msg}</p>
      </div>
    </main>
  );
}


