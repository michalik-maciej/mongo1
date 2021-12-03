const express = require('express')

const router = express.Router()
const {
  getDeptAll,
  getDeptRandom,
  getDeptById,
  postDept,
  putDept,
  deleteDept,
} = require('../controllers/departments.controller')

router.get('/departments', (req, res) => getDeptAll(req, res))
router.get('/departments/random', (req, res) => getDeptRandom(req, res))
router.get('/departments/:id', (req, res) => getDeptById(req, res))
router.post('/departments', (req, res) => postDept(req, res))
router.put('/departments/:id', (req, res) => putDept(req, res))
router.delete('/departments/:id', (req, res) => deleteDept(req, res))

module.exports = router
