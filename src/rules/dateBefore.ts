import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * @param {String | Number} value -
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string | number): boolean => {
    return false
  },
  message: 'Data inválida.'
}

RuleContainer.add('dateBefore', rule)
export default rule
