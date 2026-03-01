/**
 * Format milliseconds → human-readable duration string.
 * e.g. 125000 → "2m 5s"
 */
export function formatDuration(ms) {
  if (!ms || isNaN(ms)) return '—'
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return `${m}m ${rem}s`
}

/**
 * Return a human-readable "time ago" string from a date string or Date.
 * e.g. "3m ago", "2h ago", "just now"
 */
export function timeAgo(date) {
  if (!date) return '—'
  const diffMs = Date.now() - new Date(date).getTime()
  const m = Math.floor(diffMs / 60_000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

/**
 * Capitalise the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate a string to maxLength with ellipsis.
 */
export function truncate(str, maxLength = 60) {
  if (!str) return ''
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str
}
