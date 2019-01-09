/**
 * Check value's constructor name.
 * @param {*} value
 * @param {String} constructor
 * @returns {Boolean}
 *
 * @author Vitor Luiz Cavalcanti (https://github.com/VitorLuizC)
 */

export const is = (value: any, constructor: string): boolean => {
  return Object.prototype.toString.call(value) === `[object ${constructor}]`
}

export default is
