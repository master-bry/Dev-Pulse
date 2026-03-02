import React from 'react'
import Header from './Header'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="scanlines" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
