import RuleContainer from '../core/ruleContainer'

const rule = {
  validate: (value: any) => {
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