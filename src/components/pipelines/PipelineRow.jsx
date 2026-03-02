import React from 'react'
import StatusDot from '@/components/shared/StatusDot'
import Badge from '@/components/shared/Badge'
import { formatDuration, timeAgo, truncate } from '@/utils/formatters'

export const PIPELINE_GRID = '8px 1fr 100px 76px 72px'

export default function PipelineRow({ run, index }) {
  const conclusion = run.conclusion ?? run.status
  const duration = run.updated_at && run.created_at
    ? formatDuration(new Date(run.updated_at) - new Date(run.created_at))
    : '—'
  const commitMsg = run.head_commit?.message?.split('\n')[0] ?? '—'
  const branch = run.head_branch ?? '—'

  return (
    <div className="hover-row" style={{
      display: 'grid', gridTemplateColumns: PIPELINE_GRID,
      alignItems: 'center', gap: 12, padding: '10px 20px',
      borderBottom: '1px solid var(--border)',
      animation: `slide-in 0.3s ease ${index * 35}ms both`,
    }}>
      <StatusDot status={conclusion} />
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontSize: 12, color: 'var(--text-bright)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {run.name}
          <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text-dim)' }}>{branch}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {truncate(commitMsg, 70)}
        </div>
      </div>
      <Badge label={conclusion ?? 'queued'} status={conclusion} />
      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{duration}</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'right' }}>{timeAgo(run.updated_at)}</div>
    </div>
  )
}
