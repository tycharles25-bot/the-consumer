'use client';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [verified, setVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [previousAds, setPreviousAds] = useState<Array<{id: string, title: string, url: string}>>([]);

  useEffect(() => {
    const uid = localStorage.getItem('sess_uid') || '';
    setUserId(uid);
    setBalance(parseInt(localStorage.getItem('balance_cents') || '0', 10));
    setFirstName(localStorage.getItem('profile_firstName') || '');
    setLastName(localStorage.getItem('profile_lastName') || '');
    setEmail(localStorage.getItem('profile_email') || '');
    setPhone(localStorage.getItem('profile_phone') || '');
    setNotifyEmail(localStorage.getItem('notify_email') !== '0');
    
    // Load previous ads
    const watchedAds = localStorage.getItem('watched_ads') || '[]';
    try {
      const ads = JSON.parse(watchedAds);
      // Get last 8 ads
      setPreviousAds(ads.slice(-8).reverse());
    } catch (e) {
      setPreviousAds([]);
    }
    
    // Load verification status
    fetch('/api/verify/status')
      .then(res => res.json())
      .then(data => {
        setVerified(data.verified || false);
        setVerificationStatus(data.status || '');
      })
      .catch(() => {});
  }, []);

  const goal = 500; // $5 goal
  const pct = Math.min(100, Math.round((balance / goal) * 100));

  function saveProfile() {
    localStorage.setItem('profile_firstName', firstName);
    localStorage.setItem('profile_lastName', lastName);
    localStorage.setItem('profile_email', email);
    localStorage.setItem('profile_phone', phone);
    localStorage.setItem('notify_email', notifyEmail ? '1' : '0');
    alert('Profile saved');
  }

  function signOut() {
    localStorage.removeItem('sess_uid');
    location.reload();
  }

  return (
    <main style={{ 
      padding:24, 
      maxWidth:1000, 
      margin:'0 auto',
      minHeight:'100vh',
      background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color:'#ffffff'
    }}>
      <p style={{ color:'rgba(255,255,255,0.8)', marginBottom:16 }}>Manage your account, earnings, notifications, and privacy.</p>

      {/* Earnings */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h2 style={{ marginBottom:8, color:'#ffffff' }}>Earnings</h2>
          <p style={{ color:'rgba(255,255,255,0.9)' }}>Available balance: <b>${(balance/100).toFixed(2)}</b></p>
          <div style={{ marginTop:8, height:12, background:'rgba(0,0,0,0.3)', borderRadius:8, overflow:'hidden', border:'1px solid rgba(255,255,255,0.2)', maxWidth:420 }}>
            <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg, #ff6a00, #ffc000)' }} />
          </div>
          <small style={{ color:'rgba(255,255,255,0.7)' }}>Progress to $5 withdraw goal</small>
        </section>

        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h2 style={{ marginBottom:8, color:'#ffffff' }}>Verification</h2>
          {verified ? (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:24 }}>✓</span>
              <span style={{ color:'#4ade80', fontWeight:600 }}>Verified</span>
            </div>
          ) : verificationStatus === 'pending' ? (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:24 }}>⏳</span>
                <span style={{ color:'#fbbf24', fontWeight:600 }}>Pending</span>
              </div>
              <small style={{ color:'rgba(255,255,255,0.7)' }}>Under review</small>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Not verified</span>
              <a href="/verify" style={{ display:'inline-block', background:'var(--primary)', color:'#fff', padding:'6px 12px', borderRadius:6, fontSize:14, fontWeight:700, textAlign:'center' }}>
                Verify Now
              </a>
            </div>
          )}
        </section>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {/* Basic Info */}
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Basic info</h3>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.7)' }}>User ID</label>
              <input value={userId || 'not signed in'} readOnly style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(0,0,0,0.3)', color:'#ffffff' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.7)' }}>First Name</label>
              <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First Name" style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.1)', color:'#ffffff' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.7)' }}>Last Name</label>
              <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Last Name" style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.1)', color:'#ffffff' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.7)' }}>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.1)', color:'#ffffff' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.7)' }}>Phone</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 123 4567" style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.1)', color:'#ffffff' }} />
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={saveProfile} style={{ background:'var(--primary)', color:'#fff', padding:'10px 14px', borderRadius:8, fontWeight:700 }}>Save</button>
              <button onClick={signOut} style={{ background:'rgba(255,255,255,0.1)', color:'#ffffff', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)' }}>Sign out</button>
            </div>
          </div>
        </section>

        {/* Previous Ads */}
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Previous Ads</h3>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            {previousAds.length === 0 ? (
              <p style={{ color:'rgba(255,255,255,0.7)', fontSize:14, marginTop:8 }}>No ads watched yet</p>
            ) : (
              previousAds.map((ad, idx) => (
                <a 
                  key={idx}
                  href={ad.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display:'block', 
                    padding:'10px 12px', 
                    background:'rgba(255,255,255,0.1)', 
                    borderRadius:8, 
                    textDecoration:'none',
                    color:'#ffffff',
                    border:'1px solid rgba(255,255,255,0.2)',
                    transition:'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <div style={{ fontSize:14, fontWeight:600 }}>{ad.title || 'Untitled Ad'}</div>
                  <div style={{ fontSize:12, color:'inherit', opacity:0.8, marginTop:4 }}>{ad.url}</div>
                </a>
              ))
            )}
          </div>
        </section>

        {/* Email Notifications */}
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Email Notifications</h3>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8, color:'#ffffff' }}>
              <input type="checkbox" checked={notifyEmail} onChange={e=>setNotifyEmail(e.target.checked)} /> Enable email notifications
            </label>
            <small style={{ color:'rgba(255,255,255,0.7)' }}>Receive updates about your earnings and account activity.</small>
          </div>
        </section>

        {/* Security */}
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Security</h3>
          <ul style={{ marginTop:8, color:'rgba(255,255,255,0.7)' }}>
            <li>Two‑factor authentication (coming soon)</li>
            <li>Login sessions and devices (coming soon)</li>
            <li>Passkeys/WebAuthn (coming soon)</li>
          </ul>
        </section>
      </div>

      {/* Additional options */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginTop:16 }}>
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Past ad campaigns</h3>
          <p style={{ color:'rgba(255,255,255,0.7)', marginTop:6 }}>Review your submitted ads, statuses, and results.</p>
          <a href="/post" style={{ marginTop:12, display:'inline-block', background:'var(--primary)', color:'#fff', padding:'10px 14px', borderRadius:8, fontWeight:700 }}>View campaigns</a>
        </section>
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Help & Support</h3>
          <p style={{ color:'rgba(255,255,255,0.7)', marginTop:6 }}>Get help with your account, payouts, or reporting issues.</p>
          <a href="/docs" style={{ marginTop:12, display:'inline-block', background:'rgba(255,255,255,0.1)', color:'#ffffff', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)' }}>Open help center</a>
        </section>
        <section style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:16 }}>
          <h3 style={{ color:'#ffffff' }}>Parental guidelines</h3>
          <p style={{ color:'rgba(255,255,255,0.7)', marginTop:6 }}>Learn how we keep content appropriate and how to set viewing restrictions.</p>
          <a href="/guidelines/parents" style={{ marginTop:12, display:'inline-block', background:'rgba(255,255,255,0.1)', color:'#ffffff', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)' }}>View guidelines</a>
        </section>
      </div>
    </main>
  );
}


