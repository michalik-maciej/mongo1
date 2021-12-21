/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../server')
const Department = require('../../../models/department.model')
const { messages } = require('../../../utils')

chai.use(chaiHttp)

const { expect, request } = chai

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' })
    await testDepOne.save()
  })

  it('should remove chosen document from db and return success', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408')
    const deletedDepartment = await Department.findById({ _id: '5d9f1140f10a81216cfd4408' })
    expect(res.status).to.be.equal(200)
    expect(res.body).to.not.be.null
    expect(deletedDepartment).to.not.exist
  })
})
