import React from 'react'
import { colors, fonts } from '@/styles/theme'

/**
 * StatBar — renders a horizontal row of summary stat boxes.
 * @param {{ stats: Array<{ label: string, value: number|string, color: string }> }} props
 */
export default function StatBar({ stats }) {
  return (
    <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}` }}>
      {stats.map(({ label, value, color }, i) => (
        <div
          key={label}
          style={{
            flex:         1,
            padding:      '10px 20px',
            borderRight:  i < stats.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontSize:   22,
              fontWeight: 800,
              color,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize:      10,
              color:         colors.textDim,
              marginTop:     2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
