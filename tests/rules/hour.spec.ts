import hour from '../../src/rules/hour'

describe('Rule: Hour', () => {
  test('Empty value', () => {
    expect(hour.validate('')).toBe(true)
  })

  test('Invalid value', () => {
    expect(hour.validate('25:00')).toBe(false)
  })

  test('Non-empty value', () => {
    expect(hour.validate('00:00')).toBe(true)
    expect(hour.validate('12:30')).toBe(true)
    expect(hour.validate('23:59')).toBe(true)
  })
})
