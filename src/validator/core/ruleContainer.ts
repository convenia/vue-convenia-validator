import { ValidationRule } from '../types'


const RULES: { [ruleName: string]: ValidationRule } = {}

export default class RuleContainer {
  static get rules (): { [ruleName: string]: ValidationRule } {
    return RULES
  }

  /**
   * Get a specific rule from the container.
   *
   * @param  {String} ruleName - The name of the rule.
   * @returns {ValidationRule} - the respective ValidationRule object.
   */
  static getRule (ruleName: string): ValidationRule {
    return RULES[ruleName]
  }

  /**
   * Adds a new rule to the container.
   *
   * @param ruleName - The name of the rule to be added.
   * @param rule - The ValidationRule object.
   * @returns {Void}
   */
  static add (ruleName: string, rule: ValidationRule) {
    RULES[ruleName] = rule
  }

  /**
   * Removes a rule from the container.
   *
   * @param ruleName - The name of the rule to be removed.
   * @returns {Void}
   */
  static remove(ruleName: string) {
    delete RULES[ruleName]
  }

  /**
   * Checks if a rule exists in the container
   *
   * @param ruleName - The name of the rule.
   * @returns {Boolean}
   */
  static has (ruleName: string) {
    return !!RULES[ruleName]
  }
}
