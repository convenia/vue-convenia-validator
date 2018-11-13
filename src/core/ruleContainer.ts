import { ValidationRule } from '../types'


const RULES: { [ruleName: string]: ValidationRule } = {}

export default class RuleContainer {
  static get rules (): { [ruleName: string]: ValidationRule } {
    return RULES
  }

  static getRule (ruleName: string): ValidationRule {
    return RULES[ruleName]
  }

  static add (ruleName: string, rule: ValidationRule) {
    RULES[ruleName] = rule
  }

  static remove(ruleName: string) {
    delete RULES[ruleName]
  }

  static has (ruleName: string) {
    return !!RULES[ruleName]
  }
}