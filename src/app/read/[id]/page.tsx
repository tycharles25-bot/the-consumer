'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ReadDetail() {
  const { id } = useParams<{ id: string }>();
  const [userId, setUserId] = useState('user_1');
  const [userEmail, setUserEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [answers, setAnswers] = useState<{a?: string;b?: string}>({});

  async function complete() {
    const res = await fetch('/api/read/complete', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ postId: id, userId, userEmail: userEmail || undefined }) });
    setResult(await res.json());
  }

  return (
    <main style={{ padding:24 }}>
      <a href="/read">← Back</a>
      <article style={{ marginTop:12, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
        <h1>Sample Post: {id}</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>A few paragraphs of sample content for reading engagement.</p>
        <p style={{ marginTop:8 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut pulvinar lorem. Integer aliquet, neque sit amet vulputate luctus, velit arcu tristique lectus, vitae varius massa est id odio.</p>
        <p>Praesent ac mauris at dui ullamcorper gravida. Curabitur suscipit ipsum in est convallis, non interdum erat aliquet.</p>
      </article>

      <section style={{ marginTop:16, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
        <h3>Quick questions</h3>
        <div style={{ marginTop:8 }}>
          <p>1) What is the main topic?</p>
          {['Coffee','Sustainability','Focus','Lighting'].map(opt => (
            <label key={opt} style={{ display:'block', marginTop:4 }}><input type="radio" name="q1" onChange={()=>setAnswers(a=>({...a,a:opt}))}/> {opt}</label>
          ))}
        </div>
        <div style={{ marginTop:12 }}>
          <p>2) Which tip was mentioned?</p>
          {['Use filtered water','Recycled materials','White noise','Warm color temp'].map(opt => (
            <label key={opt} style={{ display:'block', marginTop:4 }}><input type="radio" name="q2" onChange={()=>setAnswers(a=>({...a,b:opt}))}/> {opt}</label>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, marginTop:12 }}>
          <button onClick={complete} style={{ background:'var(--primary)', color:'#fff', padding:'8px 12px', borderRadius:8 }}>Submit answers</button>
          <input placeholder="email for receipt (optional)" value={userEmail} onChange={e=>setUserEmail(e.target.value)} />
          <input placeholder="userId" value={userId} onChange={e=>setUserId(e.target.value)} />
        </div>
        <pre style={{ marginTop: 8, background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>{result ? JSON.stringify(result, null, 2) : ''}</pre>
      </section>
    </main>
  );
}



