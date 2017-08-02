import { createChainableTypeChecker } from './prop-types-callable'
import { PropTypes, createIntrospectableChecker, defineFormatter } from './react-schema'

function createPropType(name, checker, withArg = false) {

  const PropType = createIntrospectableChecker(name, (...args) => {

    // React.PropTypes validate API
    const validate = (props = {}, key, schemaName, location, propFullname) => {

      // Simpler
      return checker(props[key], propFullname, schemaName, ...args)
    }

    const chainedCheckType = createChainableTypeChecker(validate)

    // Custom isRequired check
    chainedCheckType.always = (props = {}, key, ...args) => {
      if (props[key]==null) return validate(props, key, ...args)
      return chainedCheckType(props, key, ...args)
    }

    return chainedCheckType
  })

  const propTypeChecker = withArg ? PropType : PropType()

  // Assign checker properties, such as `errors`
  Object.keys(checker).forEach(prop => propTypeChecker[prop] = checker[prop])

  defineFormatter(name, () => name)

  return propTypeChecker
}

const createPropTypeAlways = (...args) => {
  return createPropType(...args).always
}

export { createPropTypeAlways as createPropType }

export function createPropTypeCreator(name, checker, ...args) {
  const validate = createPropType(name, checker, true, ...args)
  return (...propTypeArgs) => validate(...propTypeArgs, ...args).always
}


// Deprecate: mutates global

export default function addPropType(name, ...args) {
  PropTypes[name] = createPropType(name, ...args)
  return PropTypes[name]
}

export function addPropTypeCreator(name, checker, ...args) {
  return addPropType(name, checker, true, ...args)
}

