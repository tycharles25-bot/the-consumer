'use client';
import { useState } from 'react';

export default function Advertiser() {
  const [form, setForm] = useState({ id: '', advertiserId: '', videoUrl: '', title: '', description: '', frameUrls: '' });
  const [result, setResult] = useState<any>(null);
  const [amount, setAmount] = useState(1000);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult('Submitting...');
    const body = { ...form, frameUrls: form.frameUrls.split(',').map(s => s.trim()).filter(Boolean) } as any;
    const res = await fetch('/api/creatives/submit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const json = await res.json();
    setResult(json);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Submit an Ad</h1>
      <section style={{marginBottom:24}}>
        <h3>Fund your advertiser balance</h3>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <input type="number" min={100} step={100} value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0',10))} />
          <button onClick={async()=>{
            const r = await fetch('/api/advertisers/deposit',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({advertiserId: form.advertiserId || 'adv_1', amountCents: amount})});
            const j = await r.json(); if(j.url) location.href=j.url;
          }}>Deposit via Stripe</button>
        </div>
      </section>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
        <input placeholder="creative id" value={form.id} onChange={e=>setForm({ ...form, id: e.target.value })} required />
        <input placeholder="advertiser id" value={form.advertiserId} onChange={e=>setForm({ ...form, advertiserId: e.target.value })} required />
        <div style={{display:'grid',gap:8}}>
          <input placeholder="video url (mp4) or upload below" value={form.videoUrl} onChange={e=>setForm({ ...form, videoUrl: e.target.value })} />
          <input type="file" accept="video/mp4,video/*" onChange={async e=>{
            const f = e.target.files?.[0]; if(!f) return;
            const r = await fetch('/api/storage/presign',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({contentType:f.type||'video/mp4'})});
            const j = await r.json();
            await fetch(j.url,{method:'PUT',headers:{'content-type':f.type||'video/mp4'},body:f});
            setForm(prev=>({...prev, videoUrl: `https://${process.env.NEXT_PUBLIC_APP_NAME ? '' : ''}${j.key}` }));
            alert('Uploaded. Paste full CDN URL if needed.');
          }} />
        </div>
        <input placeholder="title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} />
        <input placeholder="description" value={form.description} onChange={e=>setForm({ ...form, description: e.target.value })} />
        <input placeholder="frame urls (comma-separated)" value={form.frameUrls} onChange={e=>setForm({ ...form, frameUrls: e.target.value })} />
        <button type="submit">Submit for Moderation</button>
      </form>
      <pre style={{ marginTop: 16, background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>{result ? JSON.stringify(result, null, 2) : ''}</pre>
    </main>
  );
}


