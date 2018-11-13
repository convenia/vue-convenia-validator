import RuleContainer from '../core/ruleContainer'

const rule = {
  validate: (value: any) => {
    console.log('date_format')
    return true
  },
  message: ''
}

RuleContainer.add('date_format', rule)
export default rule