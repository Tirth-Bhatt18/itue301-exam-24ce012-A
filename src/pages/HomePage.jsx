import { useState } from 'react'
import useAuth from '../context/useAuth'

function HomePage() {
  const { customer, login, logout } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSignIn(event) {
    event.preventDefault()
    login({ name, email }, 'demo-token')
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
        </form>
      )}
    </main>
  )
}

export default HomePage