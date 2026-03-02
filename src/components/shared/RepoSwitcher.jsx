import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRepo } from '@/context/RepoContext'

// ── Full-screen modal overlay for the "add / switch repo" form ──────────────
function RepoModal({ onClose, initialOwner = '', initialRepo = '' }) {
  const { login, loading } = useAuth()
  const [form, setForm] = useState({ token: '', owner: initialOwner, repo: initialRepo })
  const [err, setErr]   = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!form.token || !form.owner || !form.repo) { setErr('All fields are required.'); return }
    try {
      await login({ token: form.token.trim(), owner: form.owner.trim(), repo: form.repo.trim() })
      onClose()
    } catch {
      setErr('Connection failed. Check your token and repo name.')
    }
  }

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const inp = {
    width: '100%',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '10px 14px',
    color: 'var(--text-bright)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    // Overlay — covers entire viewport
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'fade-in 0.15s ease both',
      }}
    >
      <div
        className="slide-in"
        style={{
          background: 'var(--bg1)',
          border: '1px solid var(--border-bright)',
          borderRadius: 16,
          padding: 28,
          width: '100%',
          maxWidth: 420,
          boxShadow: 'var(--shadow), 0 0 0 1px var(--border)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: 'var(--text-bright)' }}>
              Switch Repository
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 3 }}>
              Connect to any GitHub repo with Actions enabled
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
            color: 'var(--text-dim)', fontSize: 16, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 5, fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              GitHub Token
            </div>
            <input
              type="password"
              placeholder="github_pat_11ABCDEF..."
              value={form.token}
              onChange={e => setForm(f => ({...f, token: e.target.value}))}
              style={inp}
              autoFocus
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 5, fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Owner
              </div>
              <input
                type="text"
                placeholder="master-bry"
                value={form.owner}
                onChange={e => setForm(f => ({...f, owner: e.target.value}))}
                style={inp}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 5, fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Repository
              </div>
              <input
                type="text"
                placeholder="FloodAlertApp"
                value={form.repo}
                onChange={e => setForm(f => ({...f, repo: e.target.value}))}
                style={inp}
              />
            </div>
          </div>

          {err && (
            <div style={{
              fontSize: 12, color: 'var(--red)',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 7, padding: '8px 12px',
            }}>⚠ {err}</div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="button" onClick={onClose} style={{
              flex: '0 0 auto', padding: '10px 18px',
              background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 8, color: 'var(--text)', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 13,
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              flex: 1, padding: '10px 0',
              background: loading ? 'var(--bg3)' : 'var(--accent)',
              border: 'none', borderRadius: 8,
              color: loading ? 'var(--text-dim)' : '#fff',
              fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}>
              {loading ? 'Connecting…' : '→ Connect Repository'}
            </button>
          </div>
        </form>

        <div style={{
          marginTop: 16, fontSize: 11, color: 'var(--text-dim)',
          padding: '8px 12px',
          background: 'var(--bg2)',
          borderRadius: 7, lineHeight: 1.6,
        }}>
          🔒 Token stays in browser memory only — never stored or sent to any server.
        </div>
      </div>
    </div>
  )
}

// ── Dropdown trigger in the header ─────────────────────────────────────────
export default function RepoSwitcher() {
  const { creds } = useAuth()
  const { savedRepos, saveRepo, removeRepo } = useRepo()
  const [open, setOpen]     = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preload, setPreload]     = useState({})
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (creds) saveRepo(creds, `${creds.owner}/${creds.repo}`)
  }, [creds])

  const switchTo = (saved) => {
    setPreload({ owner: saved.owner, repo: saved.repo })
    setOpen(false)
    setShowModal(true)
  }

  const openNew = () => {
    setPreload({})
    setOpen(false)
    setShowModal(true)
  }

  return (
    <>
      {/* Modal — rendered outside the header at portal level */}
      {showModal && (
        <RepoModal
          onClose={() => setShowModal(false)}
          initialOwner={preload.owner || ''}
          initialRepo={preload.repo || ''}
        />
      )}

      {/* Header dropdown trigger */}
      <div ref={ref} style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 11,
            maxWidth: 180,
          }}
        >
          <span style={{ fontSize: 12 }}>📁</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {creds ? `${creds.owner}/${creds.repo}` : 'No repo'}
          </span>
          <span style={{ fontSize: 9, opacity: 0.5, flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className="fade-in" style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: 'var(--bg1)',
            border: '1px solid var(--border-bright)',
            borderRadius: 10, overflow: 'hidden', zIndex: 200, minWidth: 220,
            boxShadow: 'var(--shadow)',
          }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Saved Repos
            </div>

            {savedRepos.length === 0 && (
              <div style={{ padding: '12px', fontSize: 11, color: 'var(--text-dim)' }}>No saved repos yet</div>
            )}

            {savedRepos.map(r => (
              <div key={`${r.owner}/${r.repo}`} style={{
                display: 'flex', alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                background: creds?.owner === r.owner && creds?.repo === r.repo ? 'var(--accent-faint)' : 'transparent',
              }}>
                <button onClick={() => switchTo(r)} style={{
                  flex: 1, padding: '9px 12px', background: 'transparent', border: 'none',
                  cursor: 'pointer', textAlign: 'left', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-mono)',
                }}>
                  🐙 {r.owner}/{r.repo}
                  {creds?.owner === r.owner && creds?.repo === r.repo && (
                    <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--accent)' }}>● active</span>
                  )}
                </button>
                <button onClick={() => removeRepo(r.owner, r.repo)} style={{
                  padding: '9px 10px', background: 'transparent', border: 'none',
                  cursor: 'pointer', color: 'var(--text-dim)', fontSize: 14,
                }}>×</button>
              </div>
            ))}

            <button onClick={openNew} style={{
              width: '100%', padding: '9px 12px', background: 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              color: 'var(--accent)', fontSize: 12, fontFamily: 'var(--font-mono)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              ＋ Add repository
            </button>
          </div>
        )}
      </div>
    </>
  )
}
