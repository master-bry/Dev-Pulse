import React from 'react'
import { useMetrics } from '@/hooks/useMetrics'
import SectionCard from '@/components/shared/SectionCard'
import MetricCard from './MetricCard'

export default function CloudWatchPanel() {
  const { metrics, alarmCount } = useMetrics()

  const right = alarmCount > 0 ? (
    <span style={{ fontSize: 11, color: 'var(--red)', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.2)', borderRadius: 6, padding: '2px 8px' }}>
      {alarmCount} ALARM{alarmCount > 1 ? 'S' : ''}
    </span>
  ) : (
    <span style={{ fontSize: 11, color: 'var(--green)' }}>● All OK</span>
  )

  return (
    <SectionCard icon="☁️" title="AWS CloudWatch" right={right} delay={200}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 14 }}>
        {metrics.map((m, i) => <MetricCard key={m.id} metric={m} index={i} />)}
      </div>
    </SectionCard>
  )
}
