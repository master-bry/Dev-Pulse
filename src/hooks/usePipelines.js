import { useState, useEffect, useCallback } from 'react'
import { fetchWorkflowRuns } from '@/services/githubService'

const REFRESH_INTERVAL = 30_000 // 30 seconds

/**
 * usePipelines — fetches and auto-refreshes GitHub Actions workflow runs.
 * @param {object|null} creds  { token, owner, repo }
 */
export function usePipelines(creds) {
  const [runs, setRuns]       = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [lastRefresh, setLastRefresh] = useState(null)

  const load = useCallback(async () => {
    if (!creds) return
    setLoading(true)
    setError('')
    try {
      const data = await fetchWorkflowRuns(creds, 20)
      setRuns(data)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [creds])

  // Initial load + polling
  useEffect(() => {
    load()
    const timer = setInterval(load, REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [load])

  // Derived stats
  const stats = {
    total:   runs.length,
    running: runs.filter((r) => r.status === 'in_progress').length,
    failed:  runs.filter((r) => r.conclusion === 'failure').length,
    success: runs.filter((r) => r.conclusion === 'success').length,
  }

  return { runs, loading, error, stats, lastRefresh, refresh: load }
}
