import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Checks if all characters in a given value are numeric, ignores whitespace.
 *
 * @param {String} value - The input value to be validated.
 * @returns {Boolean}
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    return /^\s*([0-9]*)\s*$/.test(value)
  },
  message: 'Deve conter apenas números.'
}

RuleContainer.add('numeric', rule)
export default rule
