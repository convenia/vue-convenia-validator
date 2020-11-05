import Vue from 'vue'
import { FormTemplate } from './core/scopedValidator'
import { ValidatorOptions } from 'types';

declare module '*.vue' { export default Vue }

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    validatorOptions: ValidatorOptions
    validations?: FormTemplate
    _base?: any
  }
}
