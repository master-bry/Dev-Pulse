import React, { createContext, useContext, useState, useCallback } from 'react'

const RepoContext = createContext(null)

const STORAGE_KEY = 'devpulse-repos'

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
  catch { return [] }
}

export function RepoProvider({ children }) {
  const [savedRepos, setSavedRepos] = useState(loadSaved)
  const [activeRepo, setActiveRepo] = useState(null) // { owner, repo, token, label }

  const saveRepo = useCallback((creds, label) => {
    const entry = { owner: creds.owner, repo: creds.repo, label: label || `${creds.owner}/${creds.repo}`, addedAt: Date.now() }
    setSavedRepos(prev => {
      const filtered = prev.filter(r => !(r.owner === creds.owner && r.repo === creds.repo))
      const next = [entry, ...filtered].slice(0, 10) // max 10 repos
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeRepo = useCallback((owner, repo) => {
    setSavedRepos(prev => {
      const next = prev.filter(r => !(r.owner === owner && r.repo === repo))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <RepoContext.Provider value={{ savedRepos, activeRepo, setActiveRepo, saveRepo, removeRepo }}>
      {children}
    </RepoContext.Provider>
  )
}

export function useRepo() {
  const ctx = useContext(RepoContext)
  if (!ctx) throw new Error('useRepo must be inside RepoProvider')
  return ctx
}
