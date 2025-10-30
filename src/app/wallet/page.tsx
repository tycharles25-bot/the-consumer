'use client';
import { useEffect, useState } from 'react';

export default function Wallet() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(500); // cents
  const [balance, setBalance] = useState(0);
  const [msg, setMsg] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem('sess_uid') || '';
    setUserId(uid);
    
    // Get user's email from profile
    const userEmail = localStorage.getItem('profile_email') || '';
    setEmail(userEmail);
    
    // Get balance
    const b = parseInt(localStorage.getItem('balance_cents') || '0', 10);
    setBalance(b);
    setAmount(Math.min(b, b)); // Default to full balance if available
  }, []);

  async function withdraw() {
    if (amount < 500) {
      setMsg('Minimum withdrawal is $5.00');
      return;
    }
    
    setProcessing(true);
    setMsg('Processing withdrawal...');
    
    try {
      const res = await fetch('/api/payouts/withdraw', { 
        method: 'POST', 
        headers: { 'content-type': 'application/json' }, 
        body: JSON.stringify({ userId, amountCents: amount, email }) 
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMsg(`Withdrawal of $${(amount / 100).toFixed(2)} processed successfully!`);
        // Update local balance
        localStorage.setItem('balance_cents', (balance - amount).toString());
      } else {
        setMsg(data.error || 'Failed to process withdrawal');
      }
    } catch (error) {
      setMsg('Network error. Please try again.');
    } finally {
      setProcessing(false);
    }
  }

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:520, textAlign:'center' }}>
        <p style={{ color:'var(--muted)', fontSize:18, fontWeight:600 }}>Withdraw Earnings</p>
        <p style={{ color:'var(--muted)', marginTop:8 }}>Available balance: <b>${(balance / 100).toFixed(2)}</b></p>
        
        <div style={{ display:'grid', gap:12, marginTop:24 }}>
          <input 
            placeholder="Email for payout" 
            type="email"
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            style={{ padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff' }}
          />
          <input 
            type="number" 
            min={500} 
            step={100} 
            value={amount} 
            onChange={e=>setAmount(parseInt(e.target.value||'0',10))}
            style={{ padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff' }}
          />
          <div style={{ fontSize:12, color:'var(--muted)' }}>Minimum: $5.00</div>
          <button 
            onClick={withdraw}
            disabled={processing || amount < 500 || !email}
            style={{ 
              background: processing || amount < 500 || !email ? '#ccc' : 'var(--primary)', 
              color: '#000', 
              padding:'12px 18px', 
              borderRadius:10, 
              fontWeight:700,
              cursor: processing || amount < 500 || !email ? 'not-allowed' : 'pointer'
            }}
          >
            {processing ? 'Processing...' : `Withdraw $${(amount / 100).toFixed(2)}`}
          </button>
          <p style={{ color: msg.includes('successfully') ? '#22c55e' : '#ef4444' }}>{msg}</p>
        </div>
      </div>
    </main>
  );
}



