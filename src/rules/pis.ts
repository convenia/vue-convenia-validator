import RuleContainer from '../core/ruleContainer'
import { ValidationRule } from '../types'

const rule: ValidationRule = {
  validate: (value: string): boolean => {
    if (!value) return true

    const FTAP = '3298765432'
    const numPis = (value + '').replace(/[^\d]+/g, '')

    const total = FTAP
      .split('')
      .reduce((total, digit, index) => total + (+numPis[index] * +digit), 0)

    let rest: number | string = (total % 11)

    if (rest !== 0) rest = 11 - rest

    if (rest === 10 || rest === 11) rest = (rest + '').slice(1, 2)

    if (+rest !== +(numPis.slice(10,11))) return false

    return true
  },
  message: 'Número de PIS inválido'
}

RuleContainer.add('pis', rule)
export default rule