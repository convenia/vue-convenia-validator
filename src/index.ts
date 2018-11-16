import FormValidator from './mixin'

const defaultConfig = { }

export default {

  install (Vue: any, options?: any) {
    console.log('installing, LOL: ')
    console.log('FormValidatorMixin: ', FormValidator)
    console.log('this: ', this)
    // We should merge the two
    FormValidator.options = options || defaultConfig

    Vue.mixin(FormValidator)
  }
}
