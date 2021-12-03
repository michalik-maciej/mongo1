const Department = require('../models/department.model')
const { answerError, messages } = require('../utils')

exports.getDeptAll = async function getDeptAll(req, res) {
  try {
    res.json(await Department.find())
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.getDeptRandom = async function getDeptRandom(req, res) {
  try {
    const randomDept = await Department.aggregate([{ $sample: { size: 1 } }])
    res.json(randomDept)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.getDeptById = async function getDeptById(req, res) {
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
}

exports.postDept = async function postDept(req, res) {
  try {
    const newDepartment = new Department({ ...req.body })
    await newDepartment.save()
    res.json(messages.requestSuccess.confirm)
  }
  catch (err) {
    res.status(500).json(messages.error(err))
  }
}

exports.putDept = async function putDept(req, res) {
  try {
    const dept = await Department.findById(req.params.id)
    if (dept) {
      await Department.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
      const newDept = await Department.findById(req.params.id)
      res.json(messages.requestSuccess.describe({ method: 'updated', newDept }))
    }
    else {
      res.status(404).json(messages.notFound)
    }
  }
  catch (err) {
    answerError(err, res)
  }
}

exports.deleteDept = async function deleteDept(req, res) {
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
}
