/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const Department = require('../department.model')

describe('Department', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true })
    }
    catch (err) {
      console.error(err)
    }
  })

  describe('Reading data', () => {
    before(async () => {
      const testDepOne = new Department({ name: 'Department #1' })
      await testDepOne.save()

      const testDepTwo = new Department({ name: 'Department #2' })
      await testDepTwo.save()
    })

    it('should return all the data with find method', async () => {
      const departments = await Department.find()
      const expectedLength = 2
      expect(departments.length).to.be.equal(expectedLength)
    })

    it('should find a proper document by `name` with `findOne` method', async () => {
      const department = await Department.findOne({ name: 'Department #2' })
      const expectedName = 'Department #2'
      expect(department.name).to.be.equal(expectedName)
    })
    after(async () => {
      await Department.deleteMany()
    })
  })

  describe('Creating data', () => {
    it('should insert new document with `insertOne` method', async () => {
      const department = new Department({ name: 'Department #2' })
      await department.save()
      expect(department.isNew).to.be.false
    })
    after(async () => {
      await Department.deleteMany()
    })
  })

  describe('Updating data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' })
      await testDepOne.save()

      const testDepTwo = new Department({ name: 'Department #2' })
      await testDepTwo.save()
    })

    it('should properly update one document with `updateOne` method', async () => {
      await Department.updateOne({ name: 'Department #1' }, { $set: { name: '=Department #1=' } })
      const updatedDepartment = await Department.findOne({ name: '=Department #1=' })
      expect(updatedDepartment).to.not.be.null
    })

    it('should properly update one document with `save` method', async () => {
      const department = await Department.findOne({ name: 'Department #1' })
      department.name = 'Department #10'
      await department.save()

      const updatedDepartment = await Department.findOne({ name: 'Department #10' })
      expect(updatedDepartment.name).to.not.be.null
    })

    it('should properly update multiple documents with `updateMany` method', async () => {
      const updatedDepartments = await Department.updateMany({}, { $set: { name: 'Department #0' } })
      const expectedDepartmentsNumber = 2
      expect(updatedDepartments.nModified).to.be.equal(expectedDepartmentsNumber)
    })
    afterEach(async () => {
      await Department.deleteMany()
    })
  })

  describe('Deleting data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' })
      await testDepOne.save()

      const testDepTwo = new Department({ name: 'Department #2' })
      await testDepTwo.save()
    })

    it('should properly remove one document with `deleteOne` method', async () => {
      await Department.deleteOne({ name: 'Department #2' })
      const deletedDepartment = await Department.findOne({ name: 'Department #2' })
      expect(deletedDepartment).to.be.null
    })

    it('should properly remove one document with `remove` method', async () => {
      const department = await Department.findOne({ name: 'Department #2' })
      await department.remove()
      const deletedDepartment = await Department.findOne({ name: 'Department #2' })
      expect(deletedDepartment).to.be.null
    })

    it('should properly remove multiple documents with `deleteMany` method', async () => {
      const departments = await Department.deleteMany()
      const expectedDeletedCount = 2
      expect(departments.deletedCount).to.be.equal(expectedDeletedCount)
    })

    afterEach(async () => {
      await Department.deleteMany()
    })
  })
})
