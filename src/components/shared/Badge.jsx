import React from 'react'
import { statusColor } from '@/styles/theme'

/**
 * Badge — coloured pill label.
 * @param {{ label: string, color?: string, status?: string }} props
 *   Pass either `color` directly or `status` to derive the colour automatically.
 */
export default function Badge({ label, color, status }) {
  const c = color ?? statusColor(status ?? label?.toLowerCase())
  return (
    <span
      style={{
        fontFamily:    "'JetBrains Mono', monospace",
        fontSize:      10,
        fontWeight:    700,
        letterSpacing: '0.06em',
        color:         c,
        background:    `${c}18`,
        border:        `1px solid ${c}40`,
        borderRadius:  4,
        padding:       '2px 6px',
        textTransform: 'uppercase',
        flexShrink:    0,
        whiteSpace:    'nowrap',
      }}
    >
      {label}
    </span>
  )
}
