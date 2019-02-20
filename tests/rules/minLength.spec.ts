import minLength from '../../src/rules/minLength'

describe('Rule: minLength', () => {
  test('String values', () => {
    expect(minLength.validate('abc', 5)).toBe(false)
    expect(minLength.validate('10', 5)).toBe(false)
    expect(minLength.validate('12345', 5)).toBe(true)
    expect(minLength.validate('123456', 5)).toBe(true)

    expect(minLength.validate('', 5)).toBe(false)
    expect(minLength.validate('', 0)).toBe(true)
  })

  test('Array values', () => {
    expect(minLength.validate(['1', '2', '3'], 5)).toBe(false)
    expect(minLength.validate(['10'], 5)).toBe(false)
    expect(minLength.validate(['1', '2', '3', '4', '5'], 5)).toBe(true)
    expect(minLength.validate(['1', '2', '3', '4', '5', '6'], 5)).toBe(true)

    expect(minLength.validate([], 5)).toBe(false)
    expect(minLength.validate([], 0)).toBe(true)
  })

  test('Numeric values', () => {
    expect(minLength.validate(3, 5)).toBe(false)
    expect(minLength.validate('10', 5)).toBe(false)
    expect(minLength.validate(5, 5)).toBe(true)
    expect(minLength.validate(6, 5)).toBe(true)

    expect(minLength.validate(0, 5)).toBe(false)
    expect(minLength.validate(0, 0)).toBe(true)
  })
})