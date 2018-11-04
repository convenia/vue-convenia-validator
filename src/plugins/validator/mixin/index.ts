import { Component, Vue } from 'vue-property-decorator'

import FieldBag from './fieldBag'
import ErrorBag from './errorBag'
import ScopedValidator from './scopedValidator'

@Component
export default class FormValidator extends Vue {
  public $validator: ScopedValidator
  public $fields: FieldBag
  public $errors: ErrorBag

  // In the future we'll use this function to pass mixin options
  // and make some checkings before instantiating the ScopedValidator
  beforeCreate () {
    // Get Vue constructor
    const Vue = this.$options._base

    this.$validator = new ScopedValidator(this)

    // Setup computed properties on the component
    if (!this.$options.computed) this.$options.computed = {}

    // Mark both getters as reactive
    Vue.util.defineReactive(this.$validator, 'fields', this.$validator.fields)
    Vue.util.defineReactive(this.$validator, 'errors', this.$validator.errors)

    this.$options.computed['$fields'] = () => this.$validator.fields.items
    this.$options.computed['$errors'] = () => this.$validator.errors
  }
}
