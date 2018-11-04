declare namespace Validation {
  export type FieldItem = {
    id: string
    value: any
    name: string
    el: Element | HTMLInputElement
    rules: { string: Object } | null
  }

  export type FieldFlags = {
    pristine: boolean
    dirty: boolean
    touched: boolean
    valid: boolean
    required: boolean
    validated: boolean
  }

  export type FieldError = {
    fieldName: string
    errors: [Error]
  }
}
