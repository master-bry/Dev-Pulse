import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import PipelinesPanel from '@/components/pipelines/PipelinesPanel'
import DockerPanel from '@/components/docker/DockerPanel'
import CloudWatchPanel from '@/components/cloudwatch/CloudWatchPanel'
import { useAuth } from '@/hooks/useAuth'
import { usePipelines } from '@/hooks/usePipelines'
import { colors } from '@/styles/theme'

// Temporary debug banner — shows exactly what state the app is in
function DebugBanner() {
  const { creds } = useAuth()
  const { runs, loading, error } = usePipelines(creds)

  return (
    <div style={{
      background: '#0d1c2c',
      border: '1px solid #00dcbe40',
      borderRadius: 8,
      padding: '10px 16px',
      marginBottom: 16,
      fontFamily: 'monospace',
      fontSize: 12,
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap',
    }}>
      <span style={{ color: '#4a7090' }}>DEBUG</span>
      <span>creds: <strong style={{ color: creds ? '#00e676' : '#ff4d4d' }}>{creds ? `${creds.owner}/${creds.repo}` : 'null'}</strong></span>
      <span>loading: <strong style={{ color: '#ffe033' }}>{String(loading)}</strong></span>
      <span>runs: <strong style={{ color: '#00dcbe' }}>{runs.length}</strong></span>
      <span>error: <strong style={{ color: '#ff4d4d' }}>{error || 'none'}</strong></span>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DebugBanner />
      <PipelinesPanel />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <DockerPanel />
        <CloudWatchPanel />
      </div>
    </DashboardLayout>
  )
}