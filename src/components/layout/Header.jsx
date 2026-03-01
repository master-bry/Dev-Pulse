import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useClock } from '@/hooks/useClock'
import { colors, fonts } from '@/styles/theme'

/**
 * Header — sticky top navigation bar with logo, live clock, and status.
 */
export default function Header() {
  const { creds, logout } = useAuth()
  const ts = useClock()

  return (
    <header
      style={{
        position:     'sticky',
        top:          0,
        zIndex:       100,
        borderBottom: `1px solid ${colors.border}`,
        padding:      '12px 24px',
        display:      'flex',
        alignItems:   'center',
        gap:          12,
        background:   `linear-gradient(90deg, ${colors.bg2} 0%, ${colors.bg} 100%)`,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width:       34,
          height:      34,
          borderRadius: 8,
          background:  `linear-gradient(135deg, ${colors.cyanDim}, ${colors.cyan})`,
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'center',
          fontSize:    18,
          boxShadow:   `0 0 16px ${colors.cyan}40`,
          flexShrink:  0,
        }}
      >
        📊
      </div>

      <div>
        <div
          style={{
            fontFamily:    fonts.display,
            fontSize:      15,
            fontWeight:    800,
            color:         colors.textBright,
            letterSpacing: '-0.01em',
          }}
        >
          DevPulse
        </div>
        <div style={{ fontSize: 10, color: colors.textDim, marginTop: 1 }}>
          CI/CD Dashboard
        </div>
      </div>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Live indicator */}
        {creds && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width:       6,
                height:      6,
                borderRadius: '50%',
                background:  colors.green,
                display:     'inline-block',
                boxShadow:   `0 0 6px ${colors.green}`,
                animation:   'pulse-dot 2s ease infinite',
              }}
            />
            <span style={{ fontSize: 11, color: colors.green, fontFamily: fonts.mono }}>
              LIVE
            </span>
          </div>
        )}

        {/* Repo label */}
        {creds && (
          <span style={{ fontSize: 11, color: colors.textDim, fontFamily: fonts.mono }}>
            {creds.owner}/{creds.repo}
          </span>
        )}

        {/* UTC clock */}
        <span style={{ fontSize: 11, color: colors.textDim, fontFamily: fonts.mono }}>
          {ts}
        </span>

        {/* Logout */}
        {creds && (
          <button
            onClick={logout}
            style={{
              background:   'rgba(255,77,77,0.08)',
              border:       '1px solid rgba(255,77,77,0.2)',
              color:        colors.red,
              fontSize:     11,
              fontFamily:   fonts.mono,
              borderRadius: 6,
              padding:      '4px 10px',
              cursor:       'pointer',
            }}
          >
            Disconnect
          </button>
        )}
      </div>
    </header>
  )
}
