'use client';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyReceipts, setNotifyReceipts] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem('sess_uid') || '';
    setUserId(uid);
    setBalance(parseInt(localStorage.getItem('balance_cents') || '0', 10));
    setEmail(localStorage.getItem('profile_email') || '');
    setPhone(localStorage.getItem('profile_phone') || '');
    setNotifyEmail(localStorage.getItem('notify_email') !== '0');
    setNotifyReceipts(localStorage.getItem('notify_receipts') !== '0');
    setPrivateProfile(localStorage.getItem('private_profile') === '1');
  }, []);

  const goal = 500; // $5 goal
  const pct = Math.min(100, Math.round((balance / goal) * 100));

  function saveProfile() {
    localStorage.setItem('profile_email', email);
    localStorage.setItem('profile_phone', phone);
    localStorage.setItem('notify_email', notifyEmail ? '1' : '0');
    localStorage.setItem('notify_receipts', notifyReceipts ? '1' : '0');
    localStorage.setItem('private_profile', privateProfile ? '1' : '0');
    alert('Profile saved');
  }

  function signOut() {
    localStorage.removeItem('sess_uid');
    location.reload();
  }

  return (
    <main style={{ padding:24, maxWidth:1000, margin:'0 auto' }}>
      <h1>Profile</h1>
      <p style={{ color:'var(--muted)', marginBottom:16 }}>Manage your account, earnings, notifications, and privacy.</p>

      {/* Earnings */}
      <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16, marginBottom:16 }}>
        <h2 style={{ marginBottom:8 }}>Earnings</h2>
        <p style={{ color:'var(--muted)' }}>Available balance: <b>${(balance/100).toFixed(2)}</b></p>
        <div style={{ marginTop:8, height:12, background:'#f5f5f5', borderRadius:8, overflow:'hidden', border:'1px solid var(--border)', maxWidth:420 }}>
          <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg, #ff6a00, #ffc000)' }} />
        </div>
        <small style={{ color:'var(--muted)' }}>Progress to $5 withdraw goal</small>
      </section>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {/* Basic Info */}
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Basic info</h3>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            <div>
              <label style={{ display:'block', fontSize:12, color:'var(--muted)' }}>User ID</label>
              <input value={userId || 'not signed in'} readOnly style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'var(--muted)' }}>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, color:'var(--muted)' }}>Phone</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 123 4567" style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'#ffffff' }} />
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={saveProfile} style={{ background:'var(--primary)', color:'#fff', padding:'10px 14px', borderRadius:8, fontWeight:700 }}>Save</button>
              <button onClick={signOut} style={{ background:'#f5f5f5', color:'var(--foreground)', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)' }}>Sign out</button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Notifications</h3>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8 }}>
              <input type="checkbox" checked={notifyEmail} onChange={e=>setNotifyEmail(e.target.checked)} /> Email announcements
            </label>
            <label style={{ display:'flex', alignItems:'center', gap:8 }}>
              <input type="checkbox" checked={notifyReceipts} onChange={e=>setNotifyReceipts(e.target.checked)} /> Email receipts after completed views
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Privacy</h3>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8 }}>
              <input type="checkbox" checked={privateProfile} onChange={e=>setPrivateProfile(e.target.checked)} /> Make my profile private
            </label>
            <small style={{ color:'var(--muted)' }}>When enabled, your activity and profile details are hidden from other users.</small>
          </div>
        </section>

        {/* Security */}
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Security</h3>
          <ul style={{ marginTop:8, color:'var(--muted)' }}>
            <li>Two‑factor authentication (coming soon)</li>
            <li>Login sessions and devices (coming soon)</li>
            <li>Passkeys/WebAuthn (coming soon)</li>
          </ul>
        </section>
      </div>

      {/* Additional options */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginTop:16 }}>
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Past ad campaigns</h3>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Review your submitted ads, statuses, and results.</p>
          <a href="/post" style={{ marginTop:12, display:'inline-block', background:'var(--primary)', color:'#fff', padding:'10px 14px', borderRadius:8, fontWeight:700 }}>View campaigns</a>
        </section>
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Help & Support</h3>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Get help with your account, payouts, or reporting issues.</p>
          <a href="/docs" style={{ marginTop:12, display:'inline-block', background:'#f5f5f5', color:'var(--foreground)', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)' }}>Open help center</a>
        </section>
        <section style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          <h3>Parental guidelines</h3>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Learn how we keep content appropriate and how to set viewing restrictions.</p>
          <a href="/guidelines/parents" style={{ marginTop:12, display:'inline-block', background:'#f5f5f5', color:'var(--foreground)', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)' }}>View guidelines</a>
        </section>
      </div>
    </main>
  );
}


