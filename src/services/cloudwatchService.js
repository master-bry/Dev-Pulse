// ── AWS CloudWatch Service ─────────────────────────────
// AWS SDK requires server-side credentials (never expose in browser).
// This service returns realistic mock metric data.
// To go live: create a /api/metrics endpoint in your Node backend
// that uses @aws-sdk/client-cloudwatch and replace the mock below.

/**
 * Generate a realistic time-series array of length `points`.
 * @param {number} base      Centre value
 * @param {number} variance  Max random deviation
 * @param {boolean} spike    Inject a spike near the end
 */
function generateTimeSeries(base, variance, spike = false, points = 24) {
  return Array.from({ length: points }, (_, i) => {
    let v = base + (Math.random() - 0.5) * variance
    if (spike && i === points - 4) v += variance * 1.6
    return Math.max(0, Math.min(9999, Math.round(v * 10) / 10))
  })
}

const MOCK_METRICS = [
  {
    id: 'cpu',
    name: 'CPU Utilization',
    unit: '%',
    service: 'api-gateway',
    namespace: 'AWS/EC2',
    color: '#00dcbe',
    data: generateTimeSeries(44, 22, true),
    alarm: { threshold: 75, label: 'WARN' },
  },
  {
    id: 'mem',
    name: 'Memory Usage',
    unit: '%',
    service: 'worker-service',
    namespace: 'CWAgent',
    color: '#4db8ff',
    data: generateTimeSeries(67, 12, false),
    alarm: null,
  },
  {
    id: 'rps',
    name: 'Request Rate',
    unit: 'req/s',
    service: 'api-gateway',
    namespace: 'AWS/ApplicationELB',
    color: '#00e676',
    data: generateTimeSeries(1240, 380, false),
    alarm: null,
  },
  {
    id: 'lat',
    name: 'P99 Latency',
    unit: 'ms',
    service: 'ml-inference',
    namespace: 'AWS/ApplicationELB',
    color: '#ff9d00',
    data: generateTimeSeries(48, 25, true),
    alarm: { threshold: 80, label: 'CRIT' },
  },
]

/**
 * Fetch CloudWatch metrics.
 * Swap the mock array for a real fetch('/api/metrics') when ready.
 */
export async function fetchMetrics() {
  await new Promise((r) => setTimeout(r, 400))
  return MOCK_METRICS
}

/**
 * Determine alarm state for a metric.
 * @returns {'ALARM'|'OK'|null}
 */
export function getAlarmState(metric) {
  if (!metric.alarm) return null
  const last = metric.data.at(-1)
  return last > metric.alarm.threshold ? metric.alarm.label : 'OK'
}
