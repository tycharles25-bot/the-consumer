'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Technology', 'Food', 'Fashion', 'Lifestyle', 'Health', 'Travel', 'Entertainment'];

export default function CreateStep2() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      setTitle(localStorage.getItem('ad_title') || '');
      setDescription(localStorage.getItem('ad_description') || '');
      setCategory(localStorage.getItem('ad_category') || '');
      setWebsite(localStorage.getItem('ad_website') || '');
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, []);

  function next() {
    if (!title.trim() || !description.trim() || !category) return;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ad_title', title);
        localStorage.setItem('ad_description', description);
        localStorage.setItem('ad_category', category);
        if (website) localStorage.setItem('ad_website', website);
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
        
        <label style={{ display:'block', textAlign:'left', marginTop:16, marginBottom:8, fontWeight:600 }}>Ad Title</label>
        <input 
          placeholder="Eye-catching ad title" 
          value={title} 
          onChange={e=>setTitle(e.target.value)}
          style={{ width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }}
        />

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
        
        <button 
          onClick={next}
          disabled={!title.trim() || !description.trim() || !category}
          style={{ 
            marginTop:16, 
            background: (!title.trim() || !description.trim() || !category) ? '#ccc' : 'var(--primary)', 
            color: (!title.trim() || !description.trim() || !category) ? '#666' : '#000', 
            padding:'12px 18px', 
            borderRadius:10, 
            fontWeight:700, 
            width:'100%',
            cursor: (!title.trim() || !description.trim() || !category) ? 'not-allowed' : 'pointer'
          }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
