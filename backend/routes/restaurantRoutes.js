import express from 'express'
import Restaurant from '../models/Restaurant.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const restaurants = await Restaurant.find().sort({ name: 1 })
  response.status(200).json(restaurants)
})

export default router