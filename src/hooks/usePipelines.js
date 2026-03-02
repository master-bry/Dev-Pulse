import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchWorkflowRuns } from '@/services/githubService'

const REFRESH_INTERVAL = 30_000

/**
 * usePipelines — fetches runs, auto-refreshes, and calls onNewFailure when
 * a run flips to 'failure' so the toast system can alert the user.
 */
export function usePipelines(creds, { onNewFailure } = {}) {
  const [runs, setRuns]             = useState([])
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [lastRefresh, setLastRefresh] = useState(null)
  const prevIdsRef = useRef(new Set())

  const load = useCallback(async () => {
    if (!creds) return
    setLoading(true)
    setError('')
    try {
      const data = await fetchWorkflowRuns(creds, 20)
      setRuns(data)
      setLastRefresh(new Date())

      // Detect newly failed runs (not in previous snapshot)
      if (onNewFailure) {
        data
          .filter(r => r.conclusion === 'failure' && !prevIdsRef.current.has(r.id))
          .forEach(r => onNewFailure(r))
      }
      // Update seen IDs
      prevIdsRef.current = new Set(data.map(r => r.id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [creds, onNewFailure])

  useEffect(() => {
    load()
    const t = setInterval(load, REFRESH_INTERVAL)
    return () => clearInterval(t)
  }, [load])

  // Apply search + status filter
  const filterRuns = useCallback((query = '', statusFilter = 'all') => {
    return runs.filter(r => {
      const matchStatus = statusFilter === 'all'
        || r.conclusion === statusFilter
        || r.status === statusFilter

      const q = query.toLowerCase()
      const matchQuery = !q
        || r.name?.toLowerCase().includes(q)
        || r.head_branch?.toLowerCase().includes(q)
        || r.head_commit?.message?.toLowerCase().includes(q)
        || r.display_title?.toLowerCase().includes(q)

      return matchStatus && matchQuery
    })
  }, [runs])

  const stats = {
    total:   runs.length,
    running: runs.filter(r => r.status === 'in_progress').length,
    failed:  runs.filter(r => r.conclusion === 'failure').length,
    success: runs.filter(r => r.conclusion === 'success').length,
  }

  return { runs, loading, error, stats, lastRefresh, refresh: load, filterRuns }
}
