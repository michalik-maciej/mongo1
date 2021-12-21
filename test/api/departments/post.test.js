/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../server')
const Department = require('../../../models/department.model')
const { messages } = require('../../../utils')

chai.use(chaiHttp)

const { expect, request } = chai

describe('POST /api/departments', () => {
  it('should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/departments').send({ name: 'Production' })
    const newDepartment = await Department.findOne({ name: 'Production' })
    expect(res.status).to.be.equal(200)
    expect(res.body).to.deep.equal(messages.requestSuccess.confirm)
    expect(newDepartment).to.not.be.null
  })

  after(async () => {
    await Department.deleteMany()
  })
})
