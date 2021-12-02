const express = require('express')

const router = express.Router()
const { answerError, messages } = require('../utils')
const Employee = require('../models/employee.model')

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find().populate('Department'))
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.get('/employees/random', async (req, res) => {
  try {
    const randomEmpl = await Employee.aggregate([{ $sample: { size: 1 } }])
    res.json(randomEmpl[0])
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.get('/employees/:id', async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id).populate('Department')
    if (empl) {
      res.json(empl)
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee({ ...req.body })
    await newEmployee.save()
    res.json(messages.requestSuccess.confirm)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
})

router.put('/employees/:id', async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id)
    if (empl) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
      const newEmpl = await Employee.findById(req.params.id)
      res.json(messages.requestSuccess.describe({ method: 'updated', newEmpl }))
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
})

router.delete('/employees/:id', async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id)
    if (empl) {
      await empl.remove()
      res.json(messages.requestSuccess.describe({ method: 'deleted', empl }))
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
