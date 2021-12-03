const Employee = require('../models/employee.model')
const { answerError, messages } = require('../utils')

exports.getEmplAll = async function getEmplAll(req, res) {
  try {
    res.json(await Employee.find().populate('department'))
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.getEmplRandom = async function getEmplRandom(req, res) {
  try {
    const randomEmpl = await Employee.aggregate([{ $sample: { size: 1 } }])
    res.json(randomEmpl)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.getEmplById = async function getEmplById(req, res) {
  try {
    const empl = await Employee.findById(req.params.id).populate('department')
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
}

exports.postEmpl = async function postEmpl(req, res) {
  try {
    const newEmployee = new Employee({ ...req.body })
    await newEmployee.save()
    res.json(messages.requestSuccess.confirm)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.putEmpl = async function putEmpl(req, res) {
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
}

exports.deleteEmpl = async function deleteEmpl(req, res) {
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
}
