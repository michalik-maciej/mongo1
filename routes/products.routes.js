const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId
const { validateRequestId, messages } = require('../utils')

router.get('/products', (req, res) => {
  req.db
    .collection('products')
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.json({ message: data })
      }
    })
})

router.get('/products/random', (req, res) => {
  req.db
    .collection('products')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.json(data[0])
      }
    })
})

router.get('/products/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db.collection('products').findOne(
      {
        _id: ObjectId(req.params.id),
      },
      (err, data) => {
        if (err) {
          res.status(500).json({ message: err })
        } else if (!data) {
          res.status(404).json(messages.notFound)
        } else {
          res.json(data)
        }
      }
    )
  } else {
    res.status(404).json(messages.requestInvalid)
  }
})

router.post('/products', (req, res) => {
  req.db.collection('products').insertOne({ ...req.body }, (err) => {
    if (err) {
      res.status(500).json({ message: err })
    } else {
      res.json(messages.requestSuccess)
    }
  })
})

router.put('/products/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db
      .collection('products')
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { ...req.body } },
        (err, data) => {
          if (err) res.status(500).json({ message: err })
          else res.json(messages.requestSuccess)
        }
      )
  } else {
    res.status(404).json(messages.requestInvalid)
  }
})

router.delete('/products/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db
      .collection('products')
      .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
        if (err) res.status(500).json({ message: err })
        else res.json(messages.requestSuccess)
      })
  } else {
    res.status(404).json(messages.requestInvalid)
  }
})

module.exports = router
