'use client';

import { useState, useEffect } from 'react';

type CampaignAnalytics = {
  totalViews: number;
  totalQuizAttempts: number;
  totalCorrect: number;
  averageScore: number;
};

type Campaign = {
  id: string;
  title: string;
  description: string;
  status: string;
  analytics: CampaignAnalytics;
};

export default function Post() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always fetch ALL ads so user can see their paid ad
    // We'll show all ads regardless of advertiserId to avoid losing paid ads
    fetch('/api/creatives/all')
      .then(res => res.json())
      .then(data => {
        console.log('📊 All creatives fetched:', data.creatives?.length || 0);
        const allCreatives = data.creatives || [];
        
        // Optional: Filter by advertiserId if available, but show all if empty
        const advertiserId = localStorage.getItem('ad_businessName') || '';
        let filteredCreatives = allCreatives;
        
        if (advertiserId && advertiserId !== 'unknown') {
          // Try to filter, but if no matches, show all
          filteredCreatives = allCreatives.filter((c: any) => c.advertiserId === advertiserId);
          if (filteredCreatives.length === 0) {
            console.log('⚠️ No ads found for advertiserId, showing all ads');
            filteredCreatives = allCreatives;
          }
        }
        
        setCampaigns(filteredCreatives.map((c: any) => ({
          id: c.id,
          title: c.title || 'Untitled Ad',
          description: c.description || '',
          status: c.status || 'pending',
          advertiserId: c.advertiserId,
          analytics: c.analytics || {
            totalViews: 0,
            totalQuizAttempts: 0,
            totalCorrect: 0,
            averageScore: 0
          }
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to load campaigns:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding:24, maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
        <div></div>
        <a href="/post/create" style={{ display:'inline-block', background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700 }}>
          Promote your ad
        </a>
      </div>

      {loading ? (
        <p style={{ color:'var(--muted)', textAlign:'center' }}>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <div style={{ textAlign:'center', padding:48, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12 }}>
          <p style={{ color:'var(--muted)', marginBottom:8 }}>No campaigns found in database.</p>
          <p style={{ color:'var(--muted)', fontSize:12, marginBottom:16 }}>
            {typeof window !== 'undefined' && localStorage.getItem('ad_businessName') 
              ? `If you paid for an ad, the server may have restarted and cleared the database.` 
              : 'Create your first ad!'}
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/post/create" style={{ display:'inline-block', background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700 }}>
              Create New Ad
            </a>
            <button
              onClick={() => {
                fetch('/api/creatives/all')
                  .then(res => res.json())
                  .then(data => {
                    console.log('Database state:', data);
                    alert(`Database has ${data.creatives?.length || 0} ads. Check browser console for details.`);
                  });
              }}
              style={{ padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'transparent', color:'var(--foreground)', fontWeight:600, cursor:'pointer' }}
            >
              Check Database
            </button>
            <button
              onClick={async () => {
                const advertiserId = localStorage.getItem('ad_businessName') || '';
                if (!advertiserId || advertiserId === 'unknown') {
                  alert('Please enter your business name first, or it will be recovered from your Stripe payments.');
                  return;
                }
                
                if (!confirm(`Recover your paid balance and ads for "${advertiserId}" from Stripe?\n\nThis will:\n1. Restore your advertiser balance\n2. Recover any lost ads (videos may need re-upload)`)) {
                  return;
                }
                
                try {
                  // Recover balance first
                  const balanceRes = await fetch('/api/advertisers/recover-balance', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ advertiserId })
                  });
                  const balanceData = await balanceRes.json();
                  
                  // Recover creatives
                  const creativeRes = await fetch('/api/creatives/recover-from-stripe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ advertiserId })
                  });
                  const creativeData = await creativeRes.json();
                  
                  let message = '';
                  if (balanceData.success) {
                    message += `✅ Balance: $${balanceData.recovered.toFixed(2)} recovered\n`;
                  }
                  if (creativeData.success && creativeData.recovered > 0) {
                    message += `✅ Ads: ${creativeData.recovered} ad(s) recovered\n\nNote: Videos may need to be re-uploaded.`;
                  } else if (creativeData.success) {
                    message += `\n⚠️ No ads found in Stripe payments.`;
                  }
                  
                  if (message) {
                    alert(message);
                    window.location.reload();
                  } else {
                    alert(`No payments found for "${advertiserId}".`);
                  }
                } catch (e) {
                  alert('Error recovering. Please contact support.');
                }
              }}
              style={{ padding:'12px 18px', borderRadius:10, background:'#3b82f6', color:'#fff', border:'none', fontWeight:600, cursor:'pointer' }}
            >
              Recover Balance & Ads
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display:'grid', gap:16 }}>
          {campaigns.map((campaign) => (
            <div key={campaign.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:12 }}>
                <div>
                  <h3 style={{ marginBottom:4 }}>{campaign.title}</h3>
                  <p style={{ color:'var(--muted)', fontSize:14, marginBottom:8 }}>{campaign.description}</p>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{ 
                      display:'inline-block', 
                      padding:'4px 8px', 
                      borderRadius:6, 
                      fontSize:12, 
                      fontWeight:600,
                      background: campaign.status === 'approved' ? '#22c55e20' : campaign.status === 'pending' ? '#f59e0b20' : '#ef444420',
                      color: campaign.status === 'approved' ? '#22c55e' : campaign.status === 'pending' ? '#f59e0b' : '#ef4444'
                    }}>
                      {campaign.status.toUpperCase()}
                    </span>
                    {campaign.status !== 'approved' && (
                      <>
                        <button
                          onClick={async () => {
                            if (!confirm('Approve this ad and make it visible on the Watch page?')) return;
                            try {
                              const res = await fetch('/api/creatives/approve', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ creativeId: campaign.id })
                              });
                              if (res.ok) {
                                alert('✅ Ad approved! It will now appear in the Watch tab.');
                                window.location.reload();
                              } else {
                                const error = await res.json();
                                alert(`Failed to approve: ${error.error || 'Unknown error'}`);
                              }
                            } catch (e) {
                              alert('Error approving ad');
                            }
                          }}
                          style={{
                            padding: '4px 12px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Approve Now
                        </button>
                        {campaign.status === 'pending' && (
                          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
                            (Click to approve and show on site)
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {campaign.analytics && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid var(--border)' }}>
                  <h4 style={{ marginBottom:12, fontSize:14, color:'var(--muted)' }}>Analytics</h4>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:16 }}>
                    <div>
                      <div style={{ fontSize:24, fontWeight:700, color:'var(--primary)' }}>
                        {campaign.analytics.totalViews}
                      </div>
                      <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Total Views</div>
                    </div>
                    <div>
                      <div style={{ fontSize:24, fontWeight:700, color:'#22c55e' }}>
                        {campaign.analytics.totalCorrect}/{campaign.analytics.totalQuizAttempts}
                      </div>
                      <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Correct Answers</div>
                    </div>
                    <div>
                      <div style={{ fontSize:24, fontWeight:700, color:'#3b82f6' }}>
                        {campaign.analytics.averageScore.toFixed(1)}%
                      </div>
                      <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Avg Quiz Score</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


