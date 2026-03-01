import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import PipelinesPanel from '@/components/pipelines/PipelinesPanel'
import DockerPanel from '@/components/docker/DockerPanel'
import CloudWatchPanel from '@/components/cloudwatch/CloudWatchPanel'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PipelinesPanel />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <DockerPanel />
        <CloudWatchPanel />
      </div>
    </DashboardLayout>
  )
}