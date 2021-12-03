const Product = require('../models/product.model')
const { answerError, messages } = require('../utils')

exports.getProdAll = async function getProdAll(req, res) {
  try {
    res.json(await Product.find().populate('department'))
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.getProdRandom = async function getProdRandom(req, res) {
  try {
    const randomProd = await Product.aggregate([{ $sample: { size: 1 } }])
    res.json(randomProd)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.getProdById = async function getProdById(req, res) {
  try {
    const prod = await Product.findById(req.params.id).populate('department')
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
}

exports.postProd = async function postProd(req, res) {
  try {
    const newProduct = new Product({ ...req.body })
    await newProduct.save()
    res.json(messages.requestSuccess.confirm)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.putProd = async function putProd(req, res) {
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
}

exports.deleteProd = async function deleteProd(req, res) {
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
}
