import React from 'react'
import { colors, fonts } from '@/styles/theme'

/**
 * SectionCard — consistent card shell for each dashboard panel.
 * @param {{ icon: string, title: string, right?: ReactNode, children: ReactNode, delay?: number }} props
 */
export default function SectionCard({ icon, title, right, children, delay = 0 }) {
  return (
    <div
      className="slide-in"
      style={{
        background:   colors.bg1,
        border:       `1px solid ${colors.border}`,
        borderRadius: 14,
        overflow:     'hidden',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           10,
          padding:       '13px 20px',
          borderBottom:  `1px solid ${colors.border}`,
          background:    `linear-gradient(90deg, ${colors.bg2} 0%, ${colors.bg1} 100%)`,
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span
          style={{
            fontFamily:    fonts.display,
            fontSize:      13,
            fontWeight:    700,
            color:         colors.textBright,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
        <div style={{ marginLeft: 'auto' }}>{right}</div>
      </div>

      {/* Body */}
      {children}
    </div>
  )
}
