import pis from '../../src/rules/pis'

describe('Rule: PIS', () => {
  test('Valid PIS numbers with/without mask', () => {
    expect(pis.validate('877.23295.38-2')).toBe(true)
    expect(pis.validate('87723295382')).toBe(true)
    expect(pis.validate('268.52129.10-0')).toBe(true)
    expect(pis.validate('26852129100')).toBe(true)
  })

  test('Invalid PIS numbers with/without mask', () => {
    expect(pis.validate('877.94933.38-8')).toBe(false)
    expect(pis.validate('87723295383')).toBe(false)
    expect(pis.validate('268.52169.10-0')).toBe(false)
    expect(pis.validate('26834s9100')).toBe(false)
  })
})