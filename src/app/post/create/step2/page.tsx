'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Technology', 'Food', 'Fashion', 'Lifestyle', 'Health', 'Travel', 'Entertainment'];

export default function CreateStep2() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [website, setWebsite] = useState('');
  const [q1, setQ1] = useState('');
  const [q1Type, setQ1Type] = useState<'tf'|'mc'>('tf');
  const [q1Options, setQ1Options] = useState<string>(''); // comma-separated for mc
  const [q1Correct, setQ1Correct] = useState<number>(0);
  const [q2, setQ2] = useState('');
  const [q2Type, setQ2Type] = useState<'tf'|'mc'>('tf');
  const [q2Options, setQ2Options] = useState<string>('');
  const [q2Correct, setQ2Correct] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      setDescription(localStorage.getItem('ad_description') || '');
      setCategory(localStorage.getItem('ad_category') || '');
      setWebsite(localStorage.getItem('ad_website') || '');
      const saved = localStorage.getItem('ad_quiz');
      if (saved) {
        try {
          const quiz = JSON.parse(saved);
          setQ1(quiz?.q1?.question || '');
          setQ1Type(quiz?.q1?.type || 'tf');
          setQ1Options((quiz?.q1?.options || []).join(','));
          setQ1Correct(quiz?.q1?.correctIndex ?? 0);
          setQ2(quiz?.q2?.question || '');
          setQ2Type(quiz?.q2?.type || 'tf');
          setQ2Options((quiz?.q2?.options || []).join(','));
          setQ2Correct(quiz?.q2?.correctIndex ?? 0);
        } catch {}
      }
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, []);

  function next() {
    if (!description.trim() || !category) return;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ad_description', description);
        localStorage.setItem('ad_category', category);
        if (website) localStorage.setItem('ad_website', website);
        const quiz = {
          q1: {
            type: q1Type,
            question: q1,
            options: q1Type === 'tf' ? ['True','False'] : (q1Options || '').split(',').map(s=>s.trim()).filter(Boolean),
            correctIndex: q1Correct || 0
          },
          q2: {
            type: q2Type,
            question: q2,
            options: q2Type === 'tf' ? ['True','False'] : (q2Options || '').split(',').map(s=>s.trim()).filter(Boolean),
            correctIndex: q2Correct || 0
          }
        };
        localStorage.setItem('ad_quiz', JSON.stringify(quiz));
      } catch (e) {
        console.error('Error setting localStorage:', e);
      }
    }
    router.push('/post/create/step3');
  }

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:520, width:'100%' }}>
        <h1>What do you do?</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Categorize and describe your business.</p>
        
        <label style={{ display:'block', textAlign:'left', marginTop:16, marginBottom:8, fontWeight:600 }}>Category</label>
        <select 
          value={category}
          onChange={e=>setCategory(e.target.value)}
          style={{ width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label style={{ display:'block', textAlign:'left', marginTop:16, marginBottom:8, fontWeight:600 }}>Description</label>
        <textarea 
          placeholder="Business description" 
          value={description} 
          onChange={e=>setDescription(e.target.value)}
          rows={6}
          style={{ width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)', resize:'vertical' }}
        />

        <label style={{ display:'block', textAlign:'left', marginTop:16, marginBottom:8, fontWeight:600 }}>Website URL (optional)</label>
        <input 
          type="url"
          placeholder="https://example.com" 
          value={website} 
          onChange={e=>setWebsite(e.target.value)}
          style={{ width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)'}}
        />

        <h2 style={{ textAlign:'left', marginTop:24 }}>Quiz Questions</h2>
        <p style={{ color:'var(--muted)', textAlign:'left', marginBottom:8 }}>Create two questions users must answer after watching.</p>

        <div style={{ textAlign:'left', marginTop:8 }}>
          <label style={{ fontWeight:600 }}>Question 1</label>
          <input value={q1} onChange={e=>setQ1(e.target.value)} placeholder="Enter question" style={{ width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:8 }} />
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <select value={q1Type} onChange={e=>setQ1Type(e.target.value as any)} style={{ padding:'8px 10px', borderRadius:8, border:'1px solid var(--border)' }}>
              <option value="tf">True / False</option>
              <option value="mc">Multiple Choice</option>
            </select>
            {q1Type === 'mc' && (
              <input value={q1Options} onChange={e=>setQ1Options(e.target.value)} placeholder="Options (comma separated)" style={{ flex:1, padding:'8px 10px', border:'1px solid var(--border)', borderRadius:8 }} />
            )}
            <input type="number" min={0} max={3} value={q1Correct} onChange={e=>setQ1Correct(parseInt(e.target.value)||0)} placeholder="Correct index" style={{ width:120, padding:'8px 10px', border:'1px solid var(--border)', borderRadius:8 }} />
          </div>
        </div>

        <div style={{ textAlign:'left', marginTop:16 }}>
          <label style={{ fontWeight:600 }}>Question 2</label>
          <input value={q2} onChange={e=>setQ2(e.target.value)} placeholder="Enter question" style={{ width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:8 }} />
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <select value={q2Type} onChange={e=>setQ2Type(e.target.value as any)} style={{ padding:'8px 10px', borderRadius:8, border:'1px solid var(--border)' }}>
              <option value="tf">True / False</option>
              <option value="mc">Multiple Choice</option>
            </select>
            {q2Type === 'mc' && (
              <input value={q2Options} onChange={e=>setQ2Options(e.target.value)} placeholder="Options (comma separated)" style={{ flex:1, padding:'8px 10px', border:'1px solid var(--border)', borderRadius:8 }} />
            )}
            <input type="number" min={0} max={3} value={q2Correct} onChange={e=>setQ2Correct(parseInt(e.target.value)||0)} placeholder="Correct index" style={{ width:120, padding:'8px 10px', border:'1px solid var(--border)', borderRadius:8 }} />
          </div>
        </div>
        <button 
          onClick={next}
          disabled={!description.trim() || !category}
          style={{ 
            marginTop:16, 
            background: (!description.trim() || !category) ? '#ccc' : 'var(--primary)', 
            color: (!description.trim() || !category) ? '#666' : '#000', 
            padding:'12px 18px', 
            borderRadius:10, 
            fontWeight:700, 
            width:'100%',
            cursor: (!description.trim() || !category) ? 'not-allowed' : 'pointer'
          }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
