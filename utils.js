const messages = {
  connectionSuccess: 'Successfully connected to the database',
  notFound: { message: 'Resource not found...' },
  requestInvalid: { message: 'Invalid request id' },
  requestSuccess: {
    confirm: { message: 'OK' },
    describe: (info) => ({ message: { ...info } }),
  },
  error: (err) => ({ message: err }),
}
exports.messages = messages

exports.answerError = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(404).json(messages.requestInvalid)
  }
  return res.status(500).json(messages.error(err))
}
