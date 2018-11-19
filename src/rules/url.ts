import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Checks if a given string is a valid URL address.
 * RegEx from: https://stackoverflow.com/a/30970319
 *
 * @param {String} value - The string value to be validated.
 * @returns {Boolean}
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    const regex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i
    return regex.test(value.trim())
  },
  message: 'URL inválida.'
}

RuleContainer.add('url', rule)
export default rule
