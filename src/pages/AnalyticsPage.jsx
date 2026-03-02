import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePipelines } from '@/hooks/usePipelines'
import { useAnalytics } from '@/hooks/useAnalytics'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { formatDuration, timeAgo } from '@/utils/formatters'

// ── Shared style helpers ───────────────────────────────────────────────────
const card = (extra = {}) => ({
  background: 'var(--bg1)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: 20,
  ...extra,
})

const label = { fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }
const big   = { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--text-bright)', lineHeight: 1 }

// ── Donut Chart ────────────────────────────────────────────────────────────
function DonutChart({ success, failed, other, total }) {
  const size   = 120
  const stroke = 14
  const r      = (size - stroke) / 2
  const circ   = 2 * Math.PI * r
  const cx     = size / 2, cy = size / 2

  const segments = [
    { value: success, color: 'var(--green)' },
    { value: failed,  color: 'var(--red)' },
    { value: other,   color: 'var(--text-dim)' },
  ]

  let offset = 0
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        if (!seg.value) return null
        const dash   = (seg.value / total) * circ
        const gap    = circ - dash
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        )
        offset += dash
        return el
      })}
    </svg>
  )
}

// ── Bar Chart (daily trend) ────────────────────────────────────────────────
function DailyBarChart({ data }) {
  const maxTotal = Math.max(...data.map(d => d.total), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {d.failed > 0 && (
              <div title={`${d.failed} failed`} style={{
                height: `${(d.failed / maxTotal) * 80}px`,
                background: 'var(--red)',
                borderRadius: '3px 3px 0 0',
                opacity: 0.85,
                minHeight: 2,
              }} />
            )}
            {d.success > 0 && (
              <div title={`${d.success} success`} style={{
                height: `${(d.success / maxTotal) * 80}px`,
                background: 'var(--green)',
                borderRadius: d.failed ? '0' : '3px 3px 0 0',
                opacity: 0.85,
                minHeight: 2,
              }} />
            )}
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{d.day}</div>
        </div>
      ))}
    </div>
  )
}

// ── Workflow Bar ───────────────────────────────────────────────────────────
function WorkflowBar({ wf, maxTotal }) {
  const pct     = Math.round((wf.success / Math.max(wf.total, 1)) * 100)
  const barW    = Math.round((wf.total / maxTotal) * 100)
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 }}>
        <span style={{ color: 'var(--text-bright)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>{wf.name}</span>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <span style={{ color: 'var(--green)' }}>{wf.success}✓</span>
          {wf.failed > 0 && <span style={{ color: 'var(--red)' }}>{wf.failed}✗</span>}
          <span style={{ color: 'var(--text-dim)' }}>{pct}%</span>
        </div>
      </div>
      <div style={{ height: 5, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3,
          width: `${barW}%`,
          background: pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--orange)' : 'var(--red)',
          transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label: lbl, value, sub, color, icon }) {
  return (
    <div style={card()}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={label}>{lbl}</div>
          <div style={{ ...big, color: color || 'var(--text-bright)' }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{sub}</div>}
        </div>
        <span style={{ fontSize: 22, opacity: 0.5 }}>{icon}</span>
      </div>
    </div>
  )
}

// ── Empty State ────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 12 }}>
      <div style={{ fontSize: 48 }}>📊</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-bright)' }}>No data yet</div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Connect a GitHub repo with Actions workflows to see analytics</div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const { creds } = useAuth()
  const { runs, loading } = usePipelines(creds)
  const analytics = useAnalytics(runs)

  if (!analytics) return (
    <DashboardLayout activeTab="analytics">
      {loading
        ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-dim)' }}>Loading analytics…</div>
        : <EmptyState />
      }
    </DashboardLayout>
  )

  const { total, success, failed, running, other, successRate,
          avgDuration, maxDuration, dailyTrend, workflows, branches, recentFailures } = analytics

  const maxWfTotal = Math.max(...workflows.map(w => w.total), 1)

  return (
    <DashboardLayout activeTab="analytics">
      {/* Page header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-bright)' }}>
          📈 Analytics
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 3 }}>
          {creds?.owner}/{creds?.repo} · Last {total} runs
        </div>
      </div>

      {/* ── Row 1: Summary KPIs ──────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>
        <StatCard label="Total Runs"    value={total}    icon="🔢" color="var(--text-bright)" />
        <StatCard label="Success Rate"  value={`${successRate}%`} icon="✅"
          color={successRate >= 80 ? 'var(--green)' : successRate >= 50 ? 'var(--orange)' : 'var(--red)'}
          sub={`${success} passed · ${failed} failed`}
        />
        <StatCard label="Avg Duration"  value={formatDuration(avgDuration * 1000)} icon="⏱" color="var(--accent)"
          sub={`Max: ${formatDuration(maxDuration * 1000)}`}
        />
        <StatCard label="Currently Running" value={running} icon="🔄" color={running > 0 ? 'var(--cyan, var(--accent))' : 'var(--text-dim)'}
          sub={running > 0 ? 'In progress now' : 'All idle'}
        />
      </div>

      {/* ── Row 2: Donut + Daily Trend ───────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14, marginBottom: 16 }}>

        {/* Donut */}
        <div style={card({ display: 'flex', alignItems: 'center', gap: 20 })}>
          <DonutChart success={success} failed={failed} other={other} total={total} />
          <div>
            <div style={label}>Outcome Split</div>
            {[
              { label: 'Success', value: success, color: 'var(--green)' },
              { label: 'Failed',  value: failed,  color: 'var(--red)' },
              { label: 'Other',   value: other,   color: 'var(--text-dim)' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text)', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily trend */}
        <div style={card()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={label}>Daily Runs — Last 7 Days</div>
            <div style={{ display: 'flex', gap: 14, fontSize: 10 }}>
              <span style={{ color: 'var(--green)' }}>■ Success</span>
              <span style={{ color: 'var(--red)' }}>■ Failed</span>
            </div>
          </div>
          <DailyBarChart data={dailyTrend} />
        </div>
      </div>

      {/* ── Row 3: Workflows + Branches + Recent Failures ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

        {/* Workflow breakdown */}
        <div style={card()}>
          <div style={label}>Top Workflows</div>
          {workflows.length === 0
            ? <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>No data</div>
            : workflows.map(wf => <WorkflowBar key={wf.name} wf={wf} maxTotal={maxWfTotal} />)
          }
        </div>

        {/* Branch breakdown */}
        <div style={card()}>
          <div style={label}>Active Branches</div>
          {branches.map((b, i) => (
            <div key={b.branch} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '6px 10px', background: 'var(--bg2)', borderRadius: 7 }}>
              <span style={{ fontSize: 11, color: 'var(--text-dim)', width: 14, textAlign: 'center' }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 12, color: 'var(--text-bright)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.branch}</span>
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{b.total} runs</span>
              {b.failed > 0 && <span style={{ fontSize: 10, color: 'var(--red)', background: 'rgba(255,77,77,0.1)', padding: '2px 6px', borderRadius: 4 }}>{b.failed}✗</span>}
            </div>
          ))}
        </div>

        {/* Recent failures */}
        <div style={card()}>
          <div style={label}>Recent Failures</div>
          {recentFailures.length === 0
            ? <div style={{ fontSize: 12, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <span>✅</span> No recent failures!
              </div>
            : recentFailures.map(r => (
              <div key={r.id} style={{ marginBottom: 10, padding: '8px 10px', background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.15)', borderRadius: 7 }}>
                <div style={{ fontSize: 12, color: 'var(--text-bright)', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{r.head_branch}</span>
                  <span>{timeAgo(r.updated_at)}</span>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </DashboardLayout>
  )
}
