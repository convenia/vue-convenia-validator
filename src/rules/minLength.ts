import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

type ValueType = Array<any> | string | number

/**
 * Checks to see if a given value is bigger than min length, if value
 * is string/array, checks the string length, if it is a number,
 * checks the value itself.
 *
 * @param {Array<any> | String | Number} value - Then given value
 * @param {Number | String} minLength - the min length.
 * @returns {Boolean} - False if value is smaller than min length.
 *
 * @author Erik Isidore
 * @version 0.1
 */
const rule: ValidationRule = {
  validate: (value: ValueType, minLength: number | string): boolean => {
    if (!value) return true

    if (Array.isArray(value) || typeof value === 'string')
      return (value || []).length >= minLength

    return value >= minLength
  },
  message: 'Valor abaixo do limite.'
}

RuleContainer.add('minLength', rule)
export default rule