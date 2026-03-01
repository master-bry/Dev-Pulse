import React from 'react'
import StatusDot from '@/components/shared/StatusDot'
import Badge from '@/components/shared/Badge'
import { colors } from '@/styles/theme'

export const DOCKER_GRID = '8px 1fr 76px 64px 64px 56px'

/**
 * DockerRow — single Docker build entry.
 * @param {{ build: object, index: number }} props
 */
export default function DockerRow({ build: b, index }) {
  return (
    <div
      className="hover-row"
      style={{
        display:             'grid',
        gridTemplateColumns: DOCKER_GRID,
        alignItems:          'center',
        gap:                 12,
        padding:             '10px 20px',
        borderBottom:        `1px solid ${colors.border}`,
        animation:           `slide-in 0.3s ease ${index * 35}ms both`,
        transition:          'background 0.15s',
      }}
    >
      <StatusDot status={b.status} />

      <div>
        <div style={{ fontSize: 12, color: colors.textBright, fontWeight: 500 }}>
          {b.image}
        </div>
        <div style={{ fontSize: 11, color: colors.textDim, marginTop: 2 }}>
          :{b.tag} · {b.registry}
        </div>
      </div>

      <Badge label={b.status} status={b.status} />

      <div style={{ fontSize: 11, color: colors.textDim }}>{b.size}</div>
      <div style={{ fontSize: 11, color: colors.textDim }}>{b.duration}</div>
      <div style={{ fontSize: 11, color: colors.textDim, textAlign: 'right' }}>{b.ago}</div>
    </div>
  )
}
