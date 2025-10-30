'use client';
import { useEffect, useState } from 'react';

export default function Wallet() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(500); // cents
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const uid = localStorage.getItem('sess_uid') || '';
    setUserId(uid);
  }, []);

  async function withdraw() {
    setMsg('Requesting gift card...');
    const res = await fetch('/api/payouts/withdraw', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ userId, amountCents: amount, email }) });
    const j = await res.json();
    setMsg(res.ok ? 'Requested successfully' : j.error || 'Failed');
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Wallet</h1>
      <div style={{ display:'grid', gap:8, maxWidth:360 }}>
        <input placeholder="userId" value={userId} onChange={e=>setUserId(e.target.value)} />
        <input placeholder="email for gift card" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="number" min={500} step={50} value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0',10))} />
        <button onClick={withdraw}>Withdraw via Tremendous</button>
      </div>
      <p>{msg}</p>
    </main>
  );
}



