const express = require('express')

const router = express.Router()
const {
  getProdAll,
  getProdRandom,
  getProdById,
  postProd,
  putProd,
  deleteProd,
} = require('../controllers/products.controller')

router.get('/products', (req, res) => getProdAll(req, res))
router.get('/products/random', (req, res) => getProdRandom(req, res))
router.get('/products/:id', (req, res) => getProdById(req, res))
router.post('/products', (req, res) => postProd(req, res))
router.put('/products/:id', (req, res) => putProd(req, res))
router.delete('/products/:id', (req, res) => deleteProd(req, res))

module.exports = router
