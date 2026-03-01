import React from 'react'
import { useDockerBuilds } from '@/hooks/useDockerBuilds'
import SectionCard from '@/components/shared/SectionCard'
import StatBar from '@/components/shared/StatBar'
import TableHeader from '@/components/shared/TableHeader'
import Badge from '@/components/shared/Badge'
import DockerRow, { DOCKER_GRID } from './DockerRow'
import { colors } from '@/styles/theme'

/**
 * DockerPanel — Docker image build history section.
 */
export default function DockerPanel() {
  const { builds, error, stats } = useDockerBuilds()

  const statItems = [
    { label: 'Pushed',   value: stats.pushed,   color: colors.green },
    { label: 'Building', value: stats.building,  color: colors.cyan  },
    { label: 'Failed',   value: stats.failed,    color: colors.red   },
  ]

  return (
    <SectionCard
      icon="🐳"
      title="Docker Builds"
      right={<Badge label="Mock Data" color={colors.yellow} />}
      delay={120}
    >
      <StatBar stats={statItems} />

      <TableHeader
        columns={['', 'Image / Tag', 'Status', 'Size', 'Time', 'When']}
        gridTemplate={DOCKER_GRID}
      />

      {error && (
        <div style={{ padding: '16px 20px', color: colors.red, fontSize: 12 }}>
          ⚠ {error}
        </div>
      )}

      {builds.map((b, i) => (
        <DockerRow key={b.id} build={b} index={i} />
      ))}
    </SectionCard>
  )
}
