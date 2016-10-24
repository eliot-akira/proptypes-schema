import PropTypes from './PropTypes'
import getTypeName from './utils/getTypeName'

const formatters = {}


export const defineFormatter = (typeName, formatter) => (formatters[typeName] = formatter)

export const format = (checker) => {
  const typeName = getTypeName(checker)
  const formatter = formatters[typeName]

  let result = typeName

  if (formatter && checker && checker.$meta) {
    result = formatter(checker.$meta.args)
  }

  if (PropTypes[typeName] && PropTypes[typeName].isRequired===checker) {
    return `${result}.isRequired`
  }
  return result
}


export const shapeToObject = (obj) => {
  const result = {}
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (typeof value === 'function') {
      result[key] = format(value) || 'unknown'
    } else if (value && typeof value === 'object') {
      result[key] = shapeToObject(value) // <== RECURSION.
    }
  })
  return result
}



defineFormatter('shape', shape => {
  let output = shapeToObject(shape)
  output = JSON.stringify(output).replace(/\"/g, '')
  return `shape(${ output })`
  //return shapeToObject(shape)
})

defineFormatter('oneOfType', types => {
  const typeNames = types.map(format).join(', ')
  return `oneOfType(${ typeNames })`
  //return types.map(format)
})

defineFormatter('oneOf', enumValues => {
  return `oneOf(${ enumValues.join(', ') })`
  //return enumValues
})
