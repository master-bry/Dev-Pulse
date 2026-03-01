import React from 'react'
import { useMetrics } from '@/hooks/useMetrics'
import SectionCard from '@/components/shared/SectionCard'
import Badge from '@/components/shared/Badge'
import MetricCard from './MetricCard'
import { colors } from '@/styles/theme'

/**
 * CloudWatchPanel — AWS CloudWatch metrics grid section.
 */
export default function CloudWatchPanel() {
  const { metrics, activeAlarms, error } = useMetrics()

  const right = (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {activeAlarms.length > 0 && (
        <Badge
          label={`${activeAlarms.length} Alarm${activeAlarms.length > 1 ? 's' : ''}`}
          color={colors.red}
        />
      )}
      <Badge label="Mock Data" color={colors.yellow} />
    </div>
  )

  return (
    <SectionCard icon="☁️" title="AWS CloudWatch" right={right} delay={240}>
      {error && (
        <div style={{ padding: '16px 20px', color: colors.red, fontSize: 12 }}>
          ⚠ {error}
        </div>
      )}

      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 12,
          padding:             14,
        }}
      >
        {metrics.map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i} />
        ))}
      </div>
    </SectionCard>
  )
}
