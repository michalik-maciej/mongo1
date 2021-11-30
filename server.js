const express = require('express')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const { messages } = require('./utils')
const employeesRoutes = require('./routes/employees.routes')
const departmentsRoutes = require('./routes/departments.routes')
const productsRoutes = require('./routes/products.routes')

mongoClient.connect(
  'mongodb://localhost:27017',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err)
    } else {
      console.log(messages.connectionSuccess)

      const db = client.db('companyDB')
      const app = express()

      /* db.collection('employees').find(
      {department: 'IT'}, (err, employees) => {
        if (!err) {
          employees.each((err, employee) => {
            console.log(employee);
          })
        };
      }
    );

    db.collection('persons').updateMany(
      { $and:
          [ {age: {$gte: 18}}, {age: {$lte: 30}} ],
        $and:
          [ {salary: {$gte: 2500}}, {salary: {$lte: 4000}} ],
      },
      {
        $set: { salary: 4000 }
      },
      (err) => {
        if (err) console.log(err)
      }
    );

    db.collection('persons').deleteOne({ salary: 4000 }, (err) => {
      if (err) console.log(err)
    })

    db.collection('departments').insertOne({ name: 'Management'}, (err) => {
      if (err) console.log('err');
    }); */

      app.use(cors())
      app.use(express.json())
      app.use(express.urlencoded({ extended: false }))
      app.use((req, res, next) => {
        req.db = db
        next()
      })
      app.use('/api', employeesRoutes)
      app.use('/api', departmentsRoutes)
      app.use('/api', productsRoutes)

      app.use((req, res) => {
        res.status(404).send(messages.notFound)
      })

      app.listen('8000', () => {
        console.log('Server is running on port: 8000')
      })
    }
  }
)
