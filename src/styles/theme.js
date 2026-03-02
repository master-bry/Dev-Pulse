export const colors = {
  bg: '#0a0e1a', bg1: '#0f1629', bg2: '#141d35', bg3: '#1a2540',
  border: '#1e2d4a', borderBright: '#2a3f6a',
  accent: '#6366f1', accentDim: '#4f46e5', accentFaint: 'rgba(99,102,241,0.10)',
  green: '#10b981', red: '#ef4444', orange: '#f59e0b',
  yellow: '#eab308', blue: '#3b82f6', purple: '#a855f7',
  text: '#94a3b8', textDim: '#3d5068', textBright: '#e2e8f0',
  // legacy aliases
  cyan: '#6366f1', cyanDim: '#4f46e5', cyanFaint: 'rgba(99,102,241,0.10)',
}
export const fonts = {
  mono:    "'JetBrains Mono', monospace",
  display: "'Syne', sans-serif",
}
export const radius = { sm: '6px', md: '10px', lg: '14px' }

export const statusColor = (status) => ({
  success:         'var(--green)',
  completed:       'var(--green)',
  in_progress:     'var(--accent)',
  queued:          'var(--yellow)',
  failure:         'var(--red)',
  cancelled:       'var(--text-dim)',
  skipped:         'var(--text-dim)',
  neutral:         'var(--text-dim)',
  action_required: 'var(--orange)',
  timed_out:       'var(--orange)',
  startup_failure: 'var(--red)',
  pushed:          'var(--green)',
  building:        'var(--accent)',
  failed:          'var(--red)',
  cached:          'var(--text-dim)',
  running:         'var(--accent)',
  ok:              'var(--green)',
  warn:            'var(--orange)',
  crit:            'var(--red)',
}[status] ?? 'var(--text-dim)')
