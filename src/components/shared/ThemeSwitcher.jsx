import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, themeId, setThemeId, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} title="Change theme" style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
        color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 11,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <span style={{ fontSize: 13 }}>{theme.icon}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11 }}>{theme.label}</span>
        <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="fade-in" style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: 'var(--bg1)', border: '1px solid var(--border-bright)',
          borderRadius: 10, overflow: 'hidden', zIndex: 200, minWidth: 160,
          boxShadow: 'var(--shadow)',
        }}>
          {Object.values(themes).map(t => (
            <button key={t.id} onClick={() => { setThemeId(t.id); setOpen(false) }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 14px',
              background: t.id === themeId ? 'var(--accent-faint)' : 'transparent',
              border: 'none', borderBottom: '1px solid var(--border)',
              cursor: 'pointer',
              color: t.id === themeId ? 'var(--accent)' : 'var(--text)',
              fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'left',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => { if (t.id !== themeId) e.currentTarget.style.background = 'var(--accent-faint)' }}
            onMouseLeave={e => { if (t.id !== themeId) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, flex: 1 }}>{t.label}</span>
              {t.id === themeId && <span style={{ fontSize: 10, color: 'var(--accent)' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
