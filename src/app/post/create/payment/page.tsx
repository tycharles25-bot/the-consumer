'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePayment() {
  const router = useRouter();
  const [step, setStep] = useState<'amount' | 'payout' | 'payment'>('amount'); // Step progression
  const [totalAmount, setTotalAmount] = useState(0);
  const [payoutPer, setPayoutPer] = useState(0); // In cents
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Calculate fee (5% of total)
  const feeCents = Math.ceil((totalAmount || 0) * 100 * 0.05);
  const totalCents = (totalAmount || 0) * 100;
  const remainingCents = totalCents - feeCents;
  
  // Calculate how many viewers can be paid
  const maxViewers = payoutPer > 0 ? Math.floor(remainingCents / payoutPer) : 0;

  const handleAmountSelect = (amount: number) => {
    setTotalAmount(amount);
    setError('');
    // Auto-advance to payout selection
    setTimeout(() => setStep('payout'), 200);
  };

  const handleCustomAmount = () => {
    const custom = parseFloat(prompt('Enter custom amount (minimum $10):') || '0');
    if (custom >= 10) {
      setTotalAmount(custom);
      setError('');
      setTimeout(() => setStep('payout'), 200);
    } else if (custom > 0) {
      setError('Minimum amount is $10');
    }
  };

  const handlePayoutSelect = (amount: number) => {
    setPayoutPer(amount);
    setError('');
    // Show estimated viewers before moving to payment
    setTimeout(() => setStep('payment'), 200);
  };

  const handlePayment = async () => {
    if (totalAmount < 10) {
      setError('Minimum amount is $10');
      return;
    }
    
    if (payoutPer === 0) {
      setError('Please select viewer payout amount');
      return;
    }
    
    setProcessing(true);
    setError('');
    
    try {
      let advertiserId = 'unknown';
      let videoUrl = '';
      let creativeId = '';
      
      if (typeof window !== 'undefined') {
        try {
          advertiserId = localStorage.getItem('ad_businessName') || 'unknown';
          videoUrl = localStorage.getItem('ad_videoUrl') || '';
          creativeId = localStorage.getItem('ad_creativeId') || `cr_${Date.now()}`;
        } catch (e) {
          console.error('Error reading localStorage:', e);
        }
      }
      
      const res = await fetch('/api/payment/ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          advertiserId,
          amountCents: totalCents,
          payoutPer,
          videoUrl,
          creativeId
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Payment failed');
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('ad_payment_complete', '1');
          } catch (e) {
            console.error('Error setting localStorage:', e);
          }
        }
        router.push('/post/create/done');
      }
    } catch (e: any) {
      setError(e?.message || 'Payment processing failed');
      setProcessing(false);
    }
  };

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:520, width:'100%' }}>
        {step === 'amount' && (
          <>
            <h1>How much will you pay?</h1>
            <p style={{ color:'var(--muted)', marginTop:6 }}>Select the total amount for your ad campaign.</p>
            
            <div style={{ marginTop:24, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
              {[10, 25, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  style={{
                    padding:'20px 16px',
                    borderRadius:12,
                    border:'2px solid var(--border)',
                    background:'#ffffff',
                    color:'var(--foreground)',
                    fontWeight:600,
                    cursor:'pointer',
                    fontSize:'18px'
                  }}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleCustomAmount}
              style={{ 
                marginTop:12, 
                background:'transparent', 
                color:'var(--muted)', 
                padding:'12px 16px', 
                borderRadius:10, 
                border:'1px solid var(--border)',
                width:'100%',
                fontWeight:600
              }}
            >
              Other amount
            </button>
          </>
        )}

        {step === 'payout' && totalAmount > 0 && (
          <>
            <h1>How much will viewers earn?</h1>
            <p style={{ color:'var(--muted)', marginTop:6 }}>Choose the payout amount per viewer.</p>
            
            <div style={{ marginTop:24, display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:8 }}>
              {[5, 10, 15, 20, 25].map(amount => (
                <button
                  key={amount}
                  onClick={() => handlePayoutSelect(amount)}
                  style={{
                    padding:'12px 8px',
                    borderRadius:10,
                    border:'2px solid var(--border)',
                    background: payoutPer === amount ? 'var(--primary)' : '#ffffff',
                    color: payoutPer === amount ? '#000' : 'var(--foreground)',
                    fontWeight: payoutPer === amount ? 700 : 600,
                    cursor:'pointer',
                    fontSize:'14px'
                  }}
                >
                  ${(amount / 100).toFixed(2)}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setStep('amount')}
              style={{ 
                marginTop:16, 
                background:'transparent', 
                color:'var(--muted)', 
                padding:'10px 14px', 
                borderRadius:10, 
                border:'1px solid var(--border)',
                width:'100%'
              }}
            >
              ← Back to amount
            </button>
          </>
        )}

        {step === 'payment' && totalAmount > 0 && payoutPer > 0 && (
          <>
            <h1>Review & Pay</h1>
            <p style={{ color:'var(--muted)', marginTop:6 }}>Review your campaign details and complete payment.</p>

            <div style={{ marginTop:24, padding:20, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, textAlign:'left' }}>
              <h3 style={{ fontSize:'16px', marginBottom:12 }}>Campaign Summary:</h3>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span>Total payment:</span>
                <span style={{ fontWeight:600 }}>${totalAmount.toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, color:'var(--muted)' }}>
                <span>Platform fee (5%):</span>
                <span>-${(feeCents / 100).toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)' }}>
                <span style={{ fontWeight:600 }}>Available for payouts:</span>
                <span style={{ fontWeight:700, color:'var(--primary)' }}>${(remainingCents / 100).toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span>Payout per viewer:</span>
                <span style={{ fontWeight:600 }}>${(payoutPer / 100).toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)' }}>
                <span style={{ fontWeight:700 }}>Estimated viewers:</span>
                <span style={{ fontWeight:700, color:'var(--primary)' }}>~{maxViewers}</span>
              </div>
            </div>

            {error && <p style={{ marginTop:16, color:'#ff4444' }}>{error}</p>}

            <button 
              onClick={handlePayment}
              disabled={processing || totalAmount < 10 || payoutPer === 0}
              style={{ 
                marginTop:24, 
                background:processing || totalAmount < 10 || payoutPer === 0 ? '#cccccc' : 'var(--primary)', 
                color:'#000', 
                padding:'14px 20px', 
                borderRadius:10, 
                fontWeight:700, 
                width:'100%',
                cursor:processing || totalAmount < 10 || payoutPer === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
            </button>

            <button 
              onClick={() => setStep('payout')}
              style={{ 
                marginTop:12, 
                background:'transparent', 
                color:'var(--muted)', 
                padding:'10px 14px', 
                borderRadius:10, 
                border:'1px solid var(--border)',
                width:'100%'
              }}
            >
              ← Back
            </button>
          </>
        )}

        {step !== 'amount' && (
          <button 
            onClick={() => router.back()}
            style={{ 
              marginTop:12, 
              background:'transparent', 
              color:'var(--muted)', 
              padding:'10px 14px', 
              borderRadius:10, 
              border:'1px solid var(--border)',
              width:'100%',
              fontSize:'14px'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </main>
  );
}
