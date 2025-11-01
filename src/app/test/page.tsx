'use client';
import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('Test Ad');
  const [description, setDescription] = useState('This is a test ad');
  const [advertiserId, setAdvertiserId] = useState('');

  async function testCreateAd() {
    setLoading(true);
    setResult(null);
    try {
      const id = advertiserId || localStorage.getItem('ad_businessName') || 'test_business';
      const res = await fetch('/api/test/create-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, advertiserId: id })
      });
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  }

  async function testListAds() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/creatives/all');
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  }

  async function testWatchAds() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/creatives/list');
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1>System Test Page</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
        Test the ad creation and listing flow without payment
      </p>

      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}>
          <h3 style={{ marginBottom: 12 }}>1. Create Test Ad</h3>
          <input
            placeholder="Ad Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6, border: '1px solid var(--border)' }}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6, border: '1px solid var(--border)', minHeight: 60 }}
          />
          <input
            placeholder="Business Name (optional)"
            value={advertiserId}
            onChange={e => setAdvertiserId(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6, border: '1px solid var(--border)' }}
          />
          <button
            onClick={testCreateAd}
            disabled={loading}
            style={{ padding: '10px 16px', background: 'var(--primary)', color: '#000', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Creating...' : 'Create Test Ad'}
          </button>
        </div>

        <div style={{ padding: 16, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}>
          <h3 style={{ marginBottom: 12 }}>2. List All Ads (Post Tab)</h3>
          <button
            onClick={testListAds}
            disabled={loading}
            style={{ padding: '10px 16px', background: '#3b82f6', color: '#fff', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Loading...' : 'List All Ads'}
          </button>
        </div>

        <div style={{ padding: 16, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}>
          <h3 style={{ marginBottom: 12 }}>3. List Approved Ads (Watch Tab)</h3>
          <button
            onClick={testWatchAds}
            disabled={loading}
            style={{ padding: '10px 16px', background: '#22c55e', color: '#fff', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Loading...' : 'List Watch Ads'}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ padding: 16, background: '#f0f0f0', borderRadius: 8, marginTop: 24 }}>
          <h3 style={{ marginBottom: 8 }}>Result:</h3>
          <pre style={{ background: '#fff', padding: 12, borderRadius: 6, overflow: 'auto', fontSize: 12 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: 24, padding: 16, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8 }}>
        <strong>How to Test:</strong>
        <ol style={{ marginTop: 8, paddingLeft: 20 }}>
          <li>Click "Create Test Ad" - this simulates what happens after payment</li>
          <li>Click "List All Ads" - this is what the Post tab shows</li>
          <li>Click "List Watch Ads" - this is what the Watch tab shows</li>
          <li>Go to <a href="/post" style={{ color: 'var(--primary)' }}>/post</a> to see if your ad appears</li>
          <li>Go to <a href="/watch" style={{ color: 'var(--primary)' }}>/watch</a> to see if it's approved</li>
        </ol>
      </div>
    </main>
  );
}


