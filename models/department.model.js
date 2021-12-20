const mongoose = require('mongoose')

const departmentsSchema = new mongoose.Schema({
  name: {
    type: String, required: true, minlength: 5, maxlength: 20,
  },
})

module.exports = mongoose.model('Department', departmentsSchema)
