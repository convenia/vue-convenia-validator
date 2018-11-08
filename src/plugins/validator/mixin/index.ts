import { Component, Vue } from 'vue-property-decorator'

import FieldBag from './fieldBag'
import ErrorBag from './errorBag'
import ScopedValidator from './scopedValidator'

@Component
export default class FormValidator extends Vue {
  public $validator: ScopedValidator
  public $validations: object

  // In the future we'll use this function to pass mixin options
  // and make some checkings before instantiating the ScopedValidator
  beforeCreate () {
    // Get Vue constructor
    const Vue = this.$options._base

    this.$validator = new ScopedValidator(this)

    // Setup computed properties on the component
    if (!this.$options.computed) this.$options.computed = {}

    // Mark getter as reactive

    // @params: state, prop name, prop value
    Vue.util.defineReactive(this.$validator, 'validations', this.$validator.validations)
    this.$options.computed['$validations'] = () => this.$validator.validations

    /*
    this.$options.computed['$validations'] = function validationsGetter() {
      const mapFlags = (initial: object,scope?: string) => {
        const errors = () => ({})
        const fields = () => this.$validator.fields.all(scope)
          .reduce((acc, field: Field) => ({ ...acc, [field.name]: field.flags }), {}) 

        Object.defineProperty(initial, '$fields', { get: fields, enumerable: true })
        Object.defineProperty(initial, '$errors', { get: errors, enumerable: true })

        return initial
      }

      const mapFormScopes = (acc: object, scope: string) => ({
        ...acc,
        [scope]: mapFlags({}, scope)
      })

      const validations = this.$validator.scopes.length
        ? this.$validator.scopes.reduce(mapFormScopes, {})
        : mapFlags({ })

      console.log('get.validations: ', validations)

      return validations
    }
    */
  }
}
