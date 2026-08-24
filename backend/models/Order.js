import mongoose from 'mongoose'

const orderStatuses = [
  'pending',
  'preparing',
  'out-for-delivery',
  'delivered',
  'cancelled',
]

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: { type: [mongoose.Schema.Types.Mixed], required: true },
    totalAmount: { type: Number, min: 0 },
    status: { type: String, enum: orderStatuses, default: 'pending' },
  },
  { collection: 'Order', timestamps: true },
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export { orderStatuses }
export default Order