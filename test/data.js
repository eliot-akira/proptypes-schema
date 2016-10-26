import Schema from 'Schema'

const PropTypes = Schema.PropTypes

export const reactPropTypes = [
  'any',
  'array',
  'arrayOf',
  'bool',
  'boolOrString',
  'element',
  'func',
  'instanceOf',
  'node',
  'number',
  'numberOrString',
  'object',
  'objectOf',
  'oneOf',
  'oneOfType',
  'shape',
  'string',
  'symbol'
]

const REACT_ELEMENT_TYPE =
  (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||
  0xeac7

export const testSchema = {
  any: PropTypes.any.isRequired,
  array: PropTypes.array.isRequired,
  arrayOf: PropTypes.arrayOf(PropTypes.number).isRequired,
  bool: PropTypes.bool.isRequired,
  boolOrString: PropTypes.boolOrString.isRequired,
  element: PropTypes.element.isRequired,
  func: PropTypes.func.isRequired,
  instanceOf: PropTypes.instanceOf(Schema).isRequired,
  node: PropTypes.node.isRequired,
  number: PropTypes.number.isRequired,
  numberOrString: PropTypes.numberOrString.isRequired,
  object: PropTypes.object.isRequired,
  objectOf: PropTypes.objectOf(PropTypes.string).isRequired,
  oneOf: PropTypes.oneOf(['test', 'test2']).isRequired,
  oneOfType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  shape: PropTypes.shape({ color: PropTypes.string, fontSize: PropTypes.number }).isRequired,
  string: PropTypes.string.isRequired,
  symbol: PropTypes.symbol.isRequired,
}

export const validData = {
  any: '',
  array: [],
  arrayOf: [1, 2, 3],
  bool: true,
  boolOrString: true,
  element: { $$typeof: REACT_ELEMENT_TYPE },
  func: () => {},
  instanceOf: new Schema(),
  node: 0,
  number: 0,
  numberOrString: 0,
  object: {},
  objectOf: { key: 'value' },
  oneOf: 'test',
  oneOfType: '',
  shape: { color: '', fontSize: 0 },
  string: '',
  symbol: Symbol(),
}

export const invalidData = {
  array: null,
  arrayOf: null,
  bool: null,
  boolOrString: [],
  element: null,
  func: null,
  instanceOf: null,
  node: null,
  number: null,
  numberOrString: [],
  object: null,
  objectOf: null,
  oneOf: null,
  oneOfType: null,
  shape: null,
  string: false,
  symbol: null,
}
