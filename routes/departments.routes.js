const express = require('express')

const router = express.Router()
const { answerError, messages } = require('../utils')
const Department = require('../models/department.model')

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find())
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.get('/departments/random', async (req, res) => {
  try {
    const randomDept = await Department.aggregate([{ $sample: { size: 1 } }])
    res.json(randomDept[0])
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.get('/departments/:id', async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id)
    if (dept) {
      res.json(dept)
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

router.post('/departments', async (req, res) => {
  try {
    const newDepartment = new Department({ ...req.body })
    await newDepartment.save()
    res.json(messages.requestSuccess.confirm)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body
  try {
    const dept = await Department.findById(req.params.id)
    if (dept) {
      dept.name = name
      await dept.save()
      res.json(messages.requestSuccess.describe({ method: 'updated', dept }))
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

router.delete('/departments/:id', async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id)
    if (dept) {
      await dept.remove()
      res.json(messages.requestSuccess.describe({ method: 'deleted', dept }))
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
