// eslint-disable-no-console
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');
const { messages } = require('./utils');

/* Server config */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send(messages.notFound);
});

/* Database config */
mongoose.connect('mongodb://localhost:27017/companyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log(messages.connectionSuccess);
});
db.on('error', (err) => console.log(`${messages.connectionError}: ${err}`));

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
