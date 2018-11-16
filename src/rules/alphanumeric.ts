import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Checks if all characters in a given value are alphanumeric (letters
 * and numbers), ignores whitespace.
 *
 * @param {String} value - the input value to be tested.
 * @returns {boolean}
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    return /^\s*([0-9a-zA-Z]*)\s*$/.test(value)
  },
  message: 'Deve conter apenas letras e números'
}

RuleContainer.add('alphanumeric', rule)
export default rule
