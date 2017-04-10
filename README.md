# PropTypes Schema

Generic object schema validation modeled on React PropTypes

#### Purpose

`React.PropTypes` offers a flexible way to define and validate component APIs. An existing library called [`react-schema`](https://github.com/philcockfield/react-schema) extends it for generic object validation, which allows for a wide range of use in a React application, including server-side. However, the React team recently announced deprecating the use of PropTypes validators in production ([source](https://facebook.github.io/react/warnings/dont-call-proptypes.html)).

This library was created as a stand-alone implementation with no dependency on React. It includes forks of `React.PropTypes` and `react-schema`, plus a little sugar for my own taste.

## Example

```js
import { PropTypes, validate } from 'proptypes-schema'

const personSchema = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
}

const data = {
  name: 'John'
}

const errors = validate(personSchema, data) // returns { age: Error }
```


## Define schema

A schema is defined as a plain object with PropTypes as values.

#### Available types

All `PropTypes` validators from React are supported.

- any, array, arrayOf, bool, boolOrString, element, func, instanceOf, node, number, numberOrString, object, objectOf, oneOf, oneOfType, shape, string, symbol

Please refer to their documentation ([Typechecking With PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)) for details of use.

#### Nested schema objects

A plain object schema can be nested using `PropTypes.shape`.

```js
const addressSchema = {
  city: PropTypes.string,
  country: PropTypes.string.isRequired,
}

const personSchema = {
  ...
  address: PropTypes.shape(addressSchema).isRequired
}
```


## Validate

The `validate` method checks each property of a given object against the schema.

**Schema.validate( schema, data )**

```js
import { validate } from 'proptypes-schema'

const errors = validate(personSchema, data)
```

It returns nothing if everything is valid; otherwise, it returns an object of keys and their errors.

```js
{
  address: instanceof Error
}
```


## Format

The `format` method creates a human-readable object from a given schema definition.

**Schema.format( schema )**

```js
import { format } from 'proptypes-schema'

format(personSchema)
```

Example result:

```js
{
  name: 'string.isRequired',
  age: 'number',
  role: 'oneOf(admin, user)'
}
```


## Custom validators

Use `addPropType` to define custom validators.

**addPropType( name, function )**

```js
import { addPropType } from 'proptypes-schema'

addPropType('notEmpty', (value, propName, schemaName) => {
  if (!value) {
    return `'${propName}' is empty for '${schemaName}'.`
  }
})
```

Note that the validator function receives the prop value as the first argument, instead of the whole props object as in `React.PropTypes`.

The validator is exposed as `PropTypes[name]`, and decorated with an optional `isRequired`.

```js
{
  key: PropTypes.notEmpty.isRequired
}
```

#### Errors

For a valid value, the validator must return nothing (`null` or `undefined`).

Anything else is considered an error, such as string, object, or an `Error` instance. This is passed to the errors object returning from `validate()`. It can be used, for example, to pass error codes.

Optionally, `PropTypeError` can be used in place of the native `Error` class, as a light-weight alternative that doesn't include a stack trace.


```js
import { PropTypeError } from 'proptypes-schema'

addPropType('notEmpty', (value, propName, schemaName) => {
  if (!value) {
    return new PropTypeError(`'${propName}' is empty for '${schemaName}'.`)
  }
})
```

#### Validator with argument

Use `addPropTypeCreator` for a validator that takes an argument.

```js
import { addPropTypeCreator } from 'proptypes-schema'

addPropTypeCreator('shallowEqual', (value, propName, schemaName, arg) => {
  if (value !== arg) {
    return `The value of '${propName}' is not equal to '${arg}' for '${schemaName}'.`
  }
})
```

Example use:

```js
{
  key: PropTypes.shallowEqual(something)
}
```


## Schema instance

Another way to create a schema is by instantiating the `Schema` class, with a name (optional) and definition object. The name is used in validation errors.


```js
import Schema from 'proptypes-schema'

const personSchema = new Schema('Person', { ... })
```

If you pass a function as the schema definition, it will be called with `PropTypes` as its argument. It can be used like so:

```js
const personSchema = new Schema('Person', ({ string, number, oneOf }) => ({
  name: string.isRequired,
  age: number,
  role: oneOf(['admin', 'user']).isRequired
}))
```

#### Instance methods

`validate` - validate given object and return any errors

```js
personSchema.validate(data)
```

`format` - return an object with schema definition as strings

```js
personSchema.format()
```

#### Nested schema instances

Use the provided `PropTypes.schema` to create nested schema instances.


```js
const addressSchema = new Schema('Address', { ... })

const personSchema = new Schema('Person', {
  address: PropTypes.schema(addressSchema).isRequired
})
```
