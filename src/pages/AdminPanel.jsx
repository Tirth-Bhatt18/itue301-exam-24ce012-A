import { useEffect, useState } from 'react'
import useAuth from '../context/useAuth'

function AdminPanel() {
  return (
    <main className="page">
      <p className="eyebrow">QuickBite management</p>
      <h1>Admin Panel</h1>
      <RestaurantManager />
    </main>
  )
}

function RestaurantManager() {
  const { token } = useAuth()
  const [restaurants, setRestaurants] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ name: '', cuisine: '', rating: '', menu: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  function loadRestaurants() {
    return fetch('/api/v1/restaurants').then((response) => response.json()).then(setRestaurants)
  }

  useEffect(() => {
    fetch('/api/v1/restaurants').then((response) => response.json()).then(setRestaurants)
    fetch('/api/v1/orders', { headers: { Authorization: `Bearer ${token}` } }).then((response) => response.json()).then(setOrders)
  }, [token])

  async function addRestaurant(event) {
    event.preventDefault()
    const menu = form.menu.split(',').filter(Boolean).map((entry) => {
      const [name, price = '0'] = entry.split(':')
      return { name: name.trim(), price: Number(price.trim()) }
    })
    const response = await fetch(editingId ? `/api/v1/restaurants/${editingId}` : '/api/v1/restaurants', {
      method: editingId ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: form.name, cuisine: form.cuisine, rating: Number(form.rating), menu }),
    })
    setMessage(response.ok ? (editingId ? 'Restaurant updated.' : 'Restaurant added.') : 'Unable to save restaurant.')
    if (response.ok) { setForm({ name: '', cuisine: '', rating: '', menu: '' }); setEditingId(null); loadRestaurants() }
  }

  function editRestaurant(restaurant) {
    setEditingId(restaurant._id)
    setForm({ name: restaurant.name, cuisine: restaurant.cuisine, rating: restaurant.rating || '', menu: restaurant.menu?.map((item) => `${item.name}:${item.price}`).join(', ') || '' })
  }

  async function removeRestaurant(id) {
    await fetch(`/api/v1/restaurants/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    loadRestaurants()
  }

  return <>
    <form className="order-form" onSubmit={addRestaurant}>
      <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
      <label>Cuisine<input required value={form.cuisine} onChange={(event) => setForm({ ...form, cuisine: event.target.value })} /></label>
      <label>Rating<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} /></label>
      <label>Menu items as name:price, comma separated<input value={form.menu} onChange={(event) => setForm({ ...form, menu: event.target.value })} placeholder="Pizza:250, Juice:80" /></label>
      <button type="submit">{editingId ? 'Update restaurant' : 'Add restaurant'}</button>
      {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', cuisine: '', rating: '', menu: '' }) }}>Cancel edit</button>}
    </form>
    {message && <p>{message}</p>}
    <section className="restaurant-list">
      {restaurants.map((restaurant) => <article className="restaurant-card" key={restaurant._id}>
        <h3>{restaurant.name}</h3><p>{restaurant.cuisine}</p>
        <p>Menu: {restaurant.menu?.map((item) => item.name).join(', ') || 'No items'}</p>
        <button type="button" onClick={() => editRestaurant(restaurant)}>Edit</button>
        <button type="button" onClick={() => removeRestaurant(restaurant._id)}>Delete</button>
      </article>)}
    </section>
    <h2>All customer orders</h2>
    {orders.length === 0 ? <p>No orders yet.</p> : <section className="restaurant-list">
      {orders.map((order) => <article className="restaurant-card" key={order._id}>
        <h3>{order.restaurantId?.name || 'Restaurant'}</h3>
        <p>Customer: {order.customerId?.name || order.customerId?.email || 'Unknown'}</p>
        <p>Items: {order.items?.map((item) => `${item.name} x${item.quantity}`).join(', ')}</p>
        <p>Status: {order.status}</p>
      </article>)}
    </section>}
  </>
}

export default AdminPanel