import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 900, margin: '0 auto' }}>
      <article style={{ marginBottom: 48 }}>
        <h1 style={{ color:'var(--primary)', fontSize: 36, marginBottom: 16 }}>Welcome to The Consumer</h1>
        
        <div style={{ lineHeight: 1.8, color: 'var(--foreground)' }}>
          <p style={{ fontSize: 18, marginBottom: 20, fontWeight: 500 }}>
            The Consumer is a platform where watching ads pays you. We connect viewers with advertisers in a fair, transparent way.
          </p>

          <h2 style={{ color: 'var(--foreground)', fontSize: 24, marginTop: 32, marginBottom: 16 }}>How It Works</h2>
          <p style={{ marginBottom: 16 }}>
            Watch short video ads (15-30 seconds) and answer two quick questions about what you saw. Get paid $0.25 for each completed view. It's that simple.
          </p>

          <h2 style={{ color: 'var(--foreground)', fontSize: 24, marginTop: 32, marginBottom: 16 }}>Why The Consumer?</h2>
          <p style={{ marginBottom: 16 }}>
            We believe your attention has value. Traditional advertising platforms take that value without compensation. At The Consumer, we give it back to you.
          </p>
          <p style={{ marginBottom: 16 }}>
            We're building a marketplace where small businesses can reach engaged audiences, and viewers earn for their time and attention. Everyone wins.
          </p>

          <h2 style={{ color: 'var(--foreground)', fontSize: 24, marginTop: 32, marginBottom: 16 }}>Getting Started</h2>
          <p style={{ marginBottom: 16 }}>
            Sign up with your US phone number, watch ads in categories you care about, and start earning. Withdraw your earnings once you reach $5 via gift cards.
          </p>
          <p style={{ marginBottom: 16 }}>
            Ready to start? Head over to <Link href="/watch" style={{ color: 'var(--primary)', fontWeight: 600 }}>Watch</Link> and browse available ads.
          </p>
        </div>
      </article>

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '2px solid var(--border)' }}>
        <h2 style={{ color: 'var(--primary)', fontSize: 28, marginBottom: 20 }}>Ad of the Week</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, display: 'flex', gap: 20 }}>
          <div style={{ width: 280, height: 160, background: '#f5f5f5', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <img 
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop" 
              alt="Ad of the week" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Featured Business Spotlight</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 12 }}>
              This week's standout ad showcases innovative technology that's changing the game. Watch now and discover what makes this business special.
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 6, background: '#f5f5f5' }}>Technology</span>
              <span style={{ color: 'var(--muted)' }}>0:30</span>
            </div>
            <Link 
              href="/watch/cr_featured" 
              style={{ 
                display: 'inline-block', 
                background: 'var(--primary)', 
                color: '#fff', 
                padding: '10px 20px', 
                borderRadius: 8, 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Watch Now - Earn $0.25
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
