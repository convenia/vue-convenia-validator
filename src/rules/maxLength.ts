import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

type ValueType = Array<any> | string | number

/**
 * Checks to see if a given value is bigger than max length, if value
 * is string/array, checks the string length, if it is a number,
 * checks the value itself.
 *
 * @param {Array<any> | String | Number} value - Then given value
 * @param {Number | String} maxLength - the max length.
 * @returns {Boolean} - False if value exceeds max length.
 *
 * @author Erik Isidore
 * @version 0.1
 */
const rule: ValidationRule = {
  validate: (value: ValueType, maxLength: number | string): boolean => {
    if (typeof value !== 'number' && !value) return true

    if (Array.isArray(value) || typeof value === 'string')
      return (value || []).length <= maxLength

    return maxLength >= value
  },
  message: 'Valor acima do limite.'
}

RuleContainer.add('maxLength', rule)
export default rule