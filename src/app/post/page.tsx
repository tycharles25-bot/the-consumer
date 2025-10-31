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
    // Get all creatives for the logged-in user
    // advertiserId is stored as 'ad_businessName' in localStorage
    const advertiserId = localStorage.getItem('ad_businessName') || '';
    
    if (advertiserId && advertiserId !== 'unknown') {
      // Fetch all campaigns and filter by advertiserId
      fetch('/api/creatives/all')
        .then(res => res.json())
        .then(data => {
          // Filter by advertiserId
          const allCreatives = data.creatives || [];
          const userCampaigns = allCreatives.filter((c: any) => c.advertiserId === advertiserId);
          
          setCampaigns(userCampaigns.map((c: any) => ({
            id: c.id,
            title: c.title || 'Untitled Ad',
            description: c.description || '',
            status: c.status || 'pending',
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
          console.error('Failed to load campaigns:', err);
          setLoading(false);
        });
    } else {
      // If no advertiserId, try to show all for now
      fetch('/api/creatives/all')
        .then(res => res.json())
        .then(data => {
          const allCreatives = data.creatives || [];
          setCampaigns(allCreatives.map((c: any) => ({
            id: c.id,
            title: c.title || 'Untitled Ad',
            description: c.description || '',
            status: c.status || 'pending',
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
          console.error('Failed to load campaigns:', err);
          setLoading(false);
        });
    }
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
          <p style={{ color:'var(--muted)', marginBottom:16 }}>No campaigns yet. Create your first ad!</p>
          <a href="/post/create" style={{ display:'inline-block', background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700 }}>
            Create First Ad
          </a>
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
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/creatives/approve', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ creativeId: campaign.id })
                            });
                            if (res.ok) {
                              // Refresh campaigns
                              window.location.reload();
                            } else {
                              alert('Failed to approve ad');
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
                        Approve
                      </button>
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


