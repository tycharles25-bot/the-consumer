export default function Post() {
  return (
    <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:24 }}>
      <div style={{ textAlign:'center' }}>
        <h1>Post</h1>
        <p style={{ color:'var(--muted)' }}>Create a new ad campaign (video/read). Full advertiser tooling is coming next.</p>
        <a href="/post/create" style={{ marginTop:16, display:'inline-block', background:'var(--primary)', color:'#000', padding:'12px 18px', borderRadius:10, fontWeight:700 }}>Promote your ad</a>
      </div>
    </main>
  );
}


