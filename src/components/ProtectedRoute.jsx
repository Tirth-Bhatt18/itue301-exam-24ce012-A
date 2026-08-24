import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

function ProtectedRoute({ children, requiredRole }) {
  const { customer, token } = useAuth()

  if (!token || (requiredRole && customer?.role !== requiredRole)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute