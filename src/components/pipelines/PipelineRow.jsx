import React from 'react'
import StatusDot from '@/components/shared/StatusDot'
import Badge from '@/components/shared/Badge'
import { colors } from '@/styles/theme'
import { formatDuration, timeAgo, truncate } from '@/utils/formatters'

const GRID = '8px 1fr 100px 76px 72px'

/**
 * PipelineRow — single workflow run row.
 * @param {{ run: object, index: number }} props
 */
export default function PipelineRow({ run, index }) {
  const conclusion = run.conclusion ?? run.status
  const duration   = run.updated_at && run.created_at
    ? formatDuration(new Date(run.updated_at) - new Date(run.created_at))
    : '—'
  const commitMsg  = run.head_commit?.message?.split('\n')[0] ?? '—'
  const branch     = run.head_branch ?? '—'

  return (
    <div
      className="hover-row"
      style={{
        display:             'grid',
        gridTemplateColumns: GRID,
        alignItems:          'center',
        gap:                 12,
        padding:             '10px 20px',
        borderBottom:        `1px solid ${colors.border}`,
        animation:           `slide-in 0.3s ease ${index * 35}ms both`,
        transition:          'background 0.15s',
      }}
    >
      <StatusDot status={conclusion} />

      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            fontSize:     12,
            color:        colors.textBright,
            fontWeight:   500,
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {run.name}
          <span style={{ marginLeft: 8, fontSize: 10, color: colors.textDim }}>
            {branch}
          </span>
        </div>
        <div
          style={{
            fontSize:     11,
            color:        colors.textDim,
            marginTop:    2,
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {truncate(commitMsg, 70)}
        </div>
      </div>

      <Badge label={conclusion ?? 'queued'} status={conclusion} />

      <div style={{ fontSize: 11, color: colors.textDim }}>
        {duration}
      </div>

      <div style={{ fontSize: 11, color: colors.textDim, textAlign: 'right' }}>
        {timeAgo(run.updated_at)}
      </div>
    </div>
  )
}

export { GRID as PIPELINE_GRID }
