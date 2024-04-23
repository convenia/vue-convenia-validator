import { ValidationRule } from '../types';
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
declare const rule: ValidationRule;
export default rule;
