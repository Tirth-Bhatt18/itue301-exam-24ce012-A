import express from 'express'
import mongoose from 'mongoose'
import Order, { orderStatuses } from '../models/Order.js'

const router = express.Router()

router.post('/', async (request, response) => {
  const order = await Order.create({
    ...request.body,
    customerId: request.customer.id,
  })
  response.status(201).json(order)
})

router.get('/', async (request, response) => {
  const orders = await Order.find({ customerId: request.customer.id })
    .populate('customerId', 'name email')
    .populate('restaurantId', 'name cuisine')
  response.status(200).json(orders)
})

router.patch('/:id/status', async (request, response) => {
  const { id } = request.params
  const { status } = request.body

  if (!mongoose.isValidObjectId(id) || !orderStatuses.includes(status)) {
    const error = new Error('A valid order id and status are required')
    error.statusCode = 400
    throw error
  }

  const order = await Order.findOneAndUpdate(
    { _id: id, customerId: request.customer.id },
    { status },
    { new: true, runValidators: true },
  )

  if (!order) {
    const error = new Error('Order not found')
    error.statusCode = 400
    throw error
  }

  response.status(200).json(order)
})

export default router