import React, { useState, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePipelines } from '@/hooks/usePipelines'
import { useToast } from '@/context/ToastContext'
import SectionCard from '@/components/shared/SectionCard'
import StatBar from '@/components/shared/StatBar'
import TableHeader from '@/components/shared/TableHeader'
import Spinner from '@/components/shared/Spinner'
import PipelineRow, { PIPELINE_GRID } from './PipelineRow'
import PipelineSearch from '@/components/search/PipelineSearch'
import { colors, fonts } from '@/styles/theme'
import { timeAgo } from '@/utils/formatters'

export default function PipelinesPanel() {
  const { creds } = useAuth()
  const { error: toastError } = useToast()

  const [query, setQuery]             = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const onNewFailure = useCallback((run) => {
    toastError(
      `Pipeline failed: ${run.name}`,
      `${run.head_branch} · ${run.head_commit?.message?.split('\n')[0]?.slice(0, 60) || ''}`
    )
  }, [toastError])

  const { runs, loading, error, stats, lastRefresh, refresh, filterRuns } =
    usePipelines(creds, { onNewFailure })

  const filtered = filterRuns(query, statusFilter)

  const statItems = [
    { label: 'Total Runs', value: stats.total,   color: 'var(--text-bright)' },
    { label: 'Running',    value: stats.running,  color: 'var(--accent)'      },
    { label: 'Failed',     value: stats.failed,   color: 'var(--red)'         },
  ]

  const right = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {loading && <Spinner size={14} />}
      {lastRefresh && (
        <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
          updated {timeAgo(lastRefresh)}
        </span>
      )}
      <button className="btn-chip" onClick={refresh} style={{
        background: 'var(--accent-faint)', border: '1px solid var(--accent)',
        color: 'var(--accent)', fontSize: 11, fontFamily: 'var(--font-mono)',
        borderRadius: 6, padding: '3px 10px', cursor: 'pointer',
      }}>
        ↺ Refresh
      </button>
    </div>
  )

  return (
    <SectionCard icon="⚡" title={`${creds?.owner}/${creds?.repo} — Actions`} right={right} delay={0}>
      <StatBar stats={statItems} />

      <PipelineSearch
        query={query} setQuery={setQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        total={runs.length} filtered={filtered.length}
      />

      <TableHeader
        columns={['', 'Workflow / Branch / Commit', 'Status', 'Duration', 'When']}
        gridTemplate={PIPELINE_GRID}
      />

      {error && (
        <div style={{ padding: '16px 20px', color: 'var(--red)', fontSize: 12 }}>⚠ {error}</div>
      )}

      {!error && !loading && filtered.length === 0 && (
        <div style={{ padding: '24px 20px', color: 'var(--text-dim)', fontSize: 12 }}>
          {runs.length === 0 ? 'No workflow runs found.' : 'No runs match your search.'}
        </div>
      )}

      {filtered.map((run, i) => (
        <PipelineRow key={run.id} run={run} index={i} />
      ))}
    </SectionCard>
  )
}
