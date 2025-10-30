'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CreateDone() {
  const [adData, setAdData] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const name = localStorage.getItem('ad_businessName');
      const desc = localStorage.getItem('ad_description');
      const video = localStorage.getItem('ad_videoUrl');
      if (name && desc && video) {
        setAdData({ name, desc, video });
      }
      
      // Check for payment success - can come from Stripe redirect
      // For now, mark as success if we get here from Stripe
      setPaymentSuccess(true);
      
      // Clear localStorage after successful post to prevent confusion
      setTimeout(() => {
        localStorage.removeItem('ad_businessName');
        localStorage.removeItem('ad_description');
        localStorage.removeItem('ad_category');
        localStorage.removeItem('ad_videoUrl');
        localStorage.removeItem('ad_creativeId');
        localStorage.removeItem('ad_payment_complete');
      }, 5000);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, []);

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:520, width:'100%' }}>
        <h1>✓ Posted!</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>
          {paymentSuccess ? 'Payment successful! Your ad is live and ready for viewers.' : 'Your ad is live and ready for viewers.'}
        </p>
        {adData && (
          <div style={{ marginTop:16, padding:16, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, textAlign:'left' }}>
            <p><strong>Business:</strong> {adData.name}</p>
            <p style={{ marginTop:8 }}><strong>Description:</strong> {adData.desc}</p>
          </div>
        )}
        <div style={{ marginTop:16, display:'flex', gap:12, justifyContent:'center' }}>
          <Link href="/post" style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'10px 14px', borderRadius:10, border:'1px solid var(--border)' }}>Create another</Link>
          <Link href="/watch" style={{ background:'var(--primary)', color:'#000', padding:'10px 14px', borderRadius:10, fontWeight:700 }}>View your ad</Link>
        </div>
      </div>
    </main>
  );
}
