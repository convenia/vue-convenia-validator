import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'
import { is } from '../utils'

/**
 * Receives a value and a regular expression and returns the result of
 * executing the regex on the value.
 *
 * @param {String} value - Input value.
 * @param {Regex} regex - Regular expression object.
 * @returns {boolean}
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string, regex: RegExp): boolean => {
    if (!value) return true

    if (!is(value, 'String') || !is(regex, 'RegExp')) return false

    return !!value && regex.test(value)
  },
  message: 'Formato inválido.'
}

RuleContainer.add('regex', rule)
export default rule
