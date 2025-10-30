'use client';
import { useEffect, useState } from 'react';

export default function Verify() {
  const [userId, setUserId] = useState('');
  const [verified, setVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [idType, setIdType] = useState<'drivers_license' | 'passport' | 'state_id'>('drivers_license');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem('sess_uid') || '';
    setUserId(uid);
    
    // Load existing verification status
    fetch(`/api/verify/status`)
      .then(res => res.json())
      .then(data => {
        if (data.verified) {
          setVerified(true);
          setVerificationStatus('approved');
        } else if (data.status) {
          setVerificationStatus(data.status);
          setSubmitted(true);
          if (data.fullName) setFullName(data.fullName);
          if (data.dateOfBirth) setDateOfBirth(data.dateOfBirth);
          if (data.idType) setIdType(data.idType);
        }
      })
      .catch(() => {});
  }, []);

  async function submitVerification() {
    setError('');
    
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }
    
    if (!dateOfBirth) {
      setError('Date of birth is required');
      return;
    }
    
    if (!idNumber.trim()) {
      setError('ID number is required');
      return;
    }
    
    const res = await fetch('/api/verify/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        dateOfBirth,
        idType,
        idNumber
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      setSubmitted(true);
      setVerificationStatus('pending');
    } else {
      setError(data.error || 'Failed to submit verification');
    }
  }

  if (!userId) {
    return (
      <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h1>Identity Verification</h1>
        <p style={{ color: 'var(--muted)' }}>Please <a href="/login">log in</a> to verify your identity.</p>
      </main>
    );
  }

  if (verified || verificationStatus === 'approved') {
    return (
      <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h1>Identity Verification</h1>
        <div style={{ background: '#dff2bf', border: '1px solid #4caf50', borderRadius: 12, padding: 24, marginTop: 16 }}>
          <p style={{ color: '#2e7d32', fontWeight: 600 }}>✓ Your identity has been verified</p>
          <p style={{ color: '#2e7d32', marginTop: 8 }}>You can now access all features including full earnings and payouts.</p>
        </div>
      </main>
    );
  }

  if (verificationStatus === 'rejected') {
    return (
      <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h1>Identity Verification</h1>
        <div style={{ background: '#fecdd3', border: '1px solid #ef4444', borderRadius: 12, padding: 24, marginTop: 16 }}>
          <p style={{ color: '#991b1b', fontWeight: 600 }}>✗ Verification Rejected</p>
          <p style={{ color: '#991b1b', marginTop: 8 }}>Your verification was rejected. Please review your information and try again.</p>
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={() => setSubmitted(false)} style={{ background: 'var(--primary)', color: '#fff', padding: '10px 16px', borderRadius: 8, fontWeight: 700 }}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (submitted && verificationStatus === 'pending') {
    return (
      <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h1>Identity Verification</h1>
        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 12, padding: 24, marginTop: 16 }}>
          <p style={{ color: '#92400e', fontWeight: 600 }}>⏳ Verification Pending</p>
          <p style={{ color: '#92400e', marginTop: 8 }}>Your verification request is being reviewed. This typically takes 24-48 hours.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1>Identity Verification</h1>
      <p style={{ color: 'var(--muted)', marginTop: 6 }}>Verify your identity to access full earnings and payouts. Your information is secure and encrypted.</p>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginTop: 16 }}>
        <h2 style={{ marginBottom: 16 }}>Personal Information</h2>
        
        {success && (
          <div style={{ background: '#dff2bf', border: '1px solid #4caf50', borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <p style={{ color: '#2e7d32' }}>✓ Verification submitted successfully!</p>
          </div>
        )}
        
        {error && (
          <div style={{ background: '#fecdd3', border: '1px solid #ef4444', borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <p style={{ color: '#991b1b' }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Full Legal Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="John Doe"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: '#ffffff', color: 'var(--foreground)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: '#ffffff', color: 'var(--foreground)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>ID Type</label>
            <select
              value={idType}
              onChange={e => setIdType(e.target.value as any)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: '#ffffff', color: 'var(--foreground)' }}
            >
              <option value="drivers_license">Driver's License</option>
              <option value="passport">Passport</option>
              <option value="state_id">State ID</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>ID Number</label>
            <input
              type="text"
              value={idNumber}
              onChange={e => setIdNumber(e.target.value)}
              placeholder="Enter your ID number"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)', background: '#ffffff', color: 'var(--foreground)' }}
            />
            <small style={{ color: 'var(--muted)', display: 'block', marginTop: 6 }}>
              Enter the number from your {idType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </small>
          </div>

          <button
            onClick={submitVerification}
            style={{ background: 'var(--primary)', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}
          >
            Submit Verification
          </button>
        </div>
      </div>

      <div style={{ background: '#f0f9ff', border: '1px solid #0284c7', borderRadius: 12, padding: 24, marginTop: 24 }}>
        <h3 style={{ color: '#0c4a6e', marginBottom: 12 }}>Security & Privacy</h3>
        <ul style={{ color: '#0c4a6e', marginLeft: 20 }}>
          <li>All information is encrypted and stored securely</li>
          <li>Verification is required for payouts over $5</li>
          <li>Your data is never shared with third parties</li>
          <li>Verification typically takes 24-48 hours</li>
        </ul>
      </div>
    </main>
  );
}

