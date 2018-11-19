import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Checks if given date is in between two dates.
 *
 * @param {}
 * @returns {Booleab}
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value): boolean => {

  },
  message: ''
}

RuleContainer.add('dateBetween', rule)
export default rule
