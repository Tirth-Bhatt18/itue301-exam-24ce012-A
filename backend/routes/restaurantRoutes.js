import express from 'express'

const router = express.Router()

router.get('/', (request, response) => {
  response.status(200).json([])
})

export default router