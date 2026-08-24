function adminGuard(request, response, next) {
  if (request.customer?.role !== 'admin') {
    const error = new Error('Admin access is required')
    error.statusCode = 403
    return next(error)
  }

  next()
}

export default adminGuard