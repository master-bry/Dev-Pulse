import { useMemo } from 'react'

/**
 * useAnalytics — derives rich analytics from raw workflow run arrays.
 * @param {Array} runs  workflow_runs from GitHub API
 */
export function useAnalytics(runs) {
  return useMemo(() => {
    if (!runs || runs.length === 0) return null

    // ── Success / Failure rate ─────────────────────────
    const total   = runs.length
    const success = runs.filter(r => r.conclusion === 'success').length
    const failed  = runs.filter(r => r.conclusion === 'failure').length
    const running = runs.filter(r => r.status === 'in_progress').length
    const other   = total - success - failed - running
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0

    // ── Build durations ────────────────────────────────
    const durations = runs
      .filter(r => r.created_at && r.updated_at && r.conclusion)
      .map(r => (new Date(r.updated_at) - new Date(r.created_at)) / 1000)
      .filter(d => d > 0 && d < 3600) // ignore > 1hr outliers

    const avgDuration = durations.length
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0
    const maxDuration = durations.length ? Math.max(...durations) : 0
    const minDuration = durations.length ? Math.min(...durations) : 0

    // ── Daily trend (last 7 days) ──────────────────────
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      return d.toISOString().slice(0, 10)
    })

    const dailyTrend = days.map(day => {
      const dayRuns = runs.filter(r => r.created_at?.slice(0, 10) === day)
      return {
        day: day.slice(5), // MM-DD
        total:   dayRuns.length,
        success: dayRuns.filter(r => r.conclusion === 'success').length,
        failed:  dayRuns.filter(r => r.conclusion === 'failure').length,
      }
    })

    // ── Workflow breakdown ─────────────────────────────
    const byWorkflow = {}
    runs.forEach(r => {
      const name = r.name || 'Unknown'
      if (!byWorkflow[name]) byWorkflow[name] = { name, total: 0, success: 0, failed: 0 }
      byWorkflow[name].total++
      if (r.conclusion === 'success') byWorkflow[name].success++
      if (r.conclusion === 'failure') byWorkflow[name].failed++
    })
    const workflows = Object.values(byWorkflow)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    // ── Branch breakdown ──────────────────────────────
    const byBranch = {}
    runs.forEach(r => {
      const b = r.head_branch || 'unknown'
      if (!byBranch[b]) byBranch[b] = { branch: b, total: 0, failed: 0 }
      byBranch[b].total++
      if (r.conclusion === 'failure') byBranch[b].failed++
    })
    const branches = Object.values(byBranch).sort((a, b) => b.total - a.total).slice(0, 5)

    // ── Recent failures ────────────────────────────────
    const recentFailures = runs
      .filter(r => r.conclusion === 'failure')
      .slice(0, 5)

    return {
      total, success, failed, running, other, successRate,
      avgDuration, maxDuration, minDuration,
      dailyTrend, workflows, branches, recentFailures,
    }
  }, [runs])
}
