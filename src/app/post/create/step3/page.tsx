'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateStep3() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle'|'uploading'|'moderating'|'approved'|'rejected'>('idle');
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  async function checkDuration(videoFile: File) {
    return new Promise<number>((resolve, reject) => {
      const video = document.createElement('video');
      const url = URL.createObjectURL(videoFile);
      video.src = url;
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(video.duration);
      };
      video.onerror = () => reject(new Error('Failed to load video'));
    });
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError('');
    setFile(f);
    try {
      const d = await checkDuration(f);
      setDuration(d);
      if (d > 30) {
        setError('Video must be 30 seconds or less.');
        setFile(null);
      }
    } catch (e: any) {
      setError('Could not read video file.');
    }
  }

  async function uploadAndModerate() {
    if (!file || !duration || duration > 30) return;
    setStatus('uploading');
    setError('');
    try {
      // Get presigned URL
      const presignRes = await fetch('/api/storage/presign', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contentType: file.type || 'video/mp4' }) });
      
      if (!presignRes.ok) {
        const presignError = await presignRes.json();
        throw new Error(`Failed to get upload URL: ${presignError.error || 'Unknown error'}`);
      }
      
      const { url: uploadUrl, key } = await presignRes.json();
      
      // Upload to S3 (or mock in development)
      // If it's a mock URL, skip the upload
      if (!uploadUrl.includes('mock-storage.localhost')) {
        const uploadRes = await fetch(uploadUrl, { method: 'PUT', headers: { 'content-type': file.type || 'video/mp4' }, body: file });
        
        if (!uploadRes.ok) {
          throw new Error('Failed to upload video to storage');
        }
      }
      
      setVideoUrl(key);
      
      // Start moderation
      setStatus('moderating');
      const creativeId = 'cr_' + Date.now();
      
      // Get localStorage values safely
      let advertiserId = 'unknown';
      let title = '';
      let description = '';
      let advertiserUrl = '';
      let quiz: any = undefined;
      if (typeof window !== 'undefined') {
        try {
          advertiserId = localStorage.getItem('ad_businessName') || 'unknown';
          title = localStorage.getItem('ad_businessName') || '';
          description = localStorage.getItem('ad_description') || '';
          advertiserUrl = localStorage.getItem('ad_website') || '';
          const q = localStorage.getItem('ad_quiz');
          if (q) quiz = JSON.parse(q);
        } catch (e) {
          console.error('Error reading localStorage:', e);
        }
      }
      
      const modRes = await fetch('/api/creatives/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: creativeId,
          advertiserId,
          videoUrl: key,
          title,
          description,
          advertiserUrl,
          quiz
        })
      });
      
      if (!modRes.ok) {
        const modError = await modRes.json();
        throw new Error(`Moderation failed: ${modError.error || 'Unknown error'}`);
      }
      
      const modData = await modRes.json();
      
      if (modData.status === 'approved') {
        setStatus('approved');
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('ad_approved', '1');
            localStorage.setItem('ad_videoUrl', key);
            localStorage.setItem('ad_creativeId', creativeId);
            if (advertiserUrl) localStorage.setItem('ad_website', advertiserUrl);
          } catch (e) {
            console.error('Error setting localStorage:', e);
          }
        }
      } else {
        setStatus('rejected');
        setError(modData.reasons?.join(', ') || 'Video rejected by moderation');
      }
    } catch (e: any) {
      console.error('Upload error:', e);
      setError(e?.message || 'Upload failed');
      setStatus('idle');
    }
  }

  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:520, width:'100%' }}>
        <h1>Submit your video</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Upload a video (max 30 seconds). AI will verify it meets our standards.</p>

        {duration !== null && duration <= 30 && (
          <p style={{ marginTop:8, color:'var(--primary)' }}>Duration: {duration.toFixed(1)}s ✓</p>
        )}

        <input 
          type="file" 
          accept="video/*" 
          onChange={handleFile}
          disabled={status === 'uploading' || status === 'moderating'}
          style={{ marginTop:16, width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }}
        />

        {file && duration && duration <= 30 && status === 'idle' && (
          <button 
            onClick={uploadAndModerate}
            style={{ marginTop:12, background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700, width:'100%' }}
          >
            Upload and verify
          </button>
        )}

        {status === 'uploading' && <p style={{ marginTop:12 }}>Uploading...</p>}
        {status === 'moderating' && <p style={{ marginTop:12 }}>AI is checking your video...</p>}
        {status === 'approved' && (
          <div style={{ marginTop:12 }}>
            <p style={{ color:'var(--primary)', fontWeight:700 }}>✓ Approved! Your video is ready to post.</p>
            <button 
              onClick={() => router.push('/post/create/payment')}
              style={{ marginTop:8, background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700, width:'100%' }}
            >
              Continue to payment
            </button>
          </div>
        )}
        {status === 'rejected' && (
          <p style={{ marginTop:12, color:'#ff4444' }}>Rejected: {error}</p>
        )}
        {error && status === 'idle' && <p style={{ marginTop:8, color:'#ff4444' }}>{error}</p>}
      </div>
    </main>
  );
}
