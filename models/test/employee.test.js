const { expect } = require('chai')
const mongoose = require('mongoose')
const Employee = require('../employee.model')

describe('Employee', () => {
  it('should throw an error if missing one of required args', () => {
    const emp = new Employee({})
    emp.validate((err) => expect(err.errors).to.have.all.keys('firstName', 'lastName', 'department'))
  })
  it('should throw an error if `firstName` is not a string', () => {
    const cases = [{}, []]
    cases.forEach((firstName) => {
      const emp = new Employee({ firstName })
      emp.validate((err) => expect(err.errors.firstName).to.exist)
    })
  })
  it('should throw an error if `lastName` is not a string', () => {
    const cases = [{}, []]
    cases.forEach((lastName) => {
      const emp = new Employee({ lastName })
      emp.validate((err) => expect(err.errors.lastName).to.exist)
    })
  })
  it('should throw an error if `department` is not an ObjectId', () => {
    const cases = ['IT', {}, []]
    cases.forEach((department) => {
      const emp = new Employee({ firstName: 'John', lastName: 'Smith', department })
      emp.validate((err) => expect(err.errors.department).to.exist)
    })
  })
  it('should not throw an error if data is correct', () => {
    const emp = new Employee({ firstName: 'John', lastName: 'Smith', department: new mongoose.Types.ObjectId() })
    emp.validate((err) => expect(err).not.to.exist)
  })
})

after(() => {
  mongoose.models = {}
})
