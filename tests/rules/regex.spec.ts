import regex from '../../src/rules/regex'

describe('Rule: regex', () => {
  test('Simple regex', () => {
    expect(regex.validate('2321', /^\d+$/)).toBe(true)
    expect(regex.validate('2A321', /^\d+$/)).toBe(false)
  })
})
