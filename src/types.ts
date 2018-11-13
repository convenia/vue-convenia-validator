export type ValidationRules = string | Array<string> | { [rule: string]: any } | undefined
export type NormalizedRule = { ruleName: string, args?: any }
export type ValidationRule = {
  validate: (value: any, ...args: any) => boolean
  message: string
}

export type ScopedTemplate = { [scope: string]: FieldTemplate[] }
export type FormTemplate = ScopedTemplate | FieldTemplate[]

export interface FieldTemplate {
  type: string
  name: string
  value: string
  label?: string
  placeholder?: string
  validationMsg?: string
  validation?: ValidationRules
}

export type SelectFieldOption = string | { label: string, value: any }
export interface SelectField extends FieldTemplate {
  displayBy?: keyof SelectFieldOption
  trackBy?: keyof SelectFieldOption
  options: Array<SelectFieldOption>
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
  errors: string[]
}
