'use client';
import { useState, useEffect } from 'react';

const STATES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

const DEALS_BY_STATE: Record<string, Array<{id: string; title: string; link: string; description: string; discount: string; business: string; category: string}>> = {
  'California': [
    { id: 'sp1', title: 'Shop Local Weekend', link: 'https://example.com/deal1', description: '20% off all weekend specials at participating locations', discount: '20% OFF', business: 'Local Partners', category: 'Retail' },
    { id: 'sp2', title: 'Tech Deals Week', link: 'https://example.com/deal2', description: 'Save on the latest gadgets and electronics', discount: 'UP TO $200', business: 'Tech Hub', category: 'Electronics' },
    { id: 'sp3', title: 'Restaurant Week', link: 'https://example.com/deal3', description: '3-course meals for $35 at top restaurants', discount: 'FIXED $35', business: 'Dining Partners', category: 'Food & Dining' },
  ],
  'New York': [
    { id: 'sp4', title: 'NYC Shopping Blitz', link: 'https://example.com/deal4', description: 'Exclusive deals at Manhattan stores', discount: '15% OFF', business: 'NYC Retail', category: 'Retail' },
    { id: 'sp5', title: 'Broadway Week', link: 'https://example.com/deal5', description: '2-for-1 tickets to select shows', discount: '2-FOR-1', business: 'Theater Guild', category: 'Entertainment' },
    { id: 'sp6', title: 'Food Truck Festival', link: 'https://example.com/deal6', description: 'Try 5 vendors for just $25', discount: 'FIXED $25', business: 'NYC Events', category: 'Food & Dining' },
  ],
  'Texas': [
    { id: 'sp7', title: 'Rodeo Discount Days', link: 'https://example.com/deal7', description: 'Free parking and $5 off tickets', discount: '$5 OFF', business: 'Rodeo Event', category: 'Entertainment' },
    { id: 'sp8', title: 'BBQ Bash Specials', link: 'https://example.com/deal8', description: 'Family platters starting at $40', discount: 'START AT $40', business: 'BBQ Joints', category: 'Food & Dining' },
    { id: 'sp9', title: 'College Gameday Deals', link: 'https://example.com/deal9', description: 'Show your school spirit and save', discount: '10% OFF', business: 'Local Retail', category: 'Retail' },
  ],
};

const DEFAULT_DEALS = [
  { id: 'sp10', title: 'Weekly Flash Sale', link: 'https://example.com/flash', description: 'Limited time deals on featured items', discount: 'VARIES', business: 'Partners', category: 'General' },
  { id: 'sp11', title: 'Local Market Day', link: 'https://example.com/market', description: 'Special pricing at farmers markets', discount: 'SPECIAL PRICING', business: 'Local Markets', category: 'Retail' },
];

export default function Spend() {
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

  const deals = selectedState ? (DEALS_BY_STATE[selectedState] || DEFAULT_DEALS) : [];

  if (!selectedState) {
    return (
      <main style={{ padding:24 }}>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Select your state to see exclusive deals and offers near you.</p>
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
        <div></div>
        <button onClick={()=>{ setSelectedState(''); setState(''); localStorage.removeItem('user_state'); }} style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'8px 12px', borderRadius:8, border:'1px solid var(--border)' }}>
          Change state
        </button>
      </div>
      <p style={{ color:'var(--muted)' }}>Exclusive deals in {selectedState}</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:16, marginTop:16 }}>
        {deals.map(deal => (
          <div key={deal.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:8 }}>
              <div style={{ flex:1 }}>
                <h3 style={{ marginBottom:4 }}>{deal.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:14 }}>{deal.business}</p>
              </div>
              <span style={{ background:'var(--primary)', color:'#000', padding:'4px 8px', borderRadius:6, fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
                {deal.discount}
              </span>
            </div>
            <p style={{ marginTop:8, marginBottom:12, color:'var(--foreground)', fontSize:14 }}>{deal.description}</p>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'6px 12px', borderRadius:8, fontSize:12, border:'1px solid var(--border)' }}>
                {deal.category}
              </span>
              <a 
                href={deal.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background:'var(--primary)', color:'#000', padding:'8px 16px', borderRadius:8, fontWeight:700, textDecoration:'none' }}
              >
                View Deal →
              </a>
            </div>
          </div>
        ))}
      </div>

      {deals.length === 0 && (
        <p style={{ marginTop:24, textAlign:'center', color:'var(--muted)' }}>No deals available in {selectedState} yet. Check back soon!</p>
      )}
    </main>
  );
}
