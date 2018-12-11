export type FieldValidation = string | Array<string> | { [rule: string]: any }
export type FormValidation = { [fieldName: string]: FieldValidation }

export type NormalizedRule = { ruleName: string, args?: any }
export type ValidationRule = {
  validate: (value: any, ...args: any) => boolean
  message: string
}

export interface FieldItem {
  vm: any
  value: any
  name: string
  scope?: string
  el: Element
  rules: FieldValidation
}

export type FieldFlags = {
  pristine: boolean
  dirty: boolean
  touched: boolean
  changed: boolean
  valid: boolean
  errors: string[]
}
