import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Uses a regex defined to validate hour
 *
 * ex: https://repl.it/@viniazvd/isValidHour
 *
 * @param {String} value
 * @return {Boolean}
 *
 * @author viniazvd
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    if (!value) return true

    const regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/

    return regex.test(value)
  },
  message: 'Data inválida'
}

RuleContainer.add('hour', rule)
export default rule
