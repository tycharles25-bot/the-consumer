'use client';
import { useState, useEffect } from 'react';

const STATES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

const DEALS_BY_STATE: Record<string, Array<{id: string; title: string; code?: string; discount: string; business: string; expires: string; type: 'code'|'deal'}>> = {
  'California': [
    { id: 'd1', title: '20% Off Coffee', code: 'COFFEE20', discount: '20% off', business: 'Coffee Co', expires: 'Dec 31, 2024', type: 'code' },
    { id: 'd2', title: 'Buy One Get One Free', discount: 'BOGO', business: 'Eco Store', expires: 'Jan 15, 2025', type: 'deal' },
    { id: 'd3', title: 'Free Shipping', code: 'SHIPFREE', discount: 'Free shipping', business: 'Local Market', expires: 'Ongoing', type: 'code' },
  ],
  'New York': [
    { id: 'd4', title: '15% Off First Order', code: 'NY15', discount: '15% off', business: 'NYC Eats', expires: 'Ongoing', type: 'code' },
    { id: 'd5', title: '$10 Off $50+', code: 'SAVE10', discount: '$10 off', business: 'Metro Deals', expires: 'Feb 1, 2025', type: 'code' },
  ],
  'Texas': [
    { id: 'd6', title: 'Free Appetizer', discount: 'Free item', business: 'Texas Grill', expires: 'Jan 30, 2025', type: 'deal' },
    { id: 'd7', title: '25% Off Weekend', code: 'WKND25', discount: '25% off', business: 'Weekend Co', expires: 'Ongoing', type: 'code' },
  ],
};

// Default deals if state not found
const DEFAULT_DEALS = [
  { id: 'd8', title: '10% Off Any Purchase', code: 'SAVE10', discount: '10% off', business: 'Local Partner', expires: 'Ongoing', type: 'code' },
  { id: 'd9', title: 'Free Trial', discount: 'Free trial', business: 'Service Co', expires: 'Ongoing', type: 'deal' },
];

export default function Save() {
  const [state, setState] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [copiedId, setCopiedId] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('user_state');
    if (saved) {
      setState(saved);
      setSelectedState(saved);
    }
  }, []);

  function selectState(s: string) {
    setState(s);
    setSelectedState(s);
    localStorage.setItem('user_state', s);
  }

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  }

  const deals = selectedState ? (DEALS_BY_STATE[selectedState] || DEFAULT_DEALS) : [];

  if (!selectedState) {
    return (
      <main style={{ padding:24 }}>
        <h1>Save</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Select your state to see promo codes and deals near you.</p>
        <div style={{ marginTop:16, display:'grid', gap:8 }}>
          <select 
            value={state} 
            onChange={e=>selectState(e.target.value)}
            style={{ padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }}
          >
            <option value="">Select your state</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding:24 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <h1>Save</h1>
        <button onClick={()=>{ setSelectedState(''); setState(''); localStorage.removeItem('user_state'); }} style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'8px 12px', borderRadius:8, border:'1px solid var(--border)' }}>
          Change state
        </button>
      </div>
      <p style={{ color:'var(--muted)' }}>Promo codes and deals in {selectedState}</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginTop:16 }}>
        {deals.map(deal => (
          <div key={deal.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:8 }}>
              <div>
                <h3 style={{ marginBottom:4 }}>{deal.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:14 }}>{deal.business}</p>
              </div>
              <span style={{ background:'var(--primary)', color:'#000', padding:'4px 8px', borderRadius:6, fontSize:12, fontWeight:700 }}>
                {deal.discount}
              </span>
            </div>
            {deal.code && (
              <div style={{ marginTop:12, display:'flex', gap:8, alignItems:'center' }}>
                <code style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'8px 12px', borderRadius:8, fontSize:16, letterSpacing:2, flex:1, textAlign:'center', border:'1px solid var(--border)' }}>
                  {deal.code}
                </code>
                <button 
                  onClick={()=>copyCode(deal.code!, deal.id)}
                  style={{ background: copiedId === deal.id ? '#0a0' : 'var(--primary)', color:'#000', padding:'8px 12px', borderRadius:8, fontWeight:700 }}
                >
                  {copiedId === deal.id ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
            {deal.type === 'deal' && (
              <p style={{ marginTop:8, color:'var(--muted)', fontSize:14 }}>{deal.discount}</p>
            )}
            <p style={{ marginTop:8, color:'var(--muted)', fontSize:12 }}>Expires: {deal.expires}</p>
          </div>
        ))}
      </div>

      {deals.length === 0 && (
        <p style={{ marginTop:24, textAlign:'center', color:'var(--muted)' }}>No deals available in {selectedState} yet. Check back soon!</p>
      )}
    </main>
  );
}
