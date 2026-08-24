import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth'

function Navigation() {
  const { customer } = useAuth()

  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/">Home</Link>
      <Link to="/restaurants">Restaurants</Link>
      <Link to="/order">Order</Link>
      {customer?.role === 'admin' && <Link to="/admin">Admin</Link>}
    </nav>
  )
}

export default Navigation