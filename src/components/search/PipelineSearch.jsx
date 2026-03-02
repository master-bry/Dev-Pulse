import React from 'react'

const STATUSES = ['all', 'success', 'failure', 'in_progress', 'cancelled']
const STATUS_LABELS = { all: 'All', success: '✅ Success', failure: '❌ Failed', in_progress: '🔄 Running', cancelled: '⏹ Cancelled' }

/**
 * PipelineSearch — search + status filter bar for pipeline runs.
 * @param {{ query, setQuery, statusFilter, setStatusFilter, total, filtered }} props
 */
export default function PipelineSearch({ query, setQuery, statusFilter, setStatusFilter, total, filtered }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      padding: '10px 20px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg2)',
    }}>
      {/* Search input */}
      <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
        <span style={{
          position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
          fontSize: 12, color: 'var(--text-dim)', pointerEvents: 'none',
        }}>🔍</span>
        <input
          type="text"
          placeholder="Search workflow, branch, commit…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 7,
            padding: '6px 10px 6px 30px',
            color: 'var(--text-bright)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-dim)', fontSize: 14, lineHeight: 1,
          }}>×</button>
        )}
      </div>

      {/* Status filters */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`nav-tab ${statusFilter === s ? 'active' : 'inactive'}`}
            style={{ fontSize: 10, padding: '4px 10px' }}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
        {filtered < total
          ? <span><span style={{ color: 'var(--accent)' }}>{filtered}</span> of {total}</span>
          : <span>{total} runs</span>
        }
      </div>
    </div>
  )
}
