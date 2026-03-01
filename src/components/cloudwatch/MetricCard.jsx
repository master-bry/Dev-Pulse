import React from 'react'
import AreaChart from '@/components/shared/AreaChart'
import Badge from '@/components/shared/Badge'
import { colors, fonts } from '@/styles/theme'
import { getAlarmState } from '@/services/cloudwatchService'

/**
 * MetricCard — displays a single CloudWatch metric with chart + alarm state.
 * @param {{ metric: object, index: number }} props
 */
export default function MetricCard({ metric: m, index }) {
  const last       = m.data.at(-1)
  const delta      = last - (m.data.at(-5) ?? m.data[0])
  const alarmState = getAlarmState(m)
  const alarming   = alarmState && alarmState !== 'OK'
  const alarmColor = alarmState === 'CRIT' ? colors.red : colors.orange
  const borderColor = alarming ? alarmColor : colors.border

  return (
    <div
      style={{
        background:    colors.bg2,
        border:        `1px solid ${borderColor}`,
        borderRadius:  10,
        padding:       '14px 16px',
        animation:     alarming
          ? `${alarmState === 'CRIT' ? 'glow-alarm' : 'glow-warn'} 2s ease infinite`
          : 'none',
      }}
    >
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: colors.textDim, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {m.name}
          </div>
          <div style={{ fontSize: 10, color: colors.textDim, marginTop: 2 }}>
            {m.service} · {m.namespace}
          </div>
        </div>
        {alarming && <Badge label={alarmState} color={alarmColor} />}
      </div>

      {/* Value + delta */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <span style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 800, color: m.color }}>
            {Math.round(last)}
          </span>
          <span style={{ fontSize: 12, color: colors.textDim, marginLeft: 4 }}>
            {m.unit}
          </span>
        </div>
        <div style={{
          fontSize:   11,
          color:      delta >= 0 ? colors.red : colors.green,
          display:    'flex',
          gap:        3,
          alignItems: 'center',
        }}>
          <span>{delta >= 0 ? '▲' : '▼'}</span>
          <span>{Math.abs(Math.round(delta * 10) / 10)}{m.unit}</span>
        </div>
      </div>

      {/* Chart */}
      <AreaChart data={m.data} color={m.color} height={50} />

      {/* Threshold row */}
      {m.alarm && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 10, color: colors.textDim }}>
          <span>Threshold: {m.alarm.threshold}{m.unit}</span>
          <span style={{ color: alarming ? alarmColor : colors.green }}>
            {alarming ? '● ALARM' : '● OK'}
          </span>
        </div>
      )}
    </div>
  )
}
