// ── GitHub Actions API Service ─────────────────────────

const BASE = 'https://api.github.com'

// Minimal headers — only what GitHub's CORS policy allows from a browser
const ghHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
})

// Append timestamp so browser never returns a cached 304 (empty body)
const bust = (url) => `${url}&_=${Date.now()}`

export async function validateCredentials({ token, owner, repo }) {
  // Simple HEAD-style check — just see if we can reach the repo
  const res = await fetch(
    `${BASE}/repos/${owner}/${repo}`,
    { headers: ghHeaders(token) }
  )
  if (res.status === 401) throw new Error('Bad credentials — check your token.')
  if (res.status === 403) throw new Error('Forbidden — token lacks required permissions.')
  if (res.status === 404) throw new Error('Not Found — check owner and repo name.')
  // Any 2xx or 3xx is fine
  return true
}

export async function fetchWorkflowRuns(creds, perPage = 20) {
  const { token, owner, repo } = creds
  const res = await fetch(
    bust(`${BASE}/repos/${owner}/${repo}/actions/runs?per_page=${perPage}`),
    { headers: ghHeaders(token) }
  )
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? `GitHub API ${res.status}: ${res.statusText}`)
  }
  const data = await res.json()
  return data.workflow_runs ?? []
}

export async function fetchRepoInfo(creds) {
  const { token, owner, repo } = creds
  const res = await fetch(
    `${BASE}/repos/${owner}/${repo}`,
    { headers: ghHeaders(token) }
  )
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  return res.json()
}

export async function fetchWorkflows(creds) {
  const { token, owner, repo } = creds
  const res = await fetch(
    bust(`${BASE}/repos/${owner}/${repo}/actions/workflows?x=1`),
    { headers: ghHeaders(token) }
  )
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  const data = await res.json()
  return data.workflows ?? []
}