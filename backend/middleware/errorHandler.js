function errorHandler(error, request, response, next) {
  void request
  void next
  const statusCode = error.statusCode || 500
  const message = statusCode === 500 ? 'Internal server error' : error.message

  response.status(statusCode).json({
    error: {
      status: statusCode,
      message,
    },
  })
}

export default errorHandler