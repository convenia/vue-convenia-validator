import FormValidator from '../index'

import {
  FieldItem,
  FieldFlags,
  NormalizedRule,
  ValidationRules
} from '../types'


export default class Field {
  private _vm: FormValidator
  private initialValue: string

  private _flags: FieldFlags = {
    pristine: false,
    dirty: false,
    changed: false,
    touched: false,
    valid: false,
    errors: []
  }

  public value: any
  public name: string
  public scope?: string
  public rules: NormalizedRule[]
  public el: Element | HTMLInputElement

  constructor (options: FieldItem) {
    this.el = options.el
    this._vm = options.vm
    this.name = options.name
    this.value = options.value
    this.scope = options.scope
    this.rules = this.mapRules(options.rules || '')
    this.initialValue = options.value

    this.init(options)
  }

  get validate (): any {
    if (!this._vm || !this._vm.$validator) return () => []

    return this._vm.$validator.validate.bind(this._vm.$validator)
  }

  get watch (): any {
    if (!this._vm || !this._vm.$validator) return

    return this._vm.$watch.bind(this._vm)
  }

  get flags () {
    return this._flags
  }

  get errors () {
    return this._flags.errors
  }

  get error () {
    return this._flags.errors[0] || ''
  }

  setFlag (flag: keyof FieldFlags, value: boolean | string[]) {
    if (!Object.keys(this._flags).includes(flag)) return

    this._flags[flag] = value
  }

  init (options: FieldItem): void {
    if (process.env.NODE_ENV !== 'production' && !this.name)
      console.warn('CeeValidate: A field declaration is missing a "name" attribute')

    this.initFlags()
    this.addValueListeners()
  }

  // This method will initialize/reset the field _flags.
  initFlags () {
    const flagNames = Object.keys(this._flags) as [keyof FieldFlags]
    const defaultFlags: FieldFlags = {
      pristine: !this.value,
      dirty: !!this.value,
      touched: false,
      changed: false,
      valid: false,
      errors: []
    }

    flagNames.forEach((flag: keyof FieldFlags) => {
      this._flags[flag] = defaultFlags[flag]
    })
  }

  // In order to properly validate the field value we
  // must be aware of whatever changes that happen to this
  // value, when a change happes, we execute the proper
  // validation method.
  addValueListeners (): void {
    if (!this.watch || !this.el) return

    const onBlur = () => {
      if (!this._flags.touched) this._flags.touched = true
      this.validate(this.name, this.scope)
    }

    const onInput = (value: any) => {
      this.value = value
      this._flags.changed = this.value !== this.initialValue
      this.validate(this.name, this.scope)

      if (!this._flags.dirty) {
        this._flags.dirty = true
        this._flags.pristine = false
      }
    }

    this.el.addEventListener('focusout', onBlur.bind(this))
    this.watch(this.scope ? `${this.scope}.${this.name}` : this.name, onInput.bind(this))
  }

  // Rule example: "required|date_format:DD/MM/YYY|between:10,30"
  mapRules (rules: ValidationRules): Array<NormalizedRule> {
    const stringToRules = (ruleDef: string) => ({
      ruleName: ruleDef.split(':')[0],
      args: ruleDef.split(':')[1] && ruleDef.split(':')[1].split(',')
    })

    const objToRules = (rulesObj: { [rule: string]: string }) =>
      Object.keys(rulesObj).map(ruleName => ({
        ruleName,
        args: rulesObj[ruleName]
      }))

    return typeof rules === 'string'
      ? rules.split('|').map(stringToRules)
      : Array.isArray(rules) ? rules.map(stringToRules)
      : rules && rules.constructor === Object ? objToRules(rules)
      : []
  }

  reset () {
    this.value = this.initialValue
    this.initFlags()
  }
}
