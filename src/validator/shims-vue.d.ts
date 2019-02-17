import Vue from 'vue'
import { FormTemplate } from './core/scopedValidator'

declare module '*.vue' { export default Vue }

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    validation?: FormTemplate
    _base?: any
  }
}
