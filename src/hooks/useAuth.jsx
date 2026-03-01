import React, { createContext, useContext, useState, useCallback } from 'react'
import { validateCredentials } from '@/services/githubService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [creds, setCreds]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const login = useCallback(async ({ token, owner, repo }) => {
    if (!token || !owner || !repo) {
      setError('All fields are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await validateCredentials({ token, owner, repo })
      setCreds({ token, owner, repo })
    } catch (err) {
      // If validation itself throws (e.g. network error), still let the user
      // proceed — the dashboard will show the real error when it tries to load.
      console.warn('Credential validation warning:', err.message)
      // Only block on clear auth errors (401/403), not network issues
      if (err.message.includes('401') || err.message.includes('Bad credentials')) {
        setError('Invalid token — please check your GitHub PAT.')
        setLoading(false)
        return
      }
      if (err.message.includes('404') || err.message.includes('Not Found')) {
        setError('Repository not found — check owner and repo name.')
        setLoading(false)
        return
      }
      // For CORS/network errors, trust the user and proceed anyway
      setCreds({ token, owner, repo })
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setCreds(null)
    setError('')
  }, [])

  return (
    <AuthContext.Provider value={{ creds, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}