import ReactPropTypes from '../react-proptypes'
import clone from './utils/clone'
import createIntrospectableChecker from './utils/createIntrospectableChecker'

const PropTypes = clone(ReactPropTypes)
const introspectableTypes = ['shape', 'arrayOf', 'oneOf', 'oneOfType']

introspectableTypes.forEach(type => {
  PropTypes[type] = createIntrospectableChecker(type, ReactPropTypes[type])
})

/**
 * Common combinations of types.
 */
PropTypes.numberOrString = PropTypes.oneOfType([
  ReactPropTypes.number,
  ReactPropTypes.string,
])

PropTypes.boolOrString = PropTypes.oneOfType([
  ReactPropTypes.bool,
  ReactPropTypes.string,
])

export default PropTypes