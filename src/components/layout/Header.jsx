import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useClock } from '@/hooks/useClock'
import ThemeSwitcher from '@/components/shared/ThemeSwitcher'
import RepoSwitcher from '@/components/shared/RepoSwitcher'
 
export default function Header() {
  const { creds, logout } = useAuth()
  const ts       = useClock()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  
  const tabs = [
    { path: '/',          label: 'Dashboard', icon: '⊞' },
    { path: '/analytics', label: 'Analytics', icon: '↗' },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      height: 56,
      borderBottom: '1px solid var(--border)',
      padding: '0 20px',
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'var(--bg1)',
      boxShadow: '0 1px 0 var(--border)',
    }}>
      {/* Logo */}
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: 'linear-gradient(135deg, var(--accent-dim), var(--accent))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, boxShadow: '0 2px 10px var(--accent-faint)',
        fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)',
      }}>DP</div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800,
        color: 'var(--text-bright)', letterSpacing: '-0.02em', marginRight: 6,
      }}>DevPulse</div>

      {/* Divider */}
      {creds && <div style={{ width: 1, height: 20, background: 'var(--border)', flexShrink: 0 }} />}

      {/* Nav tabs */}
      {creds && (
        <nav style={{ display: 'flex', gap: 2 }}>
          {tabs.map(t => (
            <button
              key={t.path}
              onClick={() => navigate(t.path)}
              className={`nav-tab ${pathname === t.path ? 'active' : 'inactive'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
      )}

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* LIVE badge */}
        {creds && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 20, padding: '3px 9px',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'var(--green)', display: 'inline-block',
              boxShadow: '0 0 6px var(--green)',
              animation: 'pulse-dot 2.5s ease infinite',
            }} />
            <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.06em' }}>LIVE</span>
          </div>
        )}

        {/* Clock */}
        <span style={{
          fontSize: 11, color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 6, padding: '3px 8px',
        }}>{ts}</span>

        {/* Repo switcher */}
        {creds && <RepoSwitcher />}

        {/* Theme switcher */}
        <ThemeSwitcher />

        {/* Disconnect */}
        {creds && (
          <button onClick={logout} style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-mono)',
            borderRadius: 7, padding: '5px 10px', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
          >
            Disconnect
          </button>
        )}
      </div>
    </header>
  )
}
