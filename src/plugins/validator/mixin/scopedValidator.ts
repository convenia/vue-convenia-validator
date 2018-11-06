import { Vue as VueComponent } from 'vue-property-decorator'

import Field from './field'
import ErrorBag from './errorBag'
import FieldBag from './fieldBag'

type ScopedTemplate = { [scope: string]: Form.FieldTemplate[] }
type FormTemplate = ScopedTemplate | Form.FieldTemplate[]

export default class ScopedValidator {
  private _vm: VueComponent

  public fields: FieldBag
  public errors: ErrorBag

  constructor (vm: VueComponent) {
    this._vm = vm

    this.fields = new FieldBag()
    this.errors = new ErrorBag()
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

      return Array.prototype.concat(scopedFields)
    }

    const fields: Field[] = Array.isArray(template)
      ? template.map(field => mapFields(field))
      : mapScopes(template)

    this.fields.push(fields)
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
  attach (fieldOpts: Form.FieldItem) { }

  detach () { }

  flag () { }

  reset () { }

  validate () { }

  validateAll () { }
}
