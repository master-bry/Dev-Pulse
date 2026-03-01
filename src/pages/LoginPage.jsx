import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/auth/LoginForm'
import { colors, fonts } from '@/styles/theme'

export default function LoginPage() {
  const { login, loading, error, creds } = useAuth()
  const navigate = useNavigate()

  // If already logged in, go straight to dashboard
  React.useEffect(() => {
    if (creds) navigate('/', { replace: true })
  }, [creds, navigate])

  return (
    <div style={{
      minHeight: '100vh', background: colors.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div className="scanlines" />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${colors.cyanDim}, ${colors.cyan})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, boxShadow: `0 0 24px ${colors.cyan}40`,
          }}>📊</div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: colors.textBright }}>
            DevPulse
          </h1>
          <p style={{ fontSize: 12, color: colors.textDim, marginTop: 4 }}>
            CI/CD Dashboard · GitHub Actions · Docker · CloudWatch
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: colors.bg1, border: `1px solid ${colors.border}`,
          borderRadius: 14, padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 22 }}>🐙</span>
            <div>
              <div style={{ fontFamily: fonts.display, fontSize: 13, fontWeight: 700, color: colors.textBright }}>
                Connect GitHub
              </div>
              <div style={{ fontSize: 11, color: colors.textDim, marginTop: 1 }}>
                Requires a fine-grained PAT with Actions (read) scope
              </div>
            </div>
          </div>
          <LoginForm onSubmit={login} loading={loading} error={error} />
        </div>

      </div>
    </div>
  )
}