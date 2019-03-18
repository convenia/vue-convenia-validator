import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'
import { is } from '../utils'

import dayjs from 'dayjs-ext'
import customParseFormat from 'dayjs-ext/plugin/customParseFormat'

dayjs.extend(customParseFormat)


/**
 * Validate if the input value produces a valid date and optionally if
 * it follows a given date format.
 *
 * @param {String | Number} value - The value of the input to be validated,
 * if `value` is a String, the validator may also receive a format param to
 * check if the string has the correct format.
 * @param {String} format? - Optional parameter to validate whether the the
 * given input value has the correct format. If given, the value must be a
 * string, otherwise this parameter is completely ignored.
 * @returns {boolean} True if the given value is valid or empty, false otherwise.
 * If you want to check for empty value, use the 'required' rule.
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string | number, format: string = 'DD/MM/YYYY'): boolean => {
    if (!value) return true

    const options = is(value, 'String') ? { format } : { }
    const date = dayjs(value, <any>options)

    return date.isValid()
  },
  message: 'Data inválida.'
}

RuleContainer.add('dateFormat', rule)
export default rule
