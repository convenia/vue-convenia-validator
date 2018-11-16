import { Component, Vue } from 'vue-property-decorator'

import ScopedValidator, { FormTemplate } from './core/scopedValidator'

// eslint-disable
@Component
export default class FormValidator extends Vue {
  public $validator: ScopedValidator | { init: (template: FormTemplate) => void }
  public $validation: object
  public static options: object = {}

  // In the future we'll use this function to pass mixin options
  // and make some checkings before instantiating the ScopedValidator
  beforeCreate () {
    console.log('thes: ', this)
    this.$validator = {
      init: (template: FormTemplate) => {
        console.log('initializing.... ', this, ' template: ', template)
        console.log('options', FormValidator.options)
       this.$validator = new ScopedValidator(this, FormValidator.options)
       this.$validator.init(template)
      }
    }

    if (this.$options.validation)
      this.$validator.init(this.$options.validation)
  }

  // Implement beforeDestroy ()
}
