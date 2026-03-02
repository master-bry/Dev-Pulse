import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [creds, setCreds]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const login = useCallback(async ({ token, owner, repo }) => {
    setLoading(true)
    setError('')

    try {
      // Validate by hitting the repo endpoint — simplest CORS-safe call
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      })

      if (res.status === 401) {
        setError('Invalid token. Please check your GitHub PAT.')
        setLoading(false)
        return
      }
      if (res.status === 404) {
        setError('Repository not found. Check owner and repo name.')
        setLoading(false)
        return
      }
      if (res.status === 403) {
        setError('Access forbidden. Your token may lack required permissions.')
        setLoading(false)
        return
      }

      // Success — store credentials and let ProtectedRoute navigate
      setLoading(false)
      setCreds({ token, owner, repo })

    } catch (err) {
      // Network error — still let them through, dashboard will show error
      console.warn('Login network error:', err.message)
      setLoading(false)
      setCreds({ token, owner, repo })
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
