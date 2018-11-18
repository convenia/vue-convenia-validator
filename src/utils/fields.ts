import RuleContainer from '../core/ruleContainer'
import is from './is'

/**
 * Test to see if an entity of the form `validations` object is an scope
 * and not a FormValidation object.
 *
 * @param {Any} formEntity - The entity to be tested.
 *
 * @author Erik Isidore
 * @version 0.1
 */

export const isFormScope = (formEntity: any): boolean => {
  if (!is(formEntity, 'Object')) return false

  return Object.keys(formEntity)
    .every(name => !RuleContainer.has(name))
}
