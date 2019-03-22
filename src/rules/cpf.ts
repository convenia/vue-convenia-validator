import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'
import { is } from '../utils'

const rule: ValidationRule = {
  validate: (value): boolean => {
    const isInvalid = (cpf: string, rest: number, pos: number): boolean =>
      rest !== parseInt(cpf.substring(pos, pos + 1))

    const getRest = (sum: number) => sum > 9 ? 0 : sum

    const sumDigit = (cpf: string, digit: number) =>
      11 - (cpf.substring(0, digit).split('')
        .reduce((acc, curr, index) => acc += parseInt(curr) * ((digit + 1) - index)
        , 0) % 11)

    if (!is(value, 'String')) return false

    value = value.replace(/[\D]/gi, '')

    if (!value.match(/^\d+$/)) return false

    if (value === '00000000000' || value.length !== 11) return false

    if (isInvalid(value, getRest(sumDigit(value, 9)), 9)) return false

    if (isInvalid(value, getRest(sumDigit(value, 10)), 10)) return false

    return true
  },
  message: 'CPF inválido.'
}

RuleContainer.add('cpf', rule)
export default rule