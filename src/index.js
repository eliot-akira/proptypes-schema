import Schema from './Schema'
import './proptypes/schema'

const { PropTypes, PropTypeError, validate, format } = Schema

export { Schema as default }
export { PropTypes, PropTypeError, validate, format }
export { default as addPropType, addPropTypeCreator } from './addPropType'