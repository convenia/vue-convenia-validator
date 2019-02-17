import { Vue as VueComponent } from 'vue-property-decorator'

import FieldBag from './fieldBag'
import Field from './field'

import RuleContainer from './ruleContainer'
import { isFormScope } from '../utils'
import '../rules'

import {
  NormalizedRule,
  ValidationRule,
  FormValidation,
  FieldValidation,
  FieldFlags
} from '../types'


// ScopedValidor specific types

export interface VM extends VueComponent { [dataName: string]: any }
export type ScopedFormValidation = { [scope: string]: FormValidation }
export type FormTemplate = ScopedFormValidation | FormValidation

export type FormValidationFlags
  = { [scope: string]: { [fieldName: string]: FieldFlags } }
  | { [fieldName: string]: FieldFlags }


export default class ScopedValidator {
  private _vm: VM

  public fields: FieldBag
  public scopes: string[] = []
  public validations: FormValidationFlags = {}

  constructor (vm: VueComponent) {
    this._vm = vm
    this.fields = new FieldBag()

    if (vm.$options.validation) this.init(vm.$options.validation)
  }

  /**
   * This two following functions are responsible for bootstraping
   * the ScopedValidation class with the given validation options.
   * The public init function exists to ensure that whenever we're
   * bootstraping the ScopedValidator class, the DOM will be accessible
   * through the _vm.
   *
   * @param template - The form validations template object.
   * @returns {void}
   *
   * @author Erik Isidore
   */

  public init (template:FormTemplate): void {
    this._vm.$nextTick(this.__init.bind(this, template))
  }

  private __init (template: FormTemplate): void {
    this.scopes = Object.keys(template).filter(key => isFormScope(template[key]))
    this.fields.items = this.initFields(template)
    this.validations = this.initValidations()
  }

  /**
   * Receives a FormTemplate object and maps the fields validation rules
   * in it to populate the `fields` instance property with Field instances.
   *
   * @param {FormTemplate} template - The form or forms validation object.
   * @returns {void}
   *
   * @author Erik Isidore
   */

  initFields (template: FormTemplate): Field[] {
    const mapField = (name: string, rules: FieldValidation, scope?: string): Field => {
      const fieldOptions = {
        name,
        rules,
        scope,
        vm: this._vm,
        value: scope ? this._vm[scope][name] : this._vm[name],
        el: this.getFieldEl(name, scope),
      }

      return new Field(fieldOptions)
    }

    // This will map each form scope name to an array of Field instances,
    // producing an Array of Field arrays, crazy rite?
    const scopes = this.scopes.map((scope: string) => {
      const formScope: FormValidation = template[scope] as FormValidation

      return Object.keys(formScope)
        .map(fieldName => mapField(fieldName, formScope[fieldName], scope))
    })

    const fields: Field[] = Object.keys(template)
      .filter(key => !isFormScope(template[key]))
      .map(key => mapField(key, template[key]))

    return Array.prototype.concat(fields, ...scopes)
  }

  /**
   * Generetes the validation flags object based on the form scopes.
   *
   * @returns {FormValidationFlags}
   *
   * @author Erik Isidore
   */

  initValidations (): FormValidationFlags {
    const mapFlags = (scope?: string) => this.fields.all(scope)
      .reduce((acc, field: Field) => ({ ...acc, [field.name]: field.flags }), {})

    const mapFormScopes = (acc: object, scope: string) => ({
      ...acc,
      [scope]: mapFlags(scope)
    })

    return this.scopes.length > 1
      ? this.scopes.reduce(mapFormScopes, { })
      : mapFlags()
  }

  /**
   * Receives a fieldName and optionally it's scope and returns the HTML
   * Element corresponding to that field in the DOM.
   *
   * @param {String} fieldName - The name of the field
   * @param {String} scope? - Optional form scope.
   * @returns {Element} - The first matching element found in the component DOM.
   *
   * @author Erik Isidore
   */

  getFieldEl (fieldName: string, scope?: string): Element {
    const fieldQuery = scope
      ? `form[name="${scope}"] [name="${fieldName}"]`
      : `[name="${fieldName}"]`

    const fields: NodeList = this._vm.$el.querySelectorAll(fieldQuery)
    console.log('getFieldEl: ', { fieldName, scope, fieldQuery })

    if (process.env.NODE_ENV !== 'production' && !fields.length)
      console.warn(`CeeValidate: Field "${fieldName}" could not be found in the DOM`)

    return <Element>fields[0]
  }

  /**
   * @param {String} fieldName -
   * @param {String} scope? -
   * @returns {void}
   *
   * @author Erik Isidore
   */

  validate (fieldName: string, scope?: string): boolean {
    const field = this.fields.get(fieldName, scope)

    if (!field || !(field.rules || []).length) return false

    console.log('validate: ', { fieldName, scope, field })

    const mapErrors = ({ ruleName, args }: NormalizedRule): string => {
      const rule: ValidationRule = RuleContainer.getRule(ruleName)
      const hasError = !rule.validate.apply(null, [field.value, ...(args || [])])
      const errorMessage = rule.message

      return hasError ? errorMessage : ''
    }

    const fieldErrors: string[] = field.rules
      .map(mapErrors)
      .filter(message => !!message)

    field.setFlag('errors', fieldErrors)
    field.setFlag('valid', !fieldErrors.length)

    return !fieldErrors.length
  }

  /**
   * Executes the validate() method on all Field instances.
   *
   * @param {String} scope? -
   * @returns {void}
   *
   * @author Erik Isidore
   */

  validateAll (scope?: string): boolean {
    const fieldFlags = this.fields.all(scope)
      .map((field: Field) => field.validate())

    return fieldFlags.every(isValid => !!isValid)
  }

  /**
   * Resets all of the fields validation flags.
   *
   * @param {String} scope? -
   * @returns {void}
   *
   * @author Erik Isidore
   */

  reset (scope?: string): void {
    this.fields.all(scope).forEach((field: Field) => field.reset())
  }

  /**
   * Attaches a new field to the validator.
   *
   * @param {}
   * @returns {void}
   *
   * @author Erik Isidore
   */

  attach (field: { name: string, rules: string, scope: string }): void {
    const newField: Field = new Field({
      vm: this._vm,
      name: field.name,
      rules: field.rules,
      scope: field.scope,
      el: this.getFieldEl(field.name, field.scope),
      value: field.scope ? this._vm[field.scope][field.name] : this._vm[field.name]
    })

    console.log('attach: ', { field, validations: this.validations })

    field.scope && this.scopes.length > 1
      ? this.validations[field.scope][field.name] = newField.flags
      : this.validations[field.name] = newField.flags

    this.fields.push(newField)
  }

  /**
   * Detaches an existing field from the validator.
   *
   * @param {}
   * @returns {void}
   *
   * @author Erik Isidore
   */

  detach (field: string, scope?: string): void {
    scope
      ? delete this.validations[scope][field]
      : delete this.validations[field]

    this.fields.remove(field, scope)
  }
}
