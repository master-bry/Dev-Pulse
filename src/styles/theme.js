// ── Colour Palette ─────────────────────────────────────
export const colors = {
  bg:          '#050c12',
  bg1:         '#091420',
  bg2:         '#0d1c2c',
  bg3:         '#112438',
  border:      '#1a3048',
  borderBright:'#234460',
  cyan:        '#00dcbe',
  cyanDim:     '#009e88',
  cyanFaint:   'rgba(0,220,190,0.08)',
  green:       '#00e676',
  red:         '#ff4d4d',
  orange:      '#ff9d00',
  yellow:      '#ffe033',
  blue:        '#4db8ff',
  text:        '#b8d4e8',
  textDim:     '#4a7090',
  textBright:  '#e2f0fc',
}

// ── Typography ─────────────────────────────────────────
export const fonts = {
  mono:    "'JetBrains Mono', monospace",
  display: "'Syne', sans-serif",
}

// ── Radius ─────────────────────────────────────────────
export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
}

// ── Status → colour mapping ────────────────────────────
export const statusColor = (status) => ({
  // GitHub Actions
  success:        colors.green,
  completed:      colors.green,
  in_progress:    colors.cyan,
  queued:         colors.yellow,
  failure:        colors.red,
  cancelled:      colors.textDim,
  skipped:        colors.textDim,
  neutral:        colors.textDim,
  action_required:colors.orange,
  timed_out:      colors.orange,
  startup_failure:colors.red,
  // Docker
  pushed:   colors.green,
  building: colors.cyan,
  failed:   colors.red,
  cached:   colors.cyanDim,
  // Generic
  running: colors.cyan,
  ok:      colors.green,
  warn:    colors.orange,
  crit:    colors.red,
}[status] ?? colors.textDim)
