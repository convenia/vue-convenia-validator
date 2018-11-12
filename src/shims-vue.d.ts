import Vue from 'vue'

declare module '*.vue' { export default Vue }

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    validation?: Form.FormTemplate
    _base?: any
  }
}
