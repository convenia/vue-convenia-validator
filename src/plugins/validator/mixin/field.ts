import FormValidator from './index'

type NormalizedRule = { rule: string, args?: any }

export default class Field {
  private _vm: FormValidator

  public value: any
  public name: string
  public scope?: string
  public rules?: NormalizedRule[]
  public el: Element | HTMLInputElement

  private initialValue: string

  flags: Form.FieldFlags
  = { pristine: false
    , dirty: false
    , changed: false
    , touched: false
    , valid: false
    }

  constructor (options: Form.FieldItem) {
    this.el = options.el
    this._vm = options.vm
    this.name = options.name
    this.value = options.value
    this.scope = options.scope
    this.flags = this.createFlags()
    this.rules = this.mapRules(options.rules)
    this.initialValue = options.value

    this.init(options)
  }

  get validator (): any {
    if (!this._vm || !this._vm.$validator) return { validate: () => {} } 

    return this._vm.$validator
  }

  get watch (): any {
    if (!this._vm || !this._vm.$validator) return

    return this._vm.$watch.bind(this._vm)
  }

  // Rule example: "required|date_format:DD/MM/YYY|between:10,30"
  mapRules (rules: Form.ValidationRules): Array<NormalizedRule> {
    const stringToRules = (ruleDef: string) => ({
      rule: ruleDef.split(':')[0],
      args: ruleDef.split(':')[1] && ruleDef.split(':')[1].split(',')
    })

    const objToRules = (rulesObj: { [rule: string]: string }) => 
      Object.keys(rulesObj).map(ruleName => ({
        rule: ruleName,
        args: rulesObj[ruleName]
      }))

    return typeof rules === 'string'
      ? rules.split('|').map(stringToRules)
      : Array.isArray(rules) ? rules.map(stringToRules)
      : rules && rules.constructor === Object ? objToRules(rules)
      : []
  }

  init (options: Form.FieldItem): void {
    if (process.env.NODE_ENV !== 'production' && !this.name) {
      console.warn('A field declaration is missing a "name" attribute')
    }

    this.addActionListeners()
    this.addValueListeners()
  }

  // This method will initialize/reset the field flags.
  createFlags (): Form.FieldFlags {
    return {
      pristine: !this.value,
      dirty: !!this.value,
      touched: false,
      changed: false,
      valid: false
    }
  }

  // In order to properly validate the field value we
  // must be aware of whatever changes that happen to this
  // value, when a change happes, we execute the proper
  // validation method.
  addValueListeners (): void {
    if (!this.watch) return

    const listener = (value: any) => {
      console.log(`${this.name} value: `, value)

      this.value = value
      this.flags.changed = this.value !== this.initialValue
      this.flags.valid = this.validator.validate(this)
    }

    const fieldPath = this.scope ? `${this.scope}.${this.name}` : this.name
    this.watch(fieldPath, listener.bind(this))
  }

  // Add listeners mostly for the touched and dirty flags
  // these are only one-time listeners, meaning that they
  // will be removed after firing for the first time.
  addActionListeners (): void {
    if (!this.el) return

    const onBlur = () => { this.flags.touched = true }

    const onInput = () => {
      this.flags.dirty = true
      this.flags.pristine = false
    }

    this.el.addEventListener('focusout', onBlur.bind(this), { once: true })
    this.el.addEventListener('input', onInput.bind(this), { once: true })
  }
}
