import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/auth/LoginForm'
import ThemeSwitcher from '@/components/shared/ThemeSwitcher'

export default function LoginPage() {
  const { login, loading, error, creds } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (creds) navigate('/', { replace: true })
  }, [creds, navigate])

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 20,
      position: 'relative',
    }}>
      <div className="scanlines" />

      {/* Radial glow behind card */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-faint) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Theme switcher */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 10 }}>
        <ThemeSwitcher />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, var(--accent-dim), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: '#fff',
            fontFamily: 'var(--font-display)',
            boxShadow: '0 4px 20px var(--accent-faint)',
          }}>DP</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-bright)', letterSpacing: '-0.03em' }}>
            DevPulse
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 5 }}>
            CI/CD Monitoring Dashboard
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg1)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '28px 28px 24px',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 4 }}>
              Connect GitHub
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              Enter your fine-grained PAT with Actions (read) scope
            </div>
          </div>
          <LoginForm onSubmit={login} loading={loading} error={error} />
        </div>
        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.7 }}>
          Need a token? Visit{' '}
          <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            github.com/settings/tokens
          </a>
        </p>
      </div>
    </div>
  )
}
