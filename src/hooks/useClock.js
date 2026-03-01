import { useState, useEffect } from 'react'

/**
 * useClock — returns a live UTC timestamp string, updated every second.
 */
export function useClock() {
  const [ts, setTs] = useState('')

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const pad = (v) => String(v).padStart(2, '0')
      setTs(
        `${n.getUTCFullYear()}-${pad(n.getUTCMonth() + 1)}-${pad(n.getUTCDate())} ` +
        `${pad(n.getUTCHours())}:${pad(n.getUTCMinutes())}:${pad(n.getUTCSeconds())} UTC`
      )
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return ts
}
