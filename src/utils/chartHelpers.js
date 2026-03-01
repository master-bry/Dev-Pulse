/**
 * Build SVG polyline/polygon point strings from a data array.
 * @param {number[]} data
 * @param {number}   width   SVG width in px
 * @param {number}   height  SVG height in px
 * @param {number}   padding Vertical padding factor (0–1)
 * @returns {{ linePoints, areaPoints, lastX, lastY, max, min }}
 */
export function buildChartPoints(data, width, height, padding = 0.05) {
  if (!data || data.length < 2) return null

  const rawMax = Math.max(...data)
  const rawMin = Math.min(...data)
  const max = rawMax + (rawMax - rawMin) * padding || rawMax * 1.05 || 1
  const min = rawMin - (rawMax - rawMin) * padding
  const range = max - min || 1

  const linePoints = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const areaPoints = `0,${height} ${linePoints} ${width},${height}`

  const lastX = width
  const lastY = height - ((data.at(-1) - min) / range) * height

  return { linePoints, areaPoints, lastX, lastY, max, min }
}
