exports.validateRequestId = function (id = '') {
  const idMatch = /^[0-9a-f]{24}$/i;

  if (idMatch.test(id)) {
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
