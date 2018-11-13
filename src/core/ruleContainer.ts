const RULES: { [ruleName: string]: Form.ValidationRule } = {}

export default class RuleContainer {
  static get rules (): { [ruleName: string]: Form.ValidationRule } {
    return RULES
  }

  static getRule (ruleName: string): Form.ValidationRule {
    return RULES[ruleName]
  }

  static add (ruleName: string, rule: Form.ValidationRule) {
    RULES[ruleName] = rule
  }

  static remove(ruleName: string) {
    delete RULES[ruleName]
  }

  static has (ruleName: string) {
    return !!RULES[ruleName]
  }
}