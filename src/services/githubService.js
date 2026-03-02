const BASE = 'https://api.github.com'

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
})

export async function fetchWorkflowRuns(creds, perPage = 20) {
  const { token, owner, repo } = creds
  const url = `${BASE}/repos/${owner}/${repo}/actions/runs?per_page=${perPage}&t=${Date.now()}`
  const res = await fetch(url, { headers: headers(token) })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? `GitHub ${res.status}`)
  }
  const data = await res.json()
  return data.workflow_runs ?? []
}

export async function fetchRepoInfo(creds) {
  const { token, owner, repo } = creds
  const res = await fetch(`${BASE}/repos/${owner}/${repo}`, { headers: headers(token) })
  if (!res.ok) throw new Error(`GitHub ${res.status}`)
  return res.json()
}
