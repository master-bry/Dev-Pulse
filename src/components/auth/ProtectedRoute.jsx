import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

/**
 * ProtectedRoute — redirects to /login if no credentials are set.
 */
export default function ProtectedRoute({ children }) {
  const { creds } = useAuth()
  return creds ? children : <Navigate to="/login" replace />
}
