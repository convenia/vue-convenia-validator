import email from '../../src/rules/email'

describe('Rule: email', () => {
  test('Valid e-mails', () => {
    expect(email.validate('kmohammed_san@salvatore1818.site')).toBe(true)
    expect(email.validate('dyoussef.thami.72@asiangangsta.site  ')).toBe(true)
    expect(email.validate('ericssonico@protonmail.ch')).toBe(true)
  })

  test('Invalid e-mails', () => {
    expect(email.validate('kmohammed_san')).toBe(false)
    expect(email.validate('@dyoussef.thami.72@asiangangsta.site  ')).toBe(false)
    expect(email.validate('ericssonico#protonmail.ch')).toBe(false)
    expect(email.validate('lapoly@protonmail')).toBe(false)
  })

})