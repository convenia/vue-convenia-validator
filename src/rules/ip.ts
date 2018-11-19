import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 *
 * @param {String} value - The string value to be validated.
 * @return {Boolean}
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    return false
  },
  message: 'Endereço IP inválido.'
}

RuleContainer.add('ip', rule)
export default rule
