import { Vue as VueComponent } from 'vue-property-decorator'

import Field from './field'
import ErrorBag from './errorBag'
import FieldBag from './fieldBag'

export default class ScopedValidator {
  private _vm: VueComponent
  public fields: FieldBag
  public errors: ErrorBag

  constructor (vm: VueComponent) {
    this._vm = vm

    this.fields = new FieldBag()
    this.errors = new ErrorBag()
  }

  init (template: Field[]): void {
    this._vm.$nextTick(this.initFields.bind(this, template))
  }

  initFields (template: Field[]) {
    const fields = template.map((templateField) => {
      // Treat scoped forms here
      const fieldEl = this._vm.$el.querySelectorAll(`input[name="${templateField.name}"]`)

      const fieldOptions = {
        id: '',
        rules: null,
        value: '',
        scope: '',
        name: templateField.name,
        el: fieldEl[0]
      }

      return new Field(fieldOptions)
    })

    console.log('fields: ', fields)
    this.fields.push(fields)
  }

  /**
   * Registers a field to be validated
   * @param fieldOpts - an FieldOptions object to be passed to the Field
   * constructor.
   */
  attach (fieldOpts: Validation.FieldItem) { }

  detach () { }

  flag () { }

  reset () { }

  validate () { }

  validateAll () { }

}
