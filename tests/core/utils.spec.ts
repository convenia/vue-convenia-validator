import * as utils from '../../src/utils'
import '../../src/rules'

describe('Core utils', () => {
  test('Function helper: is', () => {
    expect(utils.is('text', 'String')).toBe(true)
    expect(utils.is(10, 'Number')).toBe(true)
    expect(utils.is([], 'Array')).toBe(true)
    expect(utils.is({ }, 'Object')).toBe(true)
    expect(utils.is(() => ({}), 'Function')).toBe(true)
  })

  test('Function helper: isFormScope', () => {
    const validScope =
      { fieldOne: 'required'
      , fieldTwo: 'numeric'
      , fieldThree: 'alphanumeric'
      }

    const invalidScope =
      { fieldOne: 'required'
      , fieldTwo: 'numeric'
      , required: true
      }

    expect(utils.isFormScope(validScope)).toBe(true)
    expect(utils.isFormScope(invalidScope)).toBe(false)
  })
})
