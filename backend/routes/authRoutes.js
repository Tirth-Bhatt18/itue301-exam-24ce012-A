import express from 'express'

const router = express.Router()

router.post('/login', (request, response) => {
  const { email } = request.body

  if (!email) {
    return response.status(400).json({ error: { status: 400, message: 'Email is required' } })
  }

  response.status(200).json({ customer: { email }, token: 'demo-token' })
})

export default router