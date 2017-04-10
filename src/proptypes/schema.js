import Schema from '../Schema'
import {
  PropTypes, createIntrospectableChecker,
  defineFormatter, shapeToObject
} from '../react-schema'

PropTypes.schema = createIntrospectableChecker('schema', schema =>
  PropTypes.shape( Schema.toShape(schema) )
)

defineFormatter('schema', schema => {
  let output = shapeToObject( Schema.toShape(schema) )
  output = JSON.stringify(output).replace(/\"/g, '')
  return `${ Schema.isSchema(schema) ? schema.name : 'shape' }(${ output })`
})
