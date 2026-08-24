import express from 'express'
import Customer from '../models/Customer.js'

const router = express.Router()

router.post('/login', async (request, response) => {
  const { name, email } = request.body

  if (!email) {
    const error = new Error('Email is required')
    error.statusCode = 400
    throw error
  }

  const environment = globalThis.process?.env || {}
  const role = email === (environment.ADMIN_EMAIL || 'admin@quickbite.local') ? 'admin' : 'customer'
  const customer = await Customer.findOneAndUpdate(
    { email },
    { $set: { role }, $setOnInsert: { name: name || email.split('@')[0], email } },
    { new: true, upsert: true, runValidators: true },
  )

  response.status(200).json({ customer, token: `customer:${customer._id}:${role}` })
})

export default router