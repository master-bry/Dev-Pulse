import React from 'react'
export default function StatBar({ stats }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1, padding: '10px 18px',
          borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
            {s.label}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: s.color || 'var(--text-bright)', lineHeight: 1 }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}
