import React, { useId, useRef, useState, useEffect } from 'react'
import { colors } from '@/styles/theme'
import { buildChartPoints } from '@/utils/chartHelpers'

/**
 * AreaChart — responsive SVG area chart with grid lines.
 * @param {{ data: number[], color: string, height?: number }} props
 */
export default function AreaChart({ data, color, height = 60 }) {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(300)
  const uid = useId()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setWidth(el.clientWidth)
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const points = buildChartPoints(data, width, height)

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {points && (
        <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0"    />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={0} y1={height * (1 - f)}
              x2={width} y2={height * (1 - f)}
              stroke={colors.border} strokeWidth={1}
            />
          ))}

          <polygon  points={points.areaPoints} fill={`url(#${uid})`} />
          <polyline points={points.linePoints}  fill="none" stroke={color}
                    strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}
