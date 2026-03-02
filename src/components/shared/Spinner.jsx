import React from 'react'
export default function Spinner({ size = 16, color = 'var(--accent)' }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size,
      border: `2px solid ${color}30`,
      borderTop: `2px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 0.75s linear infinite',
      flexShrink: 0,
    }} />
  )
}
