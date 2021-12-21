const { expect } = require('chai')
const Department = require('../department.model')

describe('Department', () => {
  it('should throw an error if no `name` arg', () => {
    const dep = new Department({})
    dep.validate((err) => expect(err.errors.name).to.exist)
  })

  it('should throw an error if `name` is not a string', () => {
    const cases = [{}, []]
    cases.forEach((name) => {
      const dep = new Department({ name })
      dep.validate((err) => expect(err.errors.name).to.exist)
    })
  })

  it('should throw an error if `name` length is too short or too long', () => {
    const cases = ['four', 'tweeeeeeeeeeeeeentyTwo']
    cases.forEach((name) => {
      const dep = new Department({ name })
      dep.validate((err) => expect(err.errors.name).to.exist)
    })
  })

  it('should not throw an error if `name` is correct', () => {
    const dep = new Department({ name: 'Physics' })
    dep.validate((err) => expect(err).to.not.exist)
  })
})
