import Schema from './Schema'
import './proptypes/schema'
import './proptypes/email'

const { format, validate, PropTypes } = Schema

export { Schema as default }
export { format, validate, PropTypes }
export { default as addPropType, addPropTypeCreator } from './addPropType'