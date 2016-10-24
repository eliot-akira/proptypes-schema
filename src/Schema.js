import { PropTypes, validate, format } from './react-schema'

export default class Schema {

  static PropTypes = PropTypes
  static defaultName = 'Schema'

  static isSchema(schema) {
    return schema.__isSchema
  }

  static toShape(schema) {
    return Schema.isSchema(schema) ? schema.shape : schema
  }

  static getName(schema) {
    return Schema.isSchema(schema) ? schema.name : Schema.defaultName
  }

  static validate = (schema, data) => {

    const name = Schema.getName(schema)
    const result = validate(Schema.toShape(schema), data, name)

    if (!result.isValid) return result.errors
  }

  static format = schema => {

    const shape = Schema.toShape(schema)

    return Object.keys(shape)
      .reduce((result, key) => {
        result[key] = format(shape[key])
        return result
      }, {})
  }

  constructor(name, shape) {
    if (name instanceof Function) {
      shape = name
      name = Schema.getName()
    }
    this.__isSchema = true
    this.name = name
    this.shape = (shape instanceof Function) ? shape(PropTypes) : shape
  }

  validate(data, name) {
    return Schema.validate(this.shape, data, name || this.name)
  }

  format() {
    return Schema.format(this.shape)
  }
}