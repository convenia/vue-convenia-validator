import { Vue as VueComponent } from 'vue-property-decorator'

import * as types from '../types'

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

  init (template: types.Field[]) {
    this._vm.$nextTick(this.initFields.bind(this, template))
  }

  initFields (template: types.Field[]) {
    const fields = template.map((templateField) => {
      // Treat scoped forms here
      const fieldEl = this._vm.$el.querySelectorAll(`input[name="${templateField.name}"]`)

      const fieldOptions = {
        id: '',
        rules: null,
        value: '',
        name: templateField.name,
        el: fieldEl[0]
      }

      return new Field(fieldOptions)
    })

    console.log('fields: ', fields)
    this.fields.push(fields)
  }

  validate () { }

  validateAll () { }

  reset () { }
}
