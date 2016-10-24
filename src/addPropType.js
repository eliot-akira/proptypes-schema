import { PropTypes, createIntrospectableChecker, defineFormatter } from './react-schema'
import { createChainableTypeChecker } from './react-proptypes'

export default function addPropType(name, checker, withArg = false) {

  const PropType = createIntrospectableChecker(name, optionalArg => {
    return createChainableTypeChecker((props, key, schemaName, location, propFullname) => {
      return checker(props[key], propFullname, schemaName, optionalArg)
    })
  })

  PropTypes[name] = withArg ? PropType : PropType()

  // Assign checker properties, such as `errors`
  Object.keys(checker).forEach(prop => PropTypes[name][prop] = checker[prop])

  defineFormatter(name, () => name)

  return PropTypes[name]
}

export function addPropTypeCreator(...args) {
  return addPropType(...args, true)
}