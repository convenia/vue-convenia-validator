import { Vue as VueComponent } from 'vue-property-decorator'

import Field from './field'
import FieldBag from './fieldBag'
import * as rules from '../rules'

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

  init (template: Form.FormTemplate): void {
    this._vm.$nextTick(this.initFields.bind(this, template))
  }

  initFields (template: Form.FormTemplate): void {
    const mapFields = (fieldTemplate: Form.FieldTemplate, scope?: string): Field => {
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

    const mapScopes = (scopes: Form.ScopedTemplate): Field[] => {
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
  }

  initValidations () {
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

  getFieldEl (field: Form.FieldTemplate, scope?: string): Element {
    const fieldQuery = scope
      ? `form[name="${scope}"] [name="${field.name}"]`
      : `[name="${field.name}"]`

    const fields: NodeList = this._vm.$el.querySelectorAll(fieldQuery)

    if (process.env.NODE_ENV !== 'production' && !fields.length)
      console.warn(`CeeValidate: Field "${field.name}" could not be found in the DOM`)

    return <Element>fields[0]
  }

  validate (fieldName: string, scope?: string): void {
    const field = this.fields.get(fieldName, scope)

    if (!field || !(field.rules || []).length) return

    const fieldErrors = field.rules
      .map(({ rule: name }) => !rules[name].validate(field.value) && rules[name].message)
      .filter((message: string) => !!message)

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

  attach (fieldOpts: Form.FieldItem) { }

  detach () { }

}
