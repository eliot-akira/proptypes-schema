/**
 * Performs validation on the a set of properties.
 *
 * @param {Object|Function} propTypes
 *        An object containing the property-type definitions (schema) or a
 *        single PropType.
 *
 * @param {Object} props
 *        An object of properties to validate or a single value of a single
 *        <propTypes> definiiton was passed.
 *
 * @param {String} [displayName]
 *        The name of the component or module being validated.
 *
 *        Used in formatting the error message(s).
 *
 * @return {Object} result
 *         The validation results. Looks something like this:
 *
 *         {
 *           isValid: Boolean,
 *           errors: Object.<String, String>?
 *         }
 */

const validate = (propTypes, props, displayName) => {

  const result = { isValid: true }

  if (typeof propTypes === 'function') {
    propTypes = { value: propTypes }
    props = { value: props }
  }

  Object.keys(propTypes).forEach(key => {
    const validator = propTypes[key]
    const error = validator(props, key, displayName, 'prop', key)

    if (error !== null) {
      result.isValid = false
      result.errors = result.errors || {}
      result.errors[key] = error
    }
  })

  return result
}

export default validate