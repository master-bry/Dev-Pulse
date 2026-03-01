import { useState, useEffect, useCallback } from 'react'
import { fetchDockerBuilds, summariseBuilds } from '@/services/dockerService'

/**
 * useDockerBuilds — loads Docker build data from the service layer.
 */
export function useDockerBuilds() {
  const [builds, setBuilds]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchDockerBuilds()
      setBuilds(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { builds, loading, error, stats: summariseBuilds(builds), refresh: load }
}
