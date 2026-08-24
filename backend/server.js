import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import errorHandler from './middleware/errorHandler.js'
import requestLogger from './middleware/requestLogger.js'
import authGuard from './middleware/authGuard.js'
import connectDatabase from './config/database.js'
import authRoutes from './routes/authRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const currentFile = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(currentFile)

dotenv.config({ path: path.resolve(currentDirectory, '../.env') })

const app = express()
const environment = globalThis.process?.env || {}
const port = environment.PORT || environment.BACK_PORT || 5000

app.use(requestLogger)
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/restaurants', restaurantRoutes)
app.use('/api/v1/orders', authGuard, orderRoutes)

app.get('/api/v1/health', (request, response) => {
  response.status(200).json({ message: 'QuickBite backend is running' })
})

app.use(errorHandler)

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`QuickBite backend listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error(`MongoDB connection failed: ${error.message}`)
  })