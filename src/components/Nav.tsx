'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    // Check if user is logged in, redirect to login if not (except for login page itself)
    if (pathname !== '/login' && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [pathname, router, status]);
  
  if (pathname === '/login') return null; // hide nav on login
  return (
    <>
      <style jsx>{`
        .nav-tab {
          padding: 8px 12px;
          font-weight: 700;
          text-decoration: none;
          color: var(--foreground);
          transition: color 0.2s;
        }
        .nav-tab:hover {
          color: #ff6a00;
        }
        .nav-tab.active {
          color: #ff6a00;
        }
      `}</style>
      <nav style={{ display:'grid', gap:6, padding:12, borderBottom:'1px solid var(--border)', background:'#ffffff' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <a href="/watch" style={{ color:'#ff6a00', fontWeight:600 }}>The Consumer</a>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            {session?.user && (
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>
                {session.user.name || session.user.email}
              </span>
            )}
            <a href="/profile" style={{ color:'var(--foreground)' }}>Profile</a>
            {session && (
              <button 
                onClick={() => signOut({ callbackUrl: '/login' })}
                style={{ 
                  background: 'transparent', 
                  border: '1px solid var(--border)', 
                  borderRadius: 6, 
                  padding: '6px 12px', 
                  fontSize: 14,
                  cursor: 'pointer',
                  color: 'var(--foreground)'
                }}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
        {/* Primary options bar */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <a href="/watch" className={`nav-tab ${pathname.startsWith('/watch') ? 'active' : ''}`}>Watch</a>
          <a href="/spend" className={`nav-tab ${pathname.startsWith('/spend') ? 'active' : ''}`}>Spend</a>
          <a href="/save" className={`nav-tab ${pathname.startsWith('/save') ? 'active' : ''}`}>Save</a>
          <a href="/post" className={`nav-tab ${pathname.startsWith('/post') ? 'active' : ''}`}>Post</a>
        </div>
      </nav>
    </>
  );
}
