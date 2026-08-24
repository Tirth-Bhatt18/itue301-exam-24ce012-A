function authGuard(request, response, next) {
  const authorization = request.headers.authorization
  const [scheme, token] = authorization?.split(' ') || []

  if (scheme !== 'Bearer' || token !== 'demo-token') {
    const error = new Error('A valid Bearer token is required')
    error.statusCode = 401
    return next(error)
  }

  request.customer = { id: 'demo-customer' }
  next()
}

export default authGuard