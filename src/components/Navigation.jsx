import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/">Home</Link>
      <Link to="/restaurants">Restaurants</Link>
      <Link to="/order">Order</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  )
}

export default Navigation