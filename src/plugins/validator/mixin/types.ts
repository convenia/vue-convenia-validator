declare namespace Form {
  export type ValidationRules = string | Array<string> | { [rule: string]: any } | undefined
  export type FieldTemplate = InputField | SelectField

  export interface InputField {
    type: string
    name: string
    value: string
    label?: string
    validation?: ValidationRules
    validationMsg?: string
    placeholder?: string
  }

  export interface SelectField extends InputField {
    displayBy?: string
    trackBy?: string
    options: Array<string> | Array<{ label: string, value: any }>
  }

  export interface FieldItem {
    vm: any 
    value: any
    name: string
    scope?: string
    el: Element | HTMLInputElement
    rules?: ValidationRules
  }

  export type FieldFlags = {
    pristine: boolean
    dirty: boolean
    touched: boolean
    changed: boolean
    valid: boolean
  }
}
