const express = require('express')

const router = express.Router()
const {
  getEmplAll,
  getEmplRandom,
  getEmplById,
  postEmpl,
  putEmpl,
  deleteEmpl,
} = require('../controllers/employees.controller')

router.get('/employees', (req, res) => getEmplAll(req, res))
router.get('/employees/random', (req, res) => getEmplRandom(req, res))
router.get('/employees/:id', (req, res) => getEmplById(req, res))
router.post('/employees', (req, res) => postEmpl(req, res))
router.put('/employees/:id', (req, res) => putEmpl(req, res))
router.delete('/employees/:id', (req, res) => deleteEmpl(req, res))

module.exports = router
