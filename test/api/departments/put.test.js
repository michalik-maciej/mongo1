/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../server')
const Department = require('../../../models/department.model')

chai.use(chaiHttp)

const { expect, request } = chai

describe('PUT /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' })
    await testDepOne.save()
  })

  it('should update chosen document and return success', async () => {
    const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: 'Department #10' })
    const updatedDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' })
    expect(res.status).to.be.equal(200)
    expect(res.body).to.not.be.null
    expect(updatedDepartment.name).to.be.equal('Department #10')
  })

  after(async () => {
    await Department.deleteMany()
  })
})
