import RuleContainer from '../core/ruleContainer'

/**
 * Validate if the given value is not empty
 *
 * @param {Any} value - The value of the input to be validated.
 *
 * @returns {boolean} True if the given value is not empty, false otherwise.
 *
 * @author Erik Isidore, Viniazvd
 * @version 0.1
 */

const rule = {
  validate: (value: any): boolean => {
    if (Array.isArray(value)) return !!value.length
    if (typeof value === 'object') return !!Object.keys(value).length
    if (typeof value === 'string') return !!value.trim().length
    if (typeof value === 'number') return !!value

    return !!value
  },
  message: 'Campo obrigatório.'
}

RuleContainer.add('required', rule)
export default rule