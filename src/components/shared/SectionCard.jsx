import React from 'react'
export default function SectionCard({ icon, title, right, children, delay = 0 }) {
  return (
    <div style={{
      background: 'var(--bg1)', border: '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
      animation: `slide-in 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 18px', borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13 }}>{icon}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', letterSpacing: '-0.01em' }}>
            {title}
          </span>
        </div>
        {right && <div>{right}</div>}
      </div>
      {children}
    </div>
  )
}
