import React from 'react'
import { useDockerBuilds } from '@/hooks/useDockerBuilds'
import SectionCard from '@/components/shared/SectionCard'
import StatBar from '@/components/shared/StatBar'
import TableHeader from '@/components/shared/TableHeader'
import DockerRow, { DOCKER_GRID } from './DockerRow'

export default function DockerPanel() {
  const { builds, stats, loading } = useDockerBuilds()

  const statItems = [
    { label: 'Pushed',   value: stats.pushed,   color: 'var(--green)' },
    { label: 'Building', value: stats.building,  color: 'var(--accent)' },
    { label: 'Failed',   value: stats.failed,    color: 'var(--red)' },
  ]

  return (
    <SectionCard icon="🐳" title="Docker Builds" delay={100}>
      <StatBar stats={statItems} />
      <TableHeader columns={['', 'Image / Registry', 'Status', 'Size', 'Duration', 'When']} gridTemplate={DOCKER_GRID} />
      {builds.map((b, i) => <DockerRow key={b.id} build={b} index={i} />)}
    </SectionCard>
  )
}
