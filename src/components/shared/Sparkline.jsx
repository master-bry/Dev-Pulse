import React, { useId } from 'react'
import { buildChartPoints } from '@/utils/chartHelpers'

/**
 * Sparkline — compact SVG line chart with gradient fill.
 * @param {{ data: number[], color: string, width?: number, height?: number }} props
 */
export default function Sparkline({ data, color, width = 100, height = 32 }) {
  const uid    = useId()
  const points = buildChartPoints(data, width, height)
  if (!points) return null

  const { linePoints, areaPoints, lastX, lastY } = points

  return (
    <svg width={width} height={height} style={{ overflow: 'visible', flexShrink: 0 }}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <polygon  points={areaPoints}  fill={`url(#${uid})`} />
      <polyline points={linePoints}  fill="none" stroke={color} strokeWidth="1.5"
                strokeLinejoin="round" strokeLinecap="round" />
      <circle   cx={lastX} cy={lastY} r="3" fill={color} />
    </svg>
  )
}
