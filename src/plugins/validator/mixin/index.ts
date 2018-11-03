import { Component, Vue } from 'vue-property-decorator'

import ScopedValidator from './scopedValidator'

@Component
export default class FormValidator extends Vue {
  public $validator: ScopedValidator

  // In the future we'll use this function to pass mixin options
  // and make some checkings before instantiating the ScopedValidator
  beforeCreate () {
    this.$validator = new ScopedValidator(this)

    // Setup computed properties on the component
    if (!this.$options.computed) this.$options.computed = {}

    this.$options.computed['$fields'] = () => this.$validator.fields.items
    this.$options.computed['$errors'] = () => this.$validator.errors
  }
}
