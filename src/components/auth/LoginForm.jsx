import React, { useState } from 'react'
import Spinner from '@/components/shared/Spinner'
import { colors, fonts } from '@/styles/theme'

export default function LoginForm({ onSubmit, loading, error }) {
  const [token, setToken] = useState('')
  const [owner, setOwner] = useState('')
  const [repo,  setRepo]  = useState('')

  const canSubmit = token.trim() && owner.trim() && repo.trim() && !loading

  const handleSubmit = (e) => {
    e.preventDefault()
    if (canSubmit) onSubmit({ token: token.trim(), owner: owner.trim(), repo: repo.trim() })
  }

  const inp = {
    width: '100%', background: colors.bg, border: `1px solid ${colors.border}`,
    borderRadius: 7, padding: '9px 12px', color: colors.textBright,
    fontFamily: fonts.mono, fontSize: 13, outline: 'none',
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input type="password" placeholder="GitHub Token (ghp_...)"
          value={token} onChange={e => setToken(e.target.value)} style={inp} />
        <input type="text" placeholder="Owner / Username (e.g. master-bry)"
          value={owner} onChange={e => setOwner(e.target.value)} style={inp} />
        <input type="text" placeholder="Repository (e.g. FloodAlertApp)"
          value={repo} onChange={e => setRepo(e.target.value)} style={inp} />
      </div>

      {error && (
        <p style={{ marginTop: 10, color: colors.red, fontSize: 12, fontFamily: fonts.mono }}>
          ⚠ {error}
        </p>
      )}

      <button type="submit" disabled={!canSubmit} style={{
        marginTop: 16, width: '100%', padding: '11px 0',
        background: canSubmit ? `linear-gradient(135deg, ${colors.cyanDim}, ${colors.cyan})` : colors.bg3,
        border: 'none', borderRadius: 8,
        color: canSubmit ? '#000' : colors.textDim,
        fontFamily: fonts.display, fontSize: 13, fontWeight: 700,
        cursor: canSubmit ? 'pointer' : 'not-allowed',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {loading ? <><Spinner size={14} color="#000" /> Connecting…</> : 'Connect & Load Dashboard'}
      </button>

      <p style={{ marginTop: 12, fontSize: 11, color: colors.orange, lineHeight: 1.6,
        padding: '8px 12px', background: 'rgba(255,157,0,0.07)',
        border: '1px solid rgba(255,157,0,0.2)', borderRadius: 7 }}>
        ⚠ Your token is used only in this browser — never stored or sent to any server.
      </p>
    </form>
  )
}