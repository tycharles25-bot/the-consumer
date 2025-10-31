'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validatePhoneNumber } from '@/lib/phone-validator';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [stage, setStage] = useState<'request'|'verify'>('request');
  const [message, setMessage] = useState('');

  async function request() {
    // For signup, validate all fields
    if (mode === 'signup') {
      if (!firstName.trim()) {
        setMessage('First name is required');
        return;
      }
      if (!lastName.trim()) {
        setMessage('Last name is required');
        return;
      }
      if (!email.trim()) {
        setMessage('Email is required');
        return;
      }
    }
    
    // Validate phone number format
    const validation = validatePhoneNumber(phone);
    
    if (!validation.valid) {
      setMessage(validation.error || 'Invalid phone number');
      return;
    }
    
    setMessage('Sending code...');
    
    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: validation.formatted })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Code sent!');
        setStage('verify');
        setPhone(validation.formatted || phone);
      } else {
        setMessage(data.error || 'Failed to send code');
      }
    } catch (error) {
      setMessage('Failed to send code');
    }
  }

  async function verify() {
    setMessage('Verifying...');
    
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });
      
      const data = await response.json();
      
      if (response.ok && data.ok) {
        localStorage.setItem('sess_uid', phone);
        
        // Save name and email if signing up
        if (mode === 'signup') {
          localStorage.setItem('profile_firstName', firstName);
          localStorage.setItem('profile_lastName', lastName);
          localStorage.setItem('profile_email', email);
        }
        
        setMessage('Logged in');
        setTimeout(() => router.push('/watch'), 1000);
      } else {
        setMessage(data.error || 'Invalid code');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setMessage('Failed to verify code');
    }
  }

  return (
    <div style={{ position:'relative', minHeight:'100vh', overflow:'hidden', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <main style={{ position:'relative', zIndex:1, display:'grid', placeItems:'center', minHeight:'100vh', padding:24 }}>
        <div style={{ width:360, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:20, boxShadow:'0 6px 30px rgba(0,0,0,0.35)' }}>
          <h1 style={{ textAlign:'center', color:'var(--primary)', marginBottom:12 }}>The Consumer</h1>
          
          {stage === 'request' && (
            <>
              <p style={{ textAlign:'center', color:'var(--muted)', marginBottom:16 }}>United States only</p>
              <div style={{ display:'grid', gap: 8 }}>
                {mode === 'signup' && (
                  <>
                    <input placeholder="First Name *" value={firstName} onChange={e=>setFirstName(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
                    <input placeholder="Last Name *" value={lastName} onChange={e=>setLastName(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
                    <input placeholder="Email *" type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
                  </>
                )}
                <input placeholder="(555) 123-4567" value={phone} onChange={e=>setPhone(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
                <button onClick={request} style={{ background:'var(--primary)', color:'#fff', padding:'10px 12px', borderRadius:8, fontWeight:700 }}>Send code</button>
              </div>
              <p style={{ marginTop:12, textAlign:'center' }}>
                {mode === 'login' ? (
                  <>Don't have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setMode('signup')}} style={{color:'var(--primary)', fontWeight:700}}>Sign Up</a></>
                ) : (
                  <>Already have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setMode('login')}} style={{color:'var(--primary)', fontWeight:700}}>Log In</a></>
                )}
              </p>
              <p style={{ marginTop:8, textAlign:'center' }}>{message}</p>
            </>
          )}
          {stage === 'verify' && (
            <>
              <p style={{ textAlign:'center', color:'var(--muted)', marginBottom:16 }}>United States only</p>
              <div style={{ display:'grid', gap: 8 }}>
                <input placeholder="(555) 123-4567" value={phone} readOnly style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#f5f5f5', color:'var(--foreground)' }} />
                <input placeholder="code" value={code} onChange={e=>setCode(e.target.value)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }} />
                <button onClick={verify} style={{ background:'var(--primary)', color:'#fff', padding:'10px 12px', borderRadius:8, fontWeight:700 }}>Verify</button>
              </div>
              <p style={{ marginTop:12, textAlign:'center' }}>{message}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}


