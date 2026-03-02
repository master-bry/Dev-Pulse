import React from 'react'
export default function TableHeader({ columns, gridTemplate }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: gridTemplate,
      gap: 12, padding: '6px 18px',
      background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
    }}>
      {columns.map((c, i) => (
        <div key={i} style={{
          fontSize: 9, fontFamily: 'var(--font-display)', fontWeight: 700,
          color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>{c}</div>
      ))}
    </div>
  )
}
