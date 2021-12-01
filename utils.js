exports.validateRequestId = (id = '') => {
  const idMatch = /^[0-9a-f]{24}$/i;

  if (idMatch.test(id)) {
    return true;
  }

  return false;
};

exports.messages = {
  connectionSuccess: 'Successfully connected to the database',
  connectionError: 'Connection error',
  notFound: { message: 'Resource not found...' },
  requestInvalid: { message: 'Invalid request id' },
  requestSuccess: { message: 'OK' },
  requestError: (err) => ({ message: err }),
};
