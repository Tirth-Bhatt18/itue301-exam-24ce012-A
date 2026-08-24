import { useState } from 'react'
import { useEffect } from 'react'
import useAuth from '../context/useAuth'

function OrderPage() {
  const { token } = useAuth()
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState('')
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/v1/restaurants')
      .then((response) => response.json())
      .then(setRestaurants)
      .catch(() => setMessage('Unable to load restaurants'))
  }, [])

  const restaurant = restaurants.find((item) => item._id === selectedRestaurant)

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch('/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        restaurantId: selectedRestaurant,
        items: [{ name: itemName, quantity: Number(quantity) }],
        deliveryAddress,
      }),
    })
    const data = await response.json()
    setMessage(response.ok ? 'Order placed successfully.' : data.error?.message || 'Unable to place order')
  }

  return (
    <main className="page">
      <p className="eyebrow">Your order</p>
      <h1>Place an order</h1>
      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Selected restaurant
          <select value={selectedRestaurant} onChange={(event) => { setSelectedRestaurant(event.target.value); setItemName('') }} required>
            <option value="">Choose a restaurant</option>
            {restaurants.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
          <input
            value={selectedRestaurant}
            type="hidden"
          />
        </label>
        <label>
          Food item
          <select value={itemName} onChange={(event) => setItemName(event.target.value)} required>
            <option value="">Choose from menu</option>
            {restaurant?.menu?.map((item) => <option key={item._id} value={item.name}>{item.name} - Rs. {item.price}</option>)}
          </select>
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <label>
          Delivery address
          <textarea
            value={deliveryAddress}
            onChange={(event) => setDeliveryAddress(event.target.value)}
            placeholder="Where should we deliver?"
          />
        </label>
        <button type="submit">Place order</button>
      </form>
      <p className="order-preview">
        {itemName || 'Your item'} x {quantity} will be delivered to{' '}
        {deliveryAddress || 'your address'}.
      </p>
      {message && <p role="alert">{message}</p>}
    </main>
  )
}

export default OrderPage