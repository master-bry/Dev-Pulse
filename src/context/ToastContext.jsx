import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)
let _id = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  const push = useCallback(({ type = 'info', title, message, duration = 5500 }) => {
    const id = ++_id
    setToasts(t => [{ id, type, title, message }, ...t].slice(0, 4))
    if (duration > 0) setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  const success = (title, msg) => push({ type: 'success', title, message: msg })
  const error   = (title, msg) => push({ type: 'error',   title, message: msg })
  const warn    = (title, msg) => push({ type: 'warn',    title, message: msg })
  const info    = (title, msg) => push({ type: 'info',    title, message: msg })

  return (
    <ToastContext.Provider value={{ push, success, error, warn, info, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}

const TOAST_CFG = {
  success: { color: 'var(--green)',  bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)',  icon: '✓' },
  error:   { color: 'var(--red)',    bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   icon: '✕' },
  warn:    { color: 'var(--orange)', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  icon: '!' },
  info:    { color: 'var(--accent)', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.25)',  icon: 'i' },
}

function ToastContainer({ toasts, dismiss }) {
  if (!toasts.length) return null
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={dismiss} />)}
    </div>
  )
}

function Toast({ toast, onDismiss }) {
  const s = TOAST_CFG[toast.type] || TOAST_CFG.info
  return (
    <div onClick={() => onDismiss(toast.id)} style={{
      pointerEvents: 'all',
      background: 'var(--bg1)',
      border: `1px solid ${s.border}`,
      borderLeft: `3px solid ${s.color}`,
      borderRadius: 10, padding: '12px 14px',
      minWidth: 290, maxWidth: 360,
      display: 'flex', alignItems: 'flex-start', gap: 10,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      animation: 'toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        background: s.bg, border: `1px solid ${s.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800, color: s.color,
      }}>{s.icon}</div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 2 }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {toast.message}
          </div>
        )}
      </div>
      <span style={{ fontSize: 14, color: 'var(--text-dim)', flexShrink: 0, lineHeight: 1, marginTop: 1 }}>×</span>
    </div>
  )
}
