import numeric from '../../src/rules/numeric'

describe('Rule: numeric', () => {
  test('Numeric values', () => {
    expect(numeric.validate(' 232 ')).toBe(true);
    expect(numeric.validate('1')).toBe(true);
    expect(numeric.validate('1.0')).toBe(true);
  })

  test('Non-numeric values', () => {
    expect(numeric.validate('A')).toBe(false);
    expect(numeric.validate('.')).toBe(false);
    expect(numeric.validate('23 A')).toBe(false);
  })
})
