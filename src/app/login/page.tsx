'use client';
import { useMemo, useState } from 'react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState<'request'|'verify'>('request');
  const [message, setMessage] = useState('');

  const vids = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    key: i,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  })), []);

  async function request() {
    setMessage('Sending code...');
    const res = await fetch('/api/auth/request-otp', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ phone }) });
    const j = await res.json();
    setMessage(res.ok ? 'Code sent!' : j.error || 'Failed');
    if (res.ok) setStage('verify');
  }

  async function verify() {
    setMessage('Verifying...');
    const res = await fetch('/api/auth/verify', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ phone, code }) });
    const j = await res.json();
    if (res.ok) {
      localStorage.setItem('sess_uid', j.userId);
      setMessage('Logged in');
    } else {
      setMessage(j.error || 'Invalid code');
    }
  }

  return (
    <div style={{ position:'relative', minHeight:'100vh', overflow:'hidden' }}>
      {/* Background video wall (no earning) */}
      <div aria-hidden style={{ position:'absolute', inset:0, display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gridAutoRows:'120px', gap:6, filter:'blur(1px) saturate(0.8)', opacity:0.25 }}>
        {vids.map(v => (
          <video key={v.key} src={v.src} muted playsInline autoPlay loop style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:8 }} />
        ))}
      </div>

      {/* Overlay */}
      <main style={{ position:'relative', zIndex:1, display:'grid', placeItems:'center', minHeight:'100vh', padding:24 }}>
        <div style={{ width:360, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:20, boxShadow:'0 6px 30px rgba(0,0,0,0.35)' }}>
          <h1 style={{ textAlign:'center', color:'var(--primary)', marginBottom:12 }}>The Consumer</h1>
          <p style={{ textAlign:'center', color:'var(--muted)', marginBottom:16 }}>Sign in to start earning. US phone required.</p>
          <div style={{ display:'grid', gap: 8 }}>
            <input placeholder="US phone e.g. +15551234567" value={phone} onChange={e=>setPhone(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
            {stage === 'request' && <button onClick={request} style={{ background:'var(--primary)', color:'#fff', padding:'10px 12px', borderRadius:8, fontWeight:700 }}>Send code</button>}
            {stage === 'verify' && (
              <>
                <input placeholder="code" value={code} onChange={e=>setCode(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
                <button onClick={verify} style={{ background:'var(--primary)', color:'#fff', padding:'10px 12px', borderRadius:8, fontWeight:700 }}>Verify</button>
              </>
            )}
          </div>
          <p style={{ marginTop:12, textAlign:'center' }}>{message}</p>
          <div style={{ marginTop:12, display:'flex', justifyContent:'center', gap:12 }}>
            <a href="/watch">Preview Watch</a>
            <a href="/advertiser">Advertiser</a>
          </div>
        </div>
      </main>
    </div>
  );
}


