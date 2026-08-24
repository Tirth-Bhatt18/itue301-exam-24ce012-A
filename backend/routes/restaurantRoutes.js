import express from 'express'
import Restaurant from '../models/Restaurant.js'
import authGuard from '../middleware/authGuard.js'
import adminGuard from '../middleware/adminGuard.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const restaurants = await Restaurant.find().sort({ name: 1 })
  response.status(200).json(restaurants)
})

router.use(authGuard, adminGuard)

router.post('/', async (request, response) => {
  const restaurant = await Restaurant.create(request.body)
  response.status(201).json(restaurant)
})

router.patch('/:id', async (request, response) => {
  const restaurant = await Restaurant.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })
  if (!restaurant) {
    const error = new Error('Restaurant not found')
    error.statusCode = 404
    throw error
  }
  response.status(200).json(restaurant)
})

router.delete('/:id', async (request, response) => {
  const restaurant = await Restaurant.findByIdAndDelete(request.params.id)
  if (!restaurant) {
    const error = new Error('Restaurant not found')
    error.statusCode = 404
    throw error
  }
  response.status(200).json({ message: 'Restaurant deleted' })
})

export default router