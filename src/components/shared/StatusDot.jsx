import React from 'react'
import { statusColor } from '@/styles/theme'

const LIVE_STATUSES = new Set(['in_progress', 'building', 'queued', 'running'])

/**
 * StatusDot — coloured circle that pulses for live statuses.
 * @param {{ status: string, size?: number }} props
 */
export default function StatusDot({ status, size = 8 }) {
  const color = statusColor(status)
  const live  = LIVE_STATUSES.has(status)

  return (
    <span
      style={{
        display:      'inline-block',
        width:        size,
        height:       size,
        borderRadius: '50%',
        background:   color,
        flexShrink:   0,
        boxShadow:    `0 0 ${live ? 8 : 4}px ${color}`,
        animation:    live ? 'pulse-dot 1.6s ease infinite' : 'none',
      }}
    />
  )
}
