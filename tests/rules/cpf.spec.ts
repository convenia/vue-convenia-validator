import cpf from '../../src/rules/cpf'

describe('Rule: CPF', () => {
  test('Valid CPF numbers with/without mask', () => {
    expect(cpf.validate('296.878.010-77')).toBe(true)
    expect(cpf.validate('529.536.610-34')).toBe(true)
    expect(cpf.validate('06091394010')).toBe(true)
    expect(cpf.validate('884.462.650-01')).toBe(true)
  })

  test('Invalid CPF numbers with/without mask', () => {
    expect(cpf.validate('294.878.910-17')).toBe(false)
    expect(cpf.validate('27722398983')).toBe(false)
    expect(cpf.validate('06291894910')).toBe(false)
    expect(cpf.validate('884.462.650-0s')).toBe(false)
    expect(cpf.validate('111.111.111-11')).toBe(false)
    expect(cpf.validate('999.999.999-99')).toBe(false)
  })
})
