import { useState, useEffect, useCallback } from 'react'
import { fetchMetrics } from '@/services/cloudwatchService'

const REFRESH_INTERVAL = 60_000 // 1 minute

/**
 * useMetrics — loads CloudWatch metric series.
 */
export function useMetrics() {
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchMetrics()
      setMetrics(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const timer = setInterval(load, REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [load])

  const activeAlarms = metrics.filter(
    (m) => m.alarm && m.data.at(-1) > m.alarm.threshold
  )

  return { metrics, loading, error, activeAlarms, refresh: load }
}
