import mongoose from 'mongoose'
import Customer from '../models/Customer.js'

async function authGuard(request, response, next) {
  const authorization = request.headers.authorization
  const [scheme, token] = authorization?.split(' ') || []

  const tokenParts = token?.split(':') || []
  const customerId = tokenParts[1]
  const role = tokenParts[2]

  if (scheme !== 'Bearer' || tokenParts.length !== 3 || tokenParts[0] !== 'customer' || !mongoose.isValidObjectId(customerId)) {
    const error = new Error('A valid Bearer token is required')
    error.statusCode = 401
    return next(error)
  }

  const customer = await Customer.findById(customerId).select('role name email')
  if (!customer || customer.role !== role) {
    const error = new Error('A valid Bearer token is required')
    error.statusCode = 401
    return next(error)
  }

  request.customer = customer
  next()
}

export default authGuard