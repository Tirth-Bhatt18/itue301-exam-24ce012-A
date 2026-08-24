import express from 'express'

const router = express.Router()

router.post('/', (request, response) => {
  response.status(201).json({ message: 'Order endpoint is ready', order: request.body })
})

router.get('/', (request, response) => {
  response.status(200).json([])
})

router.patch('/:id/status', (request, response) => {
  response.status(200).json({ id: request.params.id, status: request.body.status })
})

export default router