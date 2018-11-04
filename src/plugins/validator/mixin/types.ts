declare namespace Validation {
  export type FieldItem = {
    id: string
    name: string
    value: any
    el: Element | HTMLInputElement
    rules: { string: Object } | null
    scope?: string
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
