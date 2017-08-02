import Schema from 'index'
import { expect } from 'chai'
import { reactPropTypes, testSchema, validData, invalidData } from './data'

const PropTypes = Schema.PropTypes

describe('Schema.PropTypes', () => {
  it('should provide all React.PropTypes validators', () => {
    expect(PropTypes).to.contain.all.keys(...reactPropTypes)
  })
})

describe('Schema.validate', () => {
  it('should return undefined for data with all valid keys', () => {
    const errors = Schema.validate(testSchema, validData)
    expect(errors).to.be.undefined
  })
  it('should return an errors object with all invalid keys', () => {
    const errors = Schema.validate(testSchema, invalidData)
    expect(Object.keys(errors)).to.have.lengthOf(Object.keys(testSchema).length)
  })
})
