import React, { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = {
  dark: {
    id: 'dark', label: 'Midnight', icon: '🌑',
    vars: {
      '--bg':           '#0a0e1a',
      '--bg1':          '#0f1629',
      '--bg2':          '#141d35',
      '--bg3':          '#1a2540',
      '--border':       '#1e2d4a',
      '--border-bright':'#2a3f6a',
      '--accent':       '#6366f1',
      '--accent-dim':   '#4f46e5',
      '--accent-faint': 'rgba(99,102,241,0.10)',
      '--green':        '#10b981',
      '--red':          '#ef4444',
      '--orange':       '#f59e0b',
      '--yellow':       '#eab308',
      '--blue':         '#3b82f6',
      '--purple':       '#a855f7',
      '--text':         '#94a3b8',
      '--text-dim':     '#3d5068',
      '--text-bright':  '#e2e8f0',
      '--row-hover':    'rgba(99,102,241,0.05)',
      '--shadow':       '0 4px 24px rgba(0,0,0,0.5)',
    }
  },
  slate: {
    id: 'slate', label: 'Slate Pro', icon: '🪨',
    vars: {
      '--bg':           '#0d1117',
      '--bg1':          '#161b22',
      '--bg2':          '#1c2128',
      '--bg3':          '#22272e',
      '--border':       '#30363d',
      '--border-bright':'#484f58',
      '--accent':       '#58a6ff',
      '--accent-dim':   '#388bfd',
      '--accent-faint': 'rgba(88,166,255,0.10)',
      '--green':        '#3fb950',
      '--red':          '#f85149',
      '--orange':       '#d29922',
      '--yellow':       '#e3b341',
      '--blue':         '#79c0ff',
      '--purple':       '#bc8cff',
      '--text':         '#8b949e',
      '--text-dim':     '#3d444d',
      '--text-bright':  '#f0f6fc',
      '--row-hover':    'rgba(88,166,255,0.05)',
      '--shadow':       '0 4px 24px rgba(0,0,0,0.6)',
    }
  },
  ocean: {
    id: 'ocean', label: 'Ocean', icon: '🌊',
    vars: {
      '--bg':           '#04111f',
      '--bg1':          '#071828',
      '--bg2':          '#0a2035',
      '--bg3':          '#0d2840',
      '--border':       '#0f3050',
      '--border-bright':'#174268',
      '--accent':       '#06b6d4',
      '--accent-dim':   '#0891b2',
      '--accent-faint': 'rgba(6,182,212,0.10)',
      '--green':        '#34d399',
      '--red':          '#f87171',
      '--orange':       '#fb923c',
      '--yellow':       '#fbbf24',
      '--blue':         '#60a5fa',
      '--purple':       '#a78bfa',
      '--text':         '#7ecfdf',
      '--text-dim':     '#1a4a60',
      '--text-bright':  '#e0f7fa',
      '--row-hover':    'rgba(6,182,212,0.05)',
      '--shadow':       '0 4px 24px rgba(0,0,0,0.55)',
    }
  },
  ember: {
    id: 'ember', label: 'Ember', icon: '🔥',
    vars: {
      '--bg':           '#120a04',
      '--bg1':          '#1c1008',
      '--bg2':          '#24160a',
      '--bg3':          '#2e1c0e',
      '--border':       '#3d2510',
      '--border-bright':'#5a3618',
      '--accent':       '#f97316',
      '--accent-dim':   '#ea580c',
      '--accent-faint': 'rgba(249,115,22,0.10)',
      '--green':        '#84cc16',
      '--red':          '#ef4444',
      '--orange':       '#f97316',
      '--yellow':       '#facc15',
      '--blue':         '#38bdf8',
      '--purple':       '#c084fc',
      '--text':         '#c4a882',
      '--text-dim':     '#5a3a20',
      '--text-bright':  '#fef3c7',
      '--row-hover':    'rgba(249,115,22,0.06)',
      '--shadow':       '0 4px 24px rgba(0,0,0,0.55)',
    }
  },
  light: {
    id: 'light', label: 'Light', icon: '☀️',
    vars: {
      '--bg':           '#f8fafc',
      '--bg1':          '#ffffff',
      '--bg2':          '#f1f5f9',
      '--bg3':          '#e9eef5',
      '--border':       '#cbd5e1',
      '--border-bright':'#94a3b8',
      '--accent':       '#6366f1',
      '--accent-dim':   '#4f46e5',
      '--accent-faint': 'rgba(99,102,241,0.08)',
      '--green':        '#059669',
      '--red':          '#dc2626',
      '--orange':       '#d97706',
      '--yellow':       '#ca8a04',
      '--blue':         '#2563eb',
      '--purple':       '#7c3aed',
      '--text':         '#475569',
      '--text-dim':     '#94a3b8',
      '--text-bright':  '#0f172a',
      '--row-hover':    'rgba(99,102,241,0.04)',
      '--shadow':       '0 4px 24px rgba(15,23,42,0.10)',
    }
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() =>
    localStorage.getItem('devpulse-theme') || 'dark'
  )
  const theme = THEMES[themeId] || THEMES.dark

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
    localStorage.setItem('devpulse-theme', themeId)
  }, [themeId, theme])

  const cycleTheme = () => {
    const ids = Object.keys(THEMES)
    setThemeId(ids[(ids.indexOf(themeId) + 1) % ids.length])
  }

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
