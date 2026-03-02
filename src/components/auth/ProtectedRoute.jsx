import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { creds } = useAuth()
  if (!creds) return <Navigate to="/login" replace />
  return <>{children}</>
}
