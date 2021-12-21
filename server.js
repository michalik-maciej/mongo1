const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const employeesRoutes = require('./routes/employees.routes')
const departmentsRoutes = require('./routes/departments.routes')
const productsRoutes = require('./routes/products.routes')
const { messages } = require('./utils')

/* Server config */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', employeesRoutes)
app.use('/api', departmentsRoutes)
app.use('/api', productsRoutes)

app.use((req, res) => {
  res.status(404).send(messages.notFound)
})

/* Database config */
const { NODE_ENV } = process.env
let dbUri
if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest'
else if (NODE_ENV === 'development') dbUri = 'mongodb://localhost:27017/companyDB'
else dbUri = 'mongodb://localhost:27017/companyDB'

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.once('open', () => {
  console.log(messages.connectionSuccess)
})
db.on('error', (err) => console.log(messages.error(err)))

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000')
})

module.exports = server
