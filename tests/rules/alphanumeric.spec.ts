import alphanumeric from '../../src/rules/alphanumeric'

describe('Rule: alphanumeric', () => {
  test('Letters and numbers', () => {
    expect(alphanumeric.validate('AAAbbbb 123')).toBe(true);
    expect(alphanumeric.validate('AB')).toBe(true);
    expect(alphanumeric.validate(' AB ')).toBe(true);
    expect(alphanumeric.validate(' AB')).toBe(true);
    expect(alphanumeric.validate(' 123 B C ')).toBe(true);
  })

  test('Letters, numbers, and invalid characters', () => {
    expect(alphanumeric.validate('/// AAs 23')).toBe(false);
    expect(alphanumeric.validate('   ')).toBe(false);
    expect(alphanumeric.validate('_')).toBe(false);
    expect(alphanumeric.validate('123_')).toBe(false);
  })
})
