import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

/**
 * Executes a callback or an array of callbacks with `value` as an argument
 * and returns true if every callback passes
 *
 * @param {Any} value - the input value to be validated.
 * @param {Function | Array<Function>} - The callback or array of callbacks
 * to be called on the value.
 * @returns {boolean} - Returns true if every callback passes, false otherwise.
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */

const rule: ValidationRule = {
  validate: (value: any, callbacks: Function | Function[]): boolean => {
    return Array.isArray(callbacks)
      ? callbacks.every(f => f(value))
      : callbacks(value)
  },
  message: 'Campo inválido'
}

RuleContainer.add('custom', rule)
export default rule
