'use client';
import { useEffect, useState } from 'react';

export default function Funds() {
  const [userId, setUserId] = useState('');
  const [verified, setVerified] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const uid = localStorage.getItem('sess_uid') || '';
    setUserId(uid);
    const v = localStorage.getItem('payout_verified') === '1';
    setVerified(v);
    const b = parseInt(localStorage.getItem('balance_cents') || '0', 10);
    setBalance(b);
  }, []);

  if (!verified) {
    return (
      <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
        <div style={{ textAlign:'center' }}>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Put in your information to earn today.</p>
          <a href="/funds/setup" style={{ marginTop:16, display:'inline-block', background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700 }}>Add payout info</a>
        </div>
      </main>
    );
  }

  const goal = 500; // $5
  const pct = Math.min(100, Math.round((balance / goal) * 100));
  const canWithdraw = balance >= goal;

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:520, width:'100%' }}>
        <p style={{ color:'var(--muted)' }}>You're {pct}% of the way to your $5 withdrawal goal.</p>
        <div style={{ marginTop:12, height:14, background:'#f5f5f5', borderRadius:8, overflow:'hidden', border:'1px solid var(--border)' }}>
          <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg, #ff6a00, #ffc000)' }} />
        </div>
        <div style={{ marginTop:12, display:'flex', gap:12, justifyContent:'center' }}>
          {canWithdraw ? (
            <a href="/wallet" style={{ background:'var(--primary)', color:'#000', padding:'10px 14px', borderRadius:10, fontWeight:700 }}>Withdraw ${(balance / 100).toFixed(2)}</a>
          ) : (
            <a href="/watch" style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'10px 14px', borderRadius:10, border:'1px solid var(--border)' }}>Watch to earn $0.25</a>
          )}
        </div>
      </div>
    </main>
  );
}
