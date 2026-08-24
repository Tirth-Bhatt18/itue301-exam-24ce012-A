import { useState } from 'react'

function OrderPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('')
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState('')

  return (
    <main className="page">
      <p className="eyebrow">Your order</p>
      <h1>Place an order</h1>
      <form className="order-form">
        <label>
          Selected restaurant
          <input
            value={selectedRestaurant}
            onChange={(event) => setSelectedRestaurant(event.target.value)}
            placeholder="Restaurant name"
          />
        </label>
        <label>
          Item name
          <input
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
            placeholder="What would you like?"
          />
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
      </form>
      <p className="order-preview">
        {itemName || 'Your item'} x {quantity} will be delivered to{' '}
        {deliveryAddress || 'your address'}.
      </p>
    </main>
  )
}

export default OrderPage