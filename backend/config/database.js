import mongoose from 'mongoose'

async function connectDatabase() {
  const environment = globalThis.process?.env || {}
  const connectionString = environment.MONGO_URI || environment.DB_STRING

  if (!connectionString) {
    throw new Error('MONGO_URI or DB_STRING is required')
  }

  await mongoose.connect(connectionString)
  console.log('Connected to MongoDB')
}

export default connectDatabase