import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import errorHandler from './middleware/errorHandler.js'
import requestLogger from './middleware/requestLogger.js'

const currentFile = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(currentFile)
const environment = globalThis.process?.env || {}

dotenv.config({ path: path.resolve(currentDirectory, '../.env') })

const app = express()
const port = environment.PORT || environment.BACK_PORT || 5000

app.use(requestLogger)
app.use(express.json())

app.get('/api/v1/health', (request, response) => {
  response.status(200).json({ message: 'QuickBite backend is running' })
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`QuickBite backend listening on port ${port}`)
})