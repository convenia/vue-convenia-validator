import required from '../../src/rules/required'

describe('Rule: required', () => {
  test('Empty values', () => {
    expect(required.validate('')).toBe(false);
    expect(required.validate(' ')).toBe(false);
    expect(required.validate([])).toBe(false);
    expect(required.validate({ })).toBe(false);
  })

  test('Non-empty values', () => {
    expect(required.validate('asd')).toBe(true);
    expect(required.validate('  . ')).toBe(true);
    expect(required.validate(['one'])).toBe(true);
    expect(required.validate({ empty: false })).toBe(true);
    expect(required.validate(1)).toBe(true);
  })
})
