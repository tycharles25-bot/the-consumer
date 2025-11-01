'use client';
import { signIn } from 'next-auth/react';
import { Suspense } from 'react';

function LoginContent() {
  const callbackUrl = '/watch'; // Default callback
  const error = null; // Can read from URL params later if needed

  return (
    <div style={{ position:'relative', minHeight:'100vh', overflow:'hidden', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <main style={{ position:'relative', zIndex:1, display:'grid', placeItems:'center', minHeight:'100vh', padding:24 }}>
        <div style={{ width:360, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:20, boxShadow:'0 6px 30px rgba(0,0,0,0.35)' }}>
          <h1 style={{ textAlign:'center', color:'var(--primary)', marginBottom:12 }}>The Consumer</h1>
          <p style={{ textAlign:'center', color:'var(--muted)', marginBottom:24 }}>
            Sign in to earn money watching ads
          </p>
          
          {error && (
            <div style={{ 
              padding: '12px', 
              borderRadius: 8, 
              background: '#fee', 
              color: '#c33', 
              marginBottom: 16,
              fontSize: 14 
            }}>
              {error === 'CredentialsSignin' && 'Sign in failed. Please try again.'}
              {error === 'OAuthSignin' && 'OAuth sign in failed. Please try again.'}
              {error === 'OAuthCallback' && 'OAuth callback error. Please try again.'}
              {error === 'OAuthCreateAccount' && 'Could not create account. Please try again.'}
              {error === 'EmailCreateAccount' && 'Could not create account. Please try again.'}
              {error === 'Callback' && 'Callback error. Please try again.'}
              {error === 'AccessDenied' && 'Access denied. Please contact support.'}
              {!['CredentialsSignin', 'OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'AccessDenied'].includes(error) && 'An error occurred. Please try again.'}
            </div>
          )}
          
          <div style={{ display:'grid', gap: 12 }}>
            <button 
              onClick={() => signIn('google', { callbackUrl })}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 12,
                background:'#fff', 
                color:'#333', 
                padding:'12px 16px', 
                borderRadius:8, 
                border: '1px solid #ddd',
                fontWeight:600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path fill="#4285F4" d="M19.6 10.23c0-.82-.07-1.54-.2-2.26H10v4.29h5.39c-.23 1.24-.9 2.29-1.92 3.01v2.43h3.11c1.82-1.68 2.87-4.15 2.87-7.47z"/>
                <path fill="#34A853" d="M10 20c2.6 0 4.78-.86 6.37-2.3l-3.11-2.43c-.86.58-1.96.92-3.26.92-2.51 0-4.63-1.7-5.39-3.99H1.26v2.51C2.81 17.45 6.2 20 10 20z"/>
                <path fill="#FBBC04" d="M4.61 12.2c-.19-.58-.3-1.2-.3-1.83 0-.63.11-1.25.3-1.83V6.03H1.26C.64 7.5.24 9.18.24 11c0 1.82.4 3.5 1.02 4.97l3.35-2.77z"/>
                <path fill="#EA4335" d="M10 3.95c1.41 0 2.68.48 3.68 1.43l2.76-2.76C15.78.99 13.6.2 10 .2 6.2.2 2.81 2.75 1.26 6.03l3.35 2.51C5.37 6.65 7.49 4.95 10 4.95z"/>
              </svg>
              Continue with Google
            </button>
            
            <button 
              onClick={() => signIn('apple', { callbackUrl })}
              disabled
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 12,
                background:'#000', 
                color:'#fff', 
                padding:'12px 16px', 
                borderRadius:8, 
                border: 'none',
                fontWeight:600,
                cursor: 'not-allowed',
                opacity: 0.5
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15.2 3.9c.8 1 1.3 2.3 1.1 3.6-1.1.2-2.5.1-3.4-.9-.9-.8-1.4-2-.1-3.1.1-.1 1-.4 2.4.4zm3.1 6.3c-.1 2.8-.7 5.4-2.6 6.8-1.8 1.4-3.1.9-4.7.7-1.6-.2-2.7-.2-4.4 0-1.6.2-2.9.6-4.7-.7C-.1 16-.4 13.3.4 10.3c.9-3.1 3.2-5.1 5.7-5 1.5 0 2.7.5 4 1 1.5.6 2.3.5 3.2-.2.7-.6 1.8-.8 2.8-.6 1 .1 1.8.4 2.6.4.9-.2 2.4-.8 3.8-.6.3 0 .9.3 1.3.8-.3.3-1 .9-1.6 1.4.7.5 1.5 1.2 1.9 1.8 1.6 2.1 1.3 5.1 1.2 8.7z"/>
              </svg>
              Continue with Apple
              <span style={{ fontSize: 12, marginLeft: 8 }}>(Coming Soon)</span>
            </button>
          </div>
          
          <p style={{ marginTop: 24, fontSize: 12, color:'var(--muted)', textAlign:'center' }}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </main>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div style={{ display:'grid', placeItems:'center', minHeight:'100vh' }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
