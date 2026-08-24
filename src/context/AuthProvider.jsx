import { useState } from 'react'
import AuthContext from './authContext'

function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null)
  const [token, setToken] = useState(null)

  function login(nextCustomer, nextToken) {
    setCustomer(nextCustomer)
    setToken(nextToken)
  }

  function logout() {
    setCustomer(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ customer, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider