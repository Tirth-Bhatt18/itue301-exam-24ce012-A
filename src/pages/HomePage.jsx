import { useState } from 'react'
import useAuth from '../context/useAuth'

function HomePage() {
  const { customer, login, logout } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loginError, setLoginError] = useState('')

  async function handleSignIn(event) {
    event.preventDefault()
    setLoginError('')

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error?.message || 'Unable to sign in')
      login(data.customer, data.token)
    } catch (requestError) {
      setLoginError(requestError.message)
    }
  }

  return (
    <main className="page home-page">
      <p className="eyebrow">QuickBite</p>
      <h1>Good food, without the phone call.</h1>
      <p>Browse local restaurants and place your next meal order online.</p>
      {customer ? (
        <div>
          <p>Signed in as {customer.name}.</p>
          <button type="button" onClick={logout}>Sign out</button>
        </div>
      ) : (
        <form onSubmit={handleSignIn}>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <button type="submit">Sign in</button>
          {loginError && <p role="alert">{loginError}</p>}
        </form>
      )}
    </main>
  )
}

export default HomePage