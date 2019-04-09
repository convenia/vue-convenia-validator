import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Uses a regex defined by the RFC to validate email (http://emailregex.com/)
 *
 * @param {String} value - The input to be validated
 * @return {Boolean}
 *
 * @author Erik Isidore
 */

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    if (!value) return true

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test((value || '').trim())
  },
  message: 'E-mail inválido.'
}

RuleContainer.add('email', rule)
export default rule