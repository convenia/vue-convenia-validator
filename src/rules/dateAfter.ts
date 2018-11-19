import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

import dayjs from 'dayjs-ext'
import customParseFormat from 'dayjs-ext/plugin/customParseFormat'

dayjs.extend(customParseFormat)


/**
 * Checks if given input date comes after another date.
 *
 * @param
 * @returns {Boolean}
 *
 * @author Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string | number, date: string | number, format: string = 'DD/MM/YYYY'): boolean => {
    const date = dayjs(value)

    return
  },
  message: 'Data inválida.'
}

RuleContainer.add('dateAfter', rule)
export default rule
