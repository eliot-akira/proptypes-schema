import Schema from './Schema'

const { PropTypes, PropTypeError, validate, format } = Schema

export {
  Schema as default,
  PropTypes, PropTypeError, validate, format
}

export {
  default as addPropType, addPropTypeCreator,
  createPropType, createPropTypeCreator
} from './addPropType'
