import custom from '../../src/rules/custom'

describe('Rule: custom', () => {
  test('Custom single callback', () => {
    const callbackOne = (v: number) => v > 0
    const callbackTwo = (v: string) => !!v.length

    expect(custom.validate(10, callbackOne)).toBe(true);
    expect(custom.validate('foo', callbackTwo)).toBe(true);
    expect(custom.validate('', callbackTwo)).toBe(false);
  })

  test('Multiple callbacks', () => {
    const callbacks =
      [ (v: string) => v.length > 5
      , (v: string) => /^\D+$/.test(v)
      ]

    expect(custom.validate('Biscoito', ...callbacks)).toBe(true);
    expect(custom.validate('FooBarr34', ...callbacks)).toBe(false);
    expect(custom.validate('Foo', ...callbacks)).toBe(false);
  })
})
