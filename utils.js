exports.validateRequestId = function (id = '') {
  if (id.length === 24) {
    return true
  } else {
    return false
  }
}

exports.messages = {
  connectionSuccess: 'Successfully connected to the database',
  notFound: { message: 'Resource not found...' },
  requestInvalid: { message: 'Invalid request id' },
  requestSuccess: { message: 'OK' },
}
