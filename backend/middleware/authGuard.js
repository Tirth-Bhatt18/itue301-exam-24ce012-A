import mongoose from 'mongoose'

function authGuard(request, response, next) {
  const authorization = request.headers.authorization
  const [scheme, token] = authorization?.split(' ') || []

  const customerId = token?.replace('customer:', '')

  if (scheme !== 'Bearer' || !token?.startsWith('customer:') || !mongoose.isValidObjectId(customerId)) {
    const error = new Error('A valid Bearer token is required')
    error.statusCode = 401
    return next(error)
  }

  request.customer = { id: customerId }
  next()
}

export default authGuard