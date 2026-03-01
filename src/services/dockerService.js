// ── Docker Builds Service ──────────────────────────────
// In a real setup this would call your Docker Registry API
// or a backend proxy (Docker Hub / AWS ECR require server-side auth).
// For now we serve realistic mock data and expose the same interface
// so swapping to a real API only requires changing this file.

const MOCK_BUILDS = [
  {
    id: 1,
    image: 'api-gateway',
    tag: 'v2.4.1',
    status: 'pushed',
    size: '187 MB',
    layers: 12,
    duration: '1m 32s',
    ago: '3m ago',
    registry: 'ECR',
    digest: 'sha256:a1b2c3d4',
  },
  {
    id: 2,
    image: 'frontend-app',
    tag: 'sha-b8e2c4',
    status: 'building',
    size: '—',
    layers: 9,
    duration: '0m 51s',
    ago: 'now',
    registry: 'ECR',
    digest: null,
  },
  {
    id: 3,
    image: 'worker-service',
    tag: 'v1.9.0',
    status: 'failed',
    size: '—',
    layers: 0,
    duration: '0m 14s',
    ago: '12m ago',
    registry: 'ECR',
    digest: null,
  },
  {
    id: 4,
    image: 'data-pipeline',
    tag: 'v3.1.2',
    status: 'pushed',
    size: '312 MB',
    layers: 18,
    duration: '3m 07s',
    ago: '31m ago',
    registry: 'ECR',
    digest: 'sha256:e5f6a7b8',
  },
  {
    id: 5,
    image: 'nginx-proxy',
    tag: 'latest',
    status: 'cached',
    size: '23 MB',
    layers: 5,
    duration: '0m 04s',
    ago: '1h ago',
    registry: 'DockerHub',
    digest: 'sha256:c9d0e1f2',
  },
]

/**
 * Fetch Docker build list.
 * Replace the mock with a real fetch() call to your backend.
 */
export async function fetchDockerBuilds() {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 300))
  return MOCK_BUILDS
}

/**
 * Summarise Docker build stats.
 * @param {Array} builds
 */
export function summariseBuilds(builds) {
  return {
    total:    builds.length,
    pushed:   builds.filter((b) => b.status === 'pushed').length,
    building: builds.filter((b) => b.status === 'building').length,
    failed:   builds.filter((b) => b.status === 'failed').length,
    cached:   builds.filter((b) => b.status === 'cached').length,
  }
}
