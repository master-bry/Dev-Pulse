import React from 'react'
import { colors } from '@/styles/theme'

/**
 * Spinner — rotating loading indicator.
 * @param {{ size?: number, color?: string }} props
 */
export default function Spinner({ size = 16, color = colors.cyan }) {
  return (
    <div
      style={{
        width:        size,
        height:       size,
        borderRadius: '50%',
        border:       `2px solid ${colors.border}`,
        borderTopColor: color,
        animation:    'spin 0.7s linear infinite',
        flexShrink:   0,
      }}
    />
  )
}
