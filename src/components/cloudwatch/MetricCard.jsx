import React from 'react'
import AreaChart from '@/components/shared/AreaChart'
import Badge from '@/components/shared/Badge'
import { getAlarmState } from '@/services/cloudwatchService'

export default function MetricCard({ metric: m, index }) {
  const last       = m.data.at(-1)
  const delta      = last - (m.data.at(-5) ?? m.data[0])
  const alarmState = getAlarmState(m)
  const alarming   = alarmState && alarmState !== 'OK'
  const alarmColor = alarmState === 'CRIT' ? 'var(--red)' : 'var(--orange)'

  return (
    <div style={{
      background: 'var(--bg2)',
      border: `1px solid ${alarming ? alarmColor : 'var(--border)'}`,
      borderRadius: 10, padding: '14px 16px',
      animation: alarming ? `${alarmState === 'CRIT' ? 'glow-alarm' : 'glow-warn'} 2s ease infinite` : 'none',
      transition: 'border-color 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.name}</div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{m.service} · {m.namespace}</div>
        </div>
        {alarming && <Badge label={alarmState} status={alarmState.toLowerCase() === 'crit' ? 'failure' : 'action_required'} />}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: m.color }}>{Math.round(last)}</span>
          <span style={{ fontSize: 12, color: 'var(--text-dim)', marginLeft: 4 }}>{m.unit}</span>
        </div>
        <div style={{ fontSize: 11, color: delta >= 0 ? 'var(--red)' : 'var(--green)', display: 'flex', gap: 3 }}>
          <span>{delta >= 0 ? '▲' : '▼'}</span>
          <span>{Math.abs(Math.round(delta * 10) / 10)}{m.unit}</span>
        </div>
      </div>

      <AreaChart data={m.data} color={m.color} height={50} />

      {m.alarm && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 10, color: 'var(--text-dim)' }}>
          <span>Threshold: {m.alarm.threshold}{m.unit}</span>
          <span style={{ color: alarming ? alarmColor : 'var(--green)' }}>{alarming ? '● ALARM' : '● OK'}</span>
        </div>
      )}
    </div>
  )
}
