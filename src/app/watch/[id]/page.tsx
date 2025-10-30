'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const CORRECT_ANSWERS = { q1: 'Alpha', q2: 'Orange' }; // Example correct answers

export default function WatchDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sess_uid') || 'guest';
    }
    return 'guest';
  });
  const [userEmail] = useState('');
  const [videoEnded, setVideoEnded] = useState(false);
  const [qOpen, setQOpen] = useState(false);
  const [answers, setAnswers] = useState<{q1?: string; q2?: string}>({});
  const [result, setResult] = useState<any>(null);
  const [lastSeekTime, setLastSeekTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function handleTimeUpdate() {
      if (!video) return;
      // Prevent seeking forward
      if (video.currentTime > lastSeekTime + 0.5) {
        video.currentTime = lastSeekTime;
      }
      setLastSeekTime(video.currentTime);
    }

    function handleSeeking() {
      if (!video) return;
      if (video.currentTime > lastSeekTime + 0.5) {
        video.currentTime = lastSeekTime;
      }
    }

    function handleEnded() {
      setVideoEnded(true);
      setQOpen(true);
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('ended', handleEnded);
    };
  }, [lastSeekTime]);

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }

  async function submitAnswers() {
    const q1Correct = answers.q1 === CORRECT_ANSWERS.q1;
    const q2Correct = answers.q2 === CORRECT_ANSWERS.q2;
    const bothCorrect = q1Correct && q2Correct;

    if (!bothCorrect) {
      setResult({ error: 'One or more answers are incorrect. Watch the video again to try.', correct: false });
      setQOpen(false);
      return;
    }

    // Only reward if both correct
    const res = await fetch('/api/impressions/complete', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        impressionId: 'imp_' + Math.random().toString(36).slice(2),
        userId,
        creativeId: id,
        userEmail: userEmail || undefined,
        quizCorrect: true
      })
    });
    const data = await res.json();
    setResult(data);
    setQOpen(false);
    
    // Increment watched count for today in localStorage
    if (typeof window !== 'undefined' && !data.error) {
      const today = new Date().toISOString().slice(0, 10);
      const watchedKey = `watched_today_${userId}`;
      const lastWatchDate = localStorage.getItem(`last_watch_date_${userId}`);
      
      // Reset counter if it's a new day
      if (lastWatchDate !== today) {
        localStorage.removeItem(watchedKey);
        localStorage.setItem(`last_watch_date_${userId}`, today);
      }
      
      const currentCount = parseInt(localStorage.getItem(watchedKey) || '0');
      localStorage.setItem(watchedKey, (currentCount + 1).toString());
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <a href="/watch" style={{ color: 'var(--primary)' }}>← Back to all ads</a>
      
      <div style={{ marginTop: 24, maxWidth: 800 }}>
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
          {!videoEnded ? (
            <div>
              <video
                ref={videoRef}
                controls
                controlsList="nodownload nofullscreen"
                onContextMenu={(e) => e.preventDefault()}
                style={{ width:'100%', borderRadius:8 }}
                onPlay={handlePlay}
              >
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p style={{ marginTop: 8, color: 'var(--muted)', fontSize: 14 }}>
                Watch the entire video to answer questions and earn $0.25
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <p style={{ fontSize: 18, fontWeight: 600 }}>Video completed!</p>
              <p style={{ color: 'var(--muted)', marginTop: 8 }}>Answer the questions to earn your reward.</p>
            </div>
          )}
        </div>


        {result && (
          <div style={{ marginTop: 16, padding: 16, background: result.error ? '#fee' : '#efe', border:'1px solid var(--border)', borderRadius:8 }}>
            {result.error ? (
              <p style={{ color: '#c00' }}>{result.error}</p>
            ) : (
              <p style={{ color: '#0a0' }}>✓ Correct! You earned $0.25. Balance: ${((result.balanceCents || 0) / 100).toFixed(2)}</p>
            )}
          </div>
        )}
      </div>

      {qOpen && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'grid', placeItems:'center', zIndex:1000 }}>
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:24, width:520, maxWidth:'90vw' }} onClick={e=>e.stopPropagation()}>
            <h2 style={{ marginBottom:16 }}>Answer the questions</h2>
            <p style={{ color:'var(--muted)', marginBottom:16 }}>Answer both correctly to earn $0.25.</p>
            
            <div style={{ marginBottom:20 }}>
              <p style={{ fontWeight:600, marginBottom:8 }}>1) What brand was shown?</p>
              <div style={{ display:'grid', gap:8 }}>
                {['Alpha','Bravo','Charlie','Delta'].map(opt=> (
                  <label key={opt} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', border:'1px solid var(--border)', borderRadius:8, cursor:'pointer' }}>
                    <input type="radio" name="q1" value={opt} onChange={()=>setAnswers(a=>({...a,q1:opt}))} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:20 }}>
              <p style={{ fontWeight:600, marginBottom:8 }}>2) What was the product color?</p>
              <div style={{ display:'grid', gap:8 }}>
                {['Orange','Blue','Green','Black'].map(opt=> (
                  <label key={opt} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', border:'1px solid var(--border)', borderRadius:8, cursor:'pointer' }}>
                    <input type="radio" name="q2" value={opt} onChange={()=>setAnswers(a=>({...a,q2:opt}))} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
              <button 
                onClick={submitAnswers}
                disabled={!answers.q1 || !answers.q2}
                style={{ 
                  background: (!answers.q1 || !answers.q2) ? '#ccc' : 'var(--primary)', 
                  color: (!answers.q1 || !answers.q2) ? '#666' : '#fff', 
                  padding:'10px 18px', 
                  borderRadius:8, 
                  fontWeight:700,
                  cursor: (!answers.q1 || !answers.q2) ? 'not-allowed' : 'pointer'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


