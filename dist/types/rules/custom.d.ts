import { ValidationRule } from '../types';
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
declare const rule: ValidationRule;
export default rule;
