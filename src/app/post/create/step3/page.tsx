'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cacheVideoData } from '@/lib/video-cache';

export default function CreateStep3() {
  const router = useRouter();
  const fileRef = useRef<File | null>(null);
  const videoDataRef = useRef<{ blobUrl: string; base64: string; frames: string[] } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [duration, setDuration] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle'|'uploading'|'moderating'|'approved'|'rejected'>('idle');
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFrames, setVideoFrames] = useState<string[]>([]);
  const [q1, setQ1] = useState('');
  const [q1Type, setQ1Type] = useState<'tf'|'mc'>('tf');
  const [q1Options, setQ1Options] = useState<string>('');
  const [q1Correct, setQ1Correct] = useState<number>(0);
  const [q2, setQ2] = useState('');
  const [q2Type, setQ2Type] = useState<'tf'|'mc'>('tf');
  const [q2Options, setQ2Options] = useState<string>('');
  const [q2Correct, setQ2Correct] = useState<number>(0);

  async function checkDuration(videoFile: File) {
    return new Promise<number>((resolve, reject) => {
      const video = document.createElement('video');
      const url = URL.createObjectURL(videoFile);
      
      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        URL.revokeObjectURL(url);
        reject(new Error('Video loading timed out. The file may be corrupted or in an unsupported format.'));
      }, 10000); // 10 second timeout
      
      // Normalize MIME type - some files have uppercase extensions but lowercase MIME
      let mimeType = videoFile.type || 'video/mp4';
      if (!mimeType || mimeType === 'application/octet-stream') {
        const ext = videoFile.name.toLowerCase().split('.').pop();
        if (ext === 'mp4') mimeType = 'video/mp4';
        else if (ext === 'webm') mimeType = 'video/webm';
        else if (ext === 'mov') mimeType = 'video/quicktime';
        else mimeType = 'video/mp4'; // Default fallback
      }
      
      video.preload = 'metadata';
      video.muted = true; // Some browsers require muted for autoplay
      
      // Add error handler BEFORE setting src
      video.onerror = (e) => {
        clearTimeout(timeout);
        console.error('❌ Video load error:', e);
        console.error('❌ Video file name:', videoFile.name);
        console.error('❌ Video file type:', videoFile.type);
        console.error('❌ Video file size:', videoFile.size);
        console.error('❌ Video error code:', video.error?.code);
        console.error('❌ Video error details:', video.error);
        
        // Map error codes to user-friendly messages
        let errorMsg = 'Could not read video file. ';
        if (video.error) {
          switch (video.error.code) {
            case 1: // MEDIA_ERR_ABORTED
              errorMsg += 'Loading was aborted.';
              break;
            case 2: // MEDIA_ERR_NETWORK
              errorMsg += 'Network error occurred.';
              break;
            case 3: // MEDIA_ERR_DECODE
              errorMsg += 'Video codec not supported. Try converting to MP4 (H.264).';
              break;
            case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
              errorMsg += 'Video format not supported. Try MP4 or WebM format.';
              break;
            default:
              errorMsg += video.error.message || 'Unknown error.';
          }
        } else {
          errorMsg += 'Please try a different format (MP4 with H.264 codec recommended).';
        }
        
        URL.revokeObjectURL(url);
        reject(new Error(errorMsg));
      };
      
      video.onloadedmetadata = () => {
        clearTimeout(timeout);
        console.log('✅ Video loaded successfully:', video.duration, 'seconds');
        URL.revokeObjectURL(url);
        resolve(video.duration);
      };
      
      // Set src AFTER attaching handlers
      video.src = url;
      video.load(); // Explicitly trigger load
    });
  }

  async function extractVideoFrames(videoFile: File, numFrames: number = 3): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const frames: string[] = [];
      
      const url = URL.createObjectURL(videoFile);
      video.src = url;
      video.crossOrigin = 'anonymous';
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const duration = video.duration;
        const interval = duration / (numFrames + 1);
        
        const timesToCapture: number[] = [];
        for (let i = 1; i <= numFrames; i++) {
          timesToCapture.push(interval * i);
        }
        
        let currentIndex = 0;
        
        const captureFrame = () => {
          if (currentIndex >= timesToCapture.length) {
            URL.revokeObjectURL(url);
            resolve(frames);
            return;
          }
          
          const currentTime = timesToCapture[currentIndex];
          video.currentTime = currentTime;
        };
        
        video.onseeked = () => {
          if (ctx && currentIndex < timesToCapture.length) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
            frames.push(base64);
            currentIndex++;
            captureFrame();
          }
        };
        
        captureFrame();
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load video'));
      };
    });
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    console.log('📁 File selected:', f.name, f.size, 'bytes');
    setError('');
    setFile(f);
    fileRef.current = f;
    try {
      const d = await checkDuration(f);
      console.log('⏱️ Duration:', d, 'seconds');
      setDuration(d);
      if (d > 30) {
        setError('Video must be 30 seconds or less.');
        setFile(null);
        fileRef.current = null;
      }
    } catch (e: any) {
      console.error('❌ Duration check error:', e);
      setError(e?.message || 'Could not read video file. Please try a different format (MP4, WebM, etc.).');
    }
  }

  async function uploadAndModerate() {
    console.log('🚀 Upload button clicked!', { file: !!file, duration, status });
    if (!file || !duration || duration > 30) {
      console.error('❌ Upload blocked:', { hasFile: !!file, duration });
      return;
    }
    setStatus('uploading');
    setError('');
    try {
      // Upload through our API (bypasses CORS issues)
      console.log('📤 Uploading video through API...', file.name, file.size, 'bytes');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!uploadRes.ok) {
        const uploadError = await uploadRes.json();
        throw new Error(`Upload failed: ${uploadError.error || 'Unknown error'}`);
      }
      
      const { key, url: r2PublicUrl } = await uploadRes.json();
      console.log('✅ Video uploaded successfully:', key);
      
      // Set video URL for preview
      setVideoUrl(r2PublicUrl);
      setStatus('moderating');
      
      // Use R2 key for submission (or base64 if mock)
      let finalVideoUrl: string;
      let blobUrl: string;
      
      if (key.startsWith('mock/')) {
        // Mock storage: convert to base64
        blobUrl = URL.createObjectURL(file);
        setVideoUrl(blobUrl);
        
        const reader = new FileReader();
        const base64Url = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const base64 = dataUrl.split(',')[1];
            const normalizedUrl = `data:video/mp4;base64,${base64}`;
            resolve(normalizedUrl);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        finalVideoUrl = base64Url;
      } else {
        // Real R2 storage
        finalVideoUrl = key;
        blobUrl = r2PublicUrl;
      }
      
      // Extract video frames for moderation
      try {
        const frames = await extractVideoFrames(file, 3);
        setVideoFrames(frames);
      } catch (e) {
        // Failed to extract frames - will be handled during submission
      }
      
      // Mark as approved - actual moderation happens during submission
      setStatus('approved');
      
      // Convert thumbnail to base64 if provided
      let thumbnailBase64 = undefined;
      if (thumbnailFile) {
        const reader = new FileReader();
        thumbnailBase64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(thumbnailFile);
        });
      }
      
      // Store video data in cache for later submission
      cacheVideoData({
        blobUrl,
        base64: finalVideoUrl,
        frames: videoFrames,
        thumbnail: thumbnailBase64
      });
      
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('ad_approved', '1');
        } catch (e) {
          // Silent error handling
        }
      }
    } catch (e: any) {
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

        <label style={{ display:'block', textAlign:'left', marginTop:16, marginBottom:8, fontWeight:600 }}>Thumbnail Image (optional)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setThumbnailFile(f);
              const reader = new FileReader();
              reader.onloadend = () => setThumbnailPreview(reader.result as string);
              reader.readAsDataURL(f);
            }
          }}
          disabled={status === 'uploading' || status === 'moderating'}
          style={{ width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid var(--border)', background:'#ffffff', color:'var(--foreground)' }}
        />
        {thumbnailPreview && (
          <img src={thumbnailPreview} alt="Thumbnail preview" style={{ marginTop:12, width:'100%', maxHeight:200, objectFit:'contain', borderRadius:8, border:'1px solid var(--border)' }} />
        )}

        {/* Debug info */}
        {(file || duration !== null || error) && (
          <div style={{ marginTop:12, padding:12, background:'#f0f0f0', borderRadius:8, fontSize:'12px', textAlign:'left' }}>
            <strong>Debug:</strong><br/>
            File: {file ? file.name : 'None'}<br/>
            Duration: {duration !== null ? duration.toFixed(1) + 's' : 'Unknown'}<br/>
            Status: {status}<br/>
            HasError: {error ? 'Yes' : 'No'}<br/>
            {error && <strong style={{color:'red'}}>Error: {error}</strong>}
          </div>
        )}

        {file && duration && duration <= 30 && status === 'idle' ? (
          <button 
            onClick={async () => {
              console.log('🔵 Upload button clicked!', { fileName: file.name, size: file.size, duration });
              try {
                await uploadAndModerate();
              } catch (e) {
                console.error('❌ Upload error:', e);
              }
            }}
            style={{ marginTop:12, background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700, width:'100%', cursor:'pointer' }}
          >
            Upload and verify
          </button>
        ) : file && duration && duration > 30 ? (
          <p style={{ marginTop:12, color:'#ff4444' }}>Video is too long (max 30 seconds)</p>
        ) : null}

        {status === 'uploading' && <p style={{ marginTop:12 }}>Uploading...</p>}
        {status === 'moderating' && <p style={{ marginTop:12 }}>AI is checking your video...</p>}
        {status === 'approved' && (
          <div style={{ marginTop:12 }}>
            <p style={{ color:'var(--primary)', fontWeight:700, textAlign:'center' }}>✓ Approved! Now create quiz questions.</p>
            
            <div style={{ marginTop:24, padding:20, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12 }}>
              <h3 style={{ marginBottom:8 }}>Question 1</h3>
              <input value={q1} onChange={e=>setQ1(e.target.value)} placeholder="Enter your first question..." style={{ width:'100%', padding:'12px 16px', border:'1px solid var(--border)', borderRadius:8, fontSize:'14px' }} />
              
            <div style={{ marginTop:12 }}>
              <label style={{ fontSize:'13px', color:'var(--muted)', marginBottom:6, display:'block' }}>Question Type</label>
              <select value={q1Type} onChange={e=>setQ1Type(e.target.value as any)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', width:'100%' }}>
                <option value="tf">True / False</option>
                <option value="mc">Multiple Choice</option>
              </select>
            </div>

            {q1Type === 'tf' && (
              <div style={{ marginTop:12 }}>
                <label style={{ fontSize:'13px', color:'var(--muted)', marginBottom:8, display:'block' }}>Correct Answer</label>
                <select value={q1Correct} onChange={e=>setQ1Correct(parseInt(e.target.value)||0)} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)' }}>
                  <option value={0}>True</option>
                  <option value={1}>False</option>
                </select>
              </div>
            )}

            {q1Type === 'mc' && (
              <div style={{ marginTop:12 }}>
                <label style={{ fontSize:'13px', color:'var(--muted)', marginBottom:8, display:'block' }}>Answer Options (separate with commas)</label>
                <input value={q1Options} onChange={e=>setQ1Options(e.target.value)} placeholder="Dog, Cat, Bird, Fish" style={{ width:'100%', padding:'12px 16px', border:'1px solid var(--border)', borderRadius:8, fontSize:'14px' }} />
                <label style={{ fontSize:'13px', color:'var(--muted)', marginTop:12, marginBottom:6, display:'block' }}>Which option is correct?</label>
                <select value={q1Correct} onChange={e=>setQ1Correct(parseInt(e.target.value)||0)} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)' }}>
                  {(q1Options || '').split(',').map((opt, i) => (
                    <option key={i} value={i}>{i+1}. {opt.trim() || `Option ${i+1}`}</option>
                  ))}
                </select>
              </div>
            )}
            </div>

            <div style={{ marginTop:16, padding:20, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12 }}>
              <h3 style={{ marginBottom:8 }}>Question 2</h3>
              <input value={q2} onChange={e=>setQ2(e.target.value)} placeholder="Enter your second question..." style={{ width:'100%', padding:'12px 16px', border:'1px solid var(--border)', borderRadius:8, fontSize:'14px' }} />
              
              <div style={{ marginTop:12 }}>
                <label style={{ fontSize:'13px', color:'var(--muted)', marginBottom:6, display:'block' }}>Question Type</label>
                <select value={q2Type} onChange={e=>setQ2Type(e.target.value as any)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', width:'100%' }}>
                  <option value="tf">True / False</option>
                  <option value="mc">Multiple Choice</option>
                </select>
              </div>

              {q2Type === 'tf' && (
                <div style={{ marginTop:12 }}>
                  <label style={{ fontSize:'13px', color:'var(--muted)', marginBottom:8, display:'block' }}>Correct Answer</label>
                  <select value={q2Correct} onChange={e=>setQ2Correct(parseInt(e.target.value)||0)} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)' }}>
                    <option value={0}>True</option>
                    <option value={1}>False</option>
                  </select>
                </div>
              )}

              {q2Type === 'mc' && (
                <div style={{ marginTop:12 }}>
                  <label style={{ fontSize:'13px', color:'var(--muted)', marginBottom:8, display:'block' }}>Answer Options (separate with commas)</label>
                  <input value={q2Options} onChange={e=>setQ2Options(e.target.value)} placeholder="Dog, Cat, Bird, Fish" style={{ width:'100%', padding:'12px 16px', border:'1px solid var(--border)', borderRadius:8, fontSize:'14px' }} />
                  <label style={{ fontSize:'13px', color:'var(--muted)', marginTop:12, marginBottom:6, display:'block' }}>Which option is correct?</label>
                  <select value={q2Correct} onChange={e=>setQ2Correct(parseInt(e.target.value)||0)} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)' }}>
                    {(q2Options || '').split(',').map((opt, i) => (
                      <option key={i} value={i}>{i+1}. {opt.trim() || `Option ${i+1}`}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {error && <p style={{ marginTop:16, color:'#ff4444' }}>{error}</p>}

            <button 
              onClick={() => {
                // Save quiz to localStorage
                if (typeof window !== 'undefined') {
                  try {
                    const quiz = {
                      q1: {
                        type: q1Type,
                        question: q1,
                        options: q1Type === 'tf' ? ['True','False'] : (q1Options || '').split(',').map(s=>s.trim()).filter(Boolean),
                        correctIndex: q1Correct || 0
                      },
                      q2: {
                        type: q2Type,
                        question: q2,
                        options: q2Type === 'tf' ? ['True','False'] : (q2Options || '').split(',').map(s=>s.trim()).filter(Boolean),
                        correctIndex: q2Correct || 0
                      }
                    };
                    localStorage.setItem('ad_quiz', JSON.stringify(quiz));
                  } catch (e) {
                    console.error('Error saving quiz:', e);
                  }
                }
                router.push('/post/create/payment');
              }}
              disabled={!q1.trim() || !q2.trim()}
              style={{ 
                marginTop:24, 
                background:(!q1.trim() || !q2.trim()) ? '#ccc' : 'var(--primary)', 
                color:'#000', 
                padding:'14px 20px', 
                borderRadius:10, 
                fontWeight:700, 
                width:'100%',
                cursor: (!q1.trim() || !q2.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              Continue to payment
            </button>
          </div>
        )}
        {status === 'rejected' && <p style={{ marginTop:12, color:'#ff4444' }}>{error || 'Video rejected'}</p>}
      </div>
    </main>
  );
}
