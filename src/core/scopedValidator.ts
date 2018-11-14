import { Vue as VueComponent } from 'vue-property-decorator'

import Field from './field'
import FieldBag from './fieldBag'

import RuleContainer from './ruleContainer'
import '../rules'

import {
  FieldTemplate,
  NormalizedRule,
  ValidationRule
} from '../types'

export type ScopedTemplate = { [scope: string]: FieldTemplate[] }
export type FormTemplate = ScopedTemplate | FieldTemplate[]

export default class ScopedValidator {
  private _vm: VueComponent

  public fields: FieldBag
  public scopes: string[] = []
  public validations: object = {}

  constructor (vm: VueComponent) {
    this._vm = vm
    this.fields = new FieldBag()

    if (vm.$options.validation) this.init(vm.$options.validation)
  }

  init (template: FormTemplate): void {
    this._vm.$nextTick(this.initFields.bind(this, template))
  }

  initFields (template: FormTemplate): void {
    const mapFields = (fieldTemplate: FieldTemplate, scope?: string): Field => {
      const fieldEl = this.getFieldEl(fieldTemplate)
      const fieldOptions = {
        scope,
        el: fieldEl,
        vm: this._vm,
        name: fieldTemplate.name,
        value: fieldTemplate.value,
        rules: fieldTemplate.validation
      }

      return new Field(fieldOptions)
    }

    const mapScopes = (scopes: ScopedTemplate): Field[] => {
      const scopedFields = Object.keys(scopes).map((scope) => {
        return scopes[scope].map(field => mapFields(field, scope))
      })

      return Array.prototype.concat.apply([], scopedFields)
    }

    const fields: Field[] = Array.isArray(template)
      ? template.map(field => mapFields(field))
      : (this.scopes = Object.keys(template)) && mapScopes(template)

    this.scopes = Array.isArray(template) ? [] : Object.keys(template)
    this.fields.push(fields)
    this.validations = this.initValidations()
    //this.registerGetters()
  }

  initValidations () {
    console.log('runnnning: ', this)
    const mapFlags = (scope?: string) => ({
      fields: this.fields.all(scope)
        .reduce((acc, field: Field) => ({ ...acc, [field.name]: field.flags }), {})
    })

    const mapFormScopes = (acc: object, scope: string) => ({
      ...acc,
      [scope]: mapFlags(scope)
    })

    return this.scopes.length > 1
      ? this.scopes.reduce(mapFormScopes, { })
      : mapFlags()
  }

  getFieldEl (field: FieldTemplate, scope?: string): Element {
    const fieldQuery = scope
      ? `form[name="${scope}"] [name="${field.name}"]`
      : `[name="${field.name}"]`

    const fields: NodeList = this._vm.$el.querySelectorAll(fieldQuery)

    if (process.env.NODE_ENV !== 'production' && !fields.length)
      console.warn(`CeeValidate: Field "${field.name}" could not be found in the DOM`)

    // Return the first element found
    return <Element>fields[0]
  }

  /*
  registerGetters () {
    const Vue = this._vm.$options._base
    const options = this._vm.$options

    if (!options.computed) options.computed = { }

    Vue.util.defineReactive(this, 'validations', this.validations)
    options.computed['$validations'] = () => this.validations
  }
  */

  validate (fieldName: string, scope?: string): void {
    const field = this.fields.get(fieldName, scope)

    if (!field || !(field.rules || []).length) return


    const mapErrors = ({ ruleName, args: ruleArgs }: NormalizedRule): string => {
      const rule: ValidationRule = RuleContainer.getRule(ruleName)
      const hasError = !rule.validate(field.value, ruleArgs)
      const errorMessage = rule.message

      return hasError ? errorMessage : ''
    }

    const fieldErrors: string[] = field.rules
      .map(mapErrors)
      .filter(message => !!message)

    field.setFlag('errors', fieldErrors)
    field.setFlag('valid', !fieldErrors.length)
  }

  validateAll (scope?: string) {
    this.fields.all(scope).forEach((field: Field) => {
      this.validate(field.name, field.scope)
    })
  }

  reset (scope?: string) {
    this.fields.all(scope).forEach((field: Field) => field.reset())
  }

  attach () { }

  detach (field: string, scope?: string) { }
}
