import Schema from 'Schema'
import addPropType from 'addPropType'
import { expect } from 'chai'

describe('addPropType', () => {
  it('should add a new prop type validator to Schema', () => {
    const key = 'test'
    addPropType(key, (value, propName, schemaName) => {})
    expect(Schema.PropTypes[key]).to.be.a('function')
  })
})
