import RuleContainer from '../../src/core/ruleContainer'
import * as rules from '../../src/rules'

describe('RuleContainer class', () => {
  test('Rule existance check', () => {
    expect(RuleContainer.has('alphanumeric')).toBe(true)
    expect(RuleContainer.has('custom')).toBe(true)
    expect(RuleContainer.has('dateFormat')).toBe(true)
    expect(RuleContainer.has('numeric')).toBe(true)
    expect(RuleContainer.has('regex')).toBe(true)
    expect(RuleContainer.has('required')).toBe(true)

    expect(RuleContainer.has('BlaBlaBla')).toBe(false)
  })

  test('Individual rule getter', () => {
    const regexRule = RuleContainer.getRule('regex')

    expect(regexRule.validate).toBeInstanceOf(Function)
    expect(regexRule.message).toBe('Formato inválido.')
  })

  test('Rules getter', () => {
    const rules = RuleContainer.rules

    expect(rules).toBeInstanceOf(Object)
    expect(Object.keys(rules).length).toBe(9)
  })

  test('Rule removal', () => {
    RuleContainer.remove('regex')
    expect(RuleContainer.has('regex')).toBe(false)
  })

  test('Rule addition', () => {
    RuleContainer.add('regex', rules.regex)
    expect(RuleContainer.has('regex')).toBe(true)
  })
})