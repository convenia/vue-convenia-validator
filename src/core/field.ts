import FormValidator from '../index'
import { is } from 'utils';

import {
  FieldItem,
  FieldFlags,
  NormalizedRule,
  FieldValidation
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
  public el: Element
  public rules: NormalizedRule[]

  constructor (options: FieldItem) {
    this.el = options.el
    this._vm = options.vm
    this.name = options.name
    this.value = options.value
    this.scope = options.scope
    this.rules = this.mapRules(options.rules)
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

  get flags () { return this._flags }

  get errors () { return this._flags.errors }

  get error () { return this._flags.errors[0] || '' }

  /**
   *
   * @param {Keyof FieldFlags} flag - The flag name
   * @param {Boolean | Array<String>} value - the new value to assigned to the flag
   * @returns {void}
   * @author Erik Isidore
   */

  setFlag (flag: keyof FieldFlags, value: boolean | string[]): void {
    if (!Object.keys(this._flags).includes(flag)) return

    this._flags[flag] = value
  }

  /**
   *
   * @param {FieldItem} options
   * @returns {void}
   * @author Erik Isidore
   */

  init (options: FieldItem): void {
    if (process.env.NODE_ENV !== 'production' && !this.name)
      console.warn('CeeValidate: A field declaration is missing a "name" attribute')

    this.initFlags()
    this.addValueListeners()
  }

  /**
   * Initializes or resets the Field flags to their default values.
   *
   * @returns {void}
   * @author Erik Isidore
   */

  initFlags (): void {
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

  /**
   * @returns {void}
   * @author Erik Isidore
   */

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

  /**
   *
   * @param {FieldValidation} rules -
   * @returns {Array<NormalizedRule>}
   * @author Erik Isidore
   */

  mapRules (rules: FieldValidation): Array<NormalizedRule> {
    const stringToRules = (ruleDef: string) => ({
      ruleName: ruleDef.split(':')[0],
      args: ruleDef.split(':')[1] && ruleDef.split(':')[1].split(',')
    })

    const objToRules = (rulesObj: { [rule: string]: any }) =>
      Object.keys(rulesObj).map(ruleName => ({
        ruleName,
        args: rulesObj[ruleName]
      }))

    return typeof rules === 'string' && rules.length
      ? rules.split('|').map(stringToRules)
      : Array.isArray(rules) ? rules.map(stringToRules)
      : rules && is(rules, 'Object') ? objToRules(rules as object)
      : []
  }

  /**
   * Resets the field flags and it's value.
   *
   * @returns {void}
   * @author Erik Isidore
   */

  reset (): void {
    this.value = this.initialValue
    this.initFlags()
  }
}
