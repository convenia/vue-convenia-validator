import { Vue as VueComponent } from 'vue-property-decorator'

import Field from './field'
import ErrorBag from './errorBag'
import FieldBag from './fieldBag'
import * as rules from '../rules'

type ScopedTemplate = { [scope: string]: Form.FieldTemplate[] }
type FormTemplate = ScopedTemplate | Form.FieldTemplate[]

export default class ScopedValidator {
  private _vm: VueComponent

  public fields: FieldBag
  public errors: ErrorBag
  public scopes: string[] = []
  public validations: object = {}

  constructor (vm: VueComponent) {
    this._vm = vm

    this.fields = new FieldBag()
    this.errors = new ErrorBag()

    if (vm.$options.validation) this.init(vm.$options.validation)
  }

  getValidations () {
    const mapFlags = (initial: object,scope?: string) => {
      const errors = () => ({})
      const fields = () => this.fields.all(scope)
        .reduce((acc, field: Field) => ({ ...acc, [field.name]: field.flags }), {}) 

      Object.defineProperty(initial, '$fields', { get: fields, enumerable: true })
      Object.defineProperty(initial, '$errors', { get: errors, enumerable: true })

      return initial
    }

    const mapFormScopes = (acc: object, scope: string) => ({
      ...acc,
      [scope]: mapFlags({}, scope)
    })

    this.validations = this.scopes.length > 1
      ? this.scopes.reduce(mapFormScopes, this.validations)
      : mapFlags(this.validations)
  }

  init (template: FormTemplate): void {
    this._vm.$nextTick(this.initFields.bind(this, template))
  }

  initFields (template: FormTemplate): void {
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
    this.getValidations()
  }

  getFieldEl (field: Form.FieldTemplate, scope?: string): Element {
    const fieldQuery = scope
      ? `form[name="${scope}"] [name="${field.name}"]`
      : `[name="${field.name}"]`

    const fields: NodeList = this._vm.$el.querySelectorAll(fieldQuery)

    if (!fields.length)
      console.warn(`Field "${field.name}" could not be found in the DOM`)

    return <Element>fields[0]
  }

  /**
   * Registers a field to be validated
   * @param fieldOpts - an FieldOptions object to be passed to the Field
   * constructor.
   */

  validate (field: Field): boolean {
    if (!field.rules || !(field.rules || []).length) return true

    const result = field.rules.map(({ rule: name }) => {
      return rules[name].validate(field.value)
    })

    return result.every((passed: boolean) => passed)
  }

  validateAll () { }

  attach (fieldOpts: Form.FieldItem) { }

  detach () { }

  reset () { }
}
