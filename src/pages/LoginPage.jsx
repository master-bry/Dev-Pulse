import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/auth/LoginForm'
import { colors, fonts } from '@/styles/theme'

/**
 * LoginPage — calls useAuth here (inside AuthProvider) and passes
 * login/loading/error down to the pure LoginForm component.
 */
export default function LoginPage() {
  const { login, loading, error } = useAuth()

  return (
    <div style={{
      minHeight:      '100vh',
      background:     colors.bg,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '20px',
    }}>
      <div className="scanlines" />

      <div className="fade-in" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width:          52,
            height:         52,
            borderRadius:   14,
            background:     `linear-gradient(135deg, ${colors.cyanDim}, ${colors.cyan})`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       26,
            margin:         '0 auto 14px',
            boxShadow:      `0 0 24px ${colors.cyan}40`,
          }}>
            📊
          </div>
          <h1 style={{
            fontFamily:    fonts.display,
            fontSize:      26,
            fontWeight:    800,
            color:         colors.textBright,
            letterSpacing: '-0.02em',
          }}>
            DevPulse
          </h1>
          <p style={{ fontSize: 12, color: colors.textDim, marginTop: 4 }}>
            CI/CD Dashboard · GitHub Actions · Docker · CloudWatch
          </p>
        </div>

        {/* Card */}
        <div style={{
          background:   colors.bg1,
          border:       `1px solid ${colors.border}`,
          borderRadius: 14,
          padding:      28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 20 }}>🐙</span>
            <div>
              <div style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: colors.textBright }}>
                Connect GitHub
              </div>
              <div style={{ fontSize: 11, color: colors.textDim, marginTop: 2 }}>
                Fine-grained PAT with Actions (read) scope
              </div>
            </div>
          </div>

          {/* LoginForm is pure — receives everything as props */}
          <LoginForm onSubmit={login} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}