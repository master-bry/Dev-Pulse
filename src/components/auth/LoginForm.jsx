import React, { useState } from 'react'
import Spinner from '@/components/shared/Spinner'
import { colors, fonts } from '@/styles/theme'

/**
 * LoginForm — pure presentational form, receives onSubmit/loading/error as props.
 * Does NOT call useAuth directly — parent page handles that.
 */
export default function LoginForm({ onSubmit, loading, error }) {
  const [token, setToken] = useState('')
  const [owner, setOwner] = useState('')
  const [repo,  setRepo]  = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (token && owner && repo) {
      onSubmit({ token, owner, repo })
    }
  }

  const inputStyle = {
    width:        '100%',
    background:   colors.bg,
    border:       `1px solid ${colors.border}`,
    borderRadius: 7,
    padding:      '9px 12px',
    color:        colors.textBright,
    fontFamily:   fonts.mono,
    fontSize:     13,
    transition:   'border-color 0.2s',
  }

  const disabled = loading || !token || !owner || !repo

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          type="password"
          placeholder="GitHub Token  (ghp_...)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={inputStyle}
          autoComplete="current-password"
        />
        <input
          type="text"
          placeholder="Owner / Org  (e.g. master-bry)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Repository  (e.g. FloodAlertApp)"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error && (
        <p style={{ marginTop: 10, color: colors.red, fontSize: 12, fontFamily: fonts.mono }}>
          ⚠ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled}
        style={{
          marginTop:      16,
          width:          '100%',
          padding:        '10px 0',
          background:     disabled
            ? colors.bg3
            : `linear-gradient(135deg, ${colors.cyanDim}, ${colors.cyan})`,
          border:         'none',
          borderRadius:   8,
          color:          disabled ? colors.textDim : '#000',
          fontFamily:     fonts.display,
          fontSize:       13,
          fontWeight:     700,
          cursor:         disabled ? 'not-allowed' : 'pointer',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            8,
          opacity:        disabled ? 0.6 : 1,
          transition:     'opacity 0.2s',
        }}
      >
        {loading
          ? <><Spinner size={14} color="#000" /> Connecting…</>
          : 'Connect & Load Workflows'
        }
      </button>

      <div style={{
        marginTop:    16,
        padding:      '10px 14px',
        background:   'rgba(255,157,0,0.07)',
        border:       '1px solid rgba(255,157,0,0.2)',
        borderRadius: 8,
        fontSize:     11,
        color:        colors.orange,
        lineHeight:   1.6,
      }}>
        ⚠ Your token stays in your browser only — never stored or sent anywhere.
        Requires a fine-grained PAT with <strong>Actions (read)</strong> scope.
      </div>
    </form>
  )
}