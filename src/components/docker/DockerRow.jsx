import React from 'react'
import StatusDot from '@/components/shared/StatusDot'
import Badge from '@/components/shared/Badge'
import { timeAgo } from '@/utils/formatters'

export const DOCKER_GRID = '8px 1fr 76px 64px 64px 56px'

export default function DockerRow({ build, index }) {
  return (
    <div className="hover-row" style={{
      display: 'grid', gridTemplateColumns: DOCKER_GRID,
      alignItems: 'center', gap: 12, padding: '10px 20px',
      borderBottom: '1px solid var(--border)',
      animation: `slide-in 0.3s ease ${index * 35}ms both`,
    }}>
      <StatusDot status={build.status} />
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontSize: 12, color: 'var(--text-bright)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {build.image}
          <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--accent-dim)', background: 'var(--accent-faint)', padding: '1px 6px', borderRadius: 4 }}>
            {build.tag}
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{build.registry}</div>
      </div>
      <Badge label={build.status} status={build.status} />
      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{build.size}</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{build.duration}</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'right' }}>{timeAgo(build.pushedAt)}</div>
    </div>
  )
}
