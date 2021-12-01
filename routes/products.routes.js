const express = require('express')

const router = express.Router()
const { answerError, messages } = require('../utils')
const Product = require('../models/product.model')

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find())
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.get('/products/random', async (req, res) => {
  try {
    const randomProd = await Product.aggregate([{ $sample: { size: 1 } }])
    res.json(randomProd[0])
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.get('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id)
    if (prod) {
      res.json(prod)
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body })
    await newProduct.save()
    res.json(messages.requestSuccess.confirm)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.put('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id)
    if (prod) {
      await Product.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
      const newProd = await Product.findById(req.params.id)
      res.json(messages.requestSuccess.describe({ method: 'updated', newProd }))
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id)
    if (prod) {
      await prod.remove()
      res.json(messages.requestSuccess.describe({ method: 'deleted', prod }))
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

module.exports = router
