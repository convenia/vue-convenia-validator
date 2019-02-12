import maxLength from '../../src/rules/maxLength'

describe('Rule: maxLength', () => {
  test('String values', () => {
    expect(maxLength.validate('abc', 5)).toBe(true)
    expect(maxLength.validate('10', 5)).toBe(true)
    expect(maxLength.validate('12345', 5)).toBe(true)
    expect(maxLength.validate('123456', 5)).toBe(false)

    expect(maxLength.validate('', 5)).toBe(true)
    expect(maxLength.validate('', 0)).toBe(true)
  })

  test('Array values', () => {
    expect(maxLength.validate(['1', '2', '3'], 5)).toBe(true)
    expect(maxLength.validate(['10'], 5)).toBe(true)
    expect(maxLength.validate(['1', '2', '3', '4', '5'], 5)).toBe(true)
    expect(maxLength.validate(['1', '2', '3', '4', '5', '6'], 5)).toBe(false)

    expect(maxLength.validate([], 5)).toBe(true)
    expect(maxLength.validate([], 0)).toBe(true)
  })

  test('Numeric values', () => {
    expect(maxLength.validate(3, 5)).toBe(true)
    expect(maxLength.validate('10', 5)).toBe(true)
    expect(maxLength.validate(5, 5)).toBe(true)
    expect(maxLength.validate(6, 5)).toBe(false)

    expect(maxLength.validate(0, 5)).toBe(true)
    expect(maxLength.validate(0, 0)).toBe(true)
  })
})