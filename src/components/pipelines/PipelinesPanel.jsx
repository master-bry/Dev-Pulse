import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePipelines } from '@/hooks/usePipelines'
import SectionCard from '@/components/shared/SectionCard'
import StatBar from '@/components/shared/StatBar'
import TableHeader from '@/components/shared/TableHeader'
import Spinner from '@/components/shared/Spinner'
import Badge from '@/components/shared/Badge'
import PipelineRow, { PIPELINE_GRID } from './PipelineRow'
import { colors, fonts } from '@/styles/theme'
import { timeAgo } from '@/utils/formatters'

/**
 * PipelinesPanel — GitHub Actions workflow runs section.
 */
export default function PipelinesPanel() {
  const { creds } = useAuth()
  const { runs, loading, error, stats, lastRefresh, refresh } = usePipelines(creds)

  const statItems = [
    { label: 'Total Runs', value: stats.total,   color: colors.textBright },
    { label: 'Running',    value: stats.running,  color: colors.cyan       },
    { label: 'Failed',     value: stats.failed,   color: colors.red        },
  ]

  const right = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {loading && <Spinner size={14} />}
      {lastRefresh && (
        <span style={{ fontSize: 10, color: colors.textDim }}>
          updated {timeAgo(lastRefresh)}
        </span>
      )}
      <button
        className="btn-chip"
        onClick={refresh}
        style={{
          background:   colors.cyanFaint,
          border:       `1px solid ${colors.cyan}30`,
          color:        colors.cyan,
          fontSize:     11,
          fontFamily:   fonts.mono,
          borderRadius: 6,
          padding:      '3px 10px',
          cursor:       'pointer',
          transition:   'background 0.2s',
        }}
      >
        ↺ Refresh
      </button>
    </div>
  )

  return (
    <SectionCard
      icon="⚡"
      title={`${creds?.owner}/${creds?.repo} — Actions`}
      right={right}
      delay={0}
    >
      <StatBar stats={statItems} />

      <TableHeader
        columns={['', 'Workflow / Branch / Commit', 'Status', 'Duration', 'When']}
        gridTemplate={PIPELINE_GRID}
      />

      {error && (
        <div style={{ padding: '16px 20px', color: colors.red, fontSize: 12 }}>
          ⚠ {error}
        </div>
      )}

      {!error && !loading && runs.length === 0 && (
        <div style={{ padding: '24px 20px', color: colors.textDim, fontSize: 12 }}>
          No workflow runs found for this repository.
        </div>
      )}

      {runs.map((run, i) => (
        <PipelineRow key={run.id} run={run} index={i} />
      ))}
    </SectionCard>
  )
}
