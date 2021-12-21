/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const Employee = require('../employee.model')

describe('Employee', () => {
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
      const testEmplOne = new Employee({ firstName: 'John', lastName: 'Smith', department: new mongoose.Types.ObjectId() })
      await testEmplOne.save()

      const testEmplTwo = new Employee({ firstName: 'Lara', lastName: 'Croft', department: new mongoose.Types.ObjectId() })
      await testEmplTwo.save()
    })

    it('should return all the data with find method', async () => {
      const employees = await Employee.find()
      const expectedLength = 2
      expect(employees.length).to.be.equal(expectedLength)
    })

    it('should find a proper document by various params with `findOne` method', async () => {
      const employee = {
        findByFirstName: await Employee.findOne({ firstName: 'Lara' }),
        findByLastName: await Employee.findOne({ lastName: 'Croft' }),
      }
      const expected = {
        firstName: 'Lara',
        lastName: 'Croft',
      }
      expect(employee.findByFirstName.firstName).to.be.equal(expected.firstName)
      expect(employee.findByLastName.lastName).to.be.equal(expected.lastName)
      expect(employee.findByFirstName).to.deep.equal(employee.findByLastName)
    })
    after(async () => {
      await Employee.deleteMany()
    })
  })

  describe('Creating data', () => {
    it('should insert new document with `insertOne` method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Smith', department: new mongoose.Types.ObjectId() })
      await employee.save()
      expect(employee.isNew).to.be.false
    })
    after(async () => {
      await Employee.deleteMany()
    })
  })

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmplOne = new Employee({ firstName: 'John', lastName: 'Smith', department: new mongoose.Types.ObjectId() })
      await testEmplOne.save()

      const testEmplTwo = new Employee({ firstName: 'Lara', lastName: 'Croft', department: new mongoose.Types.ObjectId() })
      await testEmplTwo.save()
    })

    it('should properly update one document with `updateOne` method', async () => {
      await Employee.updateOne({ lastName: 'Smith' }, { $set: { firstName: 'Liv' } })
      const updatedEmployee = await Employee.findOne({ firstName: 'Liv' })
      expect(updatedEmployee).to.not.be.null
    })

    it('should properly update one document with `save` method', async () => {
      const employee = await Employee.findOne({ lastName: 'Croft' })
      employee.lastName = 'Buterin'
      await employee.save()

      const updatedEmployee = await Employee.findOne({ lastName: 'Buterin' })
      expect(updatedEmployee.name).to.not.be.null
    })

    it('should properly update multiple documents with `updateMany` method', async () => {
      const updatedEmployees = await Employee.updateMany({}, { $set: { lastName: 'Hoskinson' } })
      const expectedEmployeesNumber = 2
      expect(updatedEmployees.nModified).to.be.equal(expectedEmployeesNumber)
    })
    afterEach(async () => {
      await Employee.deleteMany()
    })
  })

  describe('Deleting data', () => {
    beforeEach(async () => {
      const testEmplOne = new Employee({ firstName: 'John', lastName: 'Smith', department: new mongoose.Types.ObjectId() })
      await testEmplOne.save()

      const testEmplTwo = new Employee({ firstName: 'Lara', lastName: 'Croft', department: new mongoose.Types.ObjectId() })
      await testEmplTwo.save()
    })

    it('should properly remove one document with `deleteOne` method', async () => {
      await Employee.deleteOne({ firstName: 'John' })
      const deletedEmployee = await Employee.findOne({ firstName: 'John' })
      expect(deletedEmployee).to.be.null
    })

    it('should properly remove one document with `remove` method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' })
      await employee.remove()
      const deletedEmployee = await Employee.findOne({ firstName: 'John' })
      expect(deletedEmployee).to.be.null
    })

    it('should properly remove multiple documents with `deleteMany` method', async () => {
      const employees = await Employee.deleteMany()
      const expectedDeletedCount = 2
      expect(employees.deletedCount).to.be.equal(expectedDeletedCount)
    })

    afterEach(async () => {
      await Employee.deleteMany()
    })
  })
})
