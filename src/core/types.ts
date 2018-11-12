declare namespace Form {
  export type ValidationRules = string | Array<string> | { [rule: string]: any }

  export type ScopedTemplate = { [scope: string]: Form.FieldTemplate[] }
  export type FormTemplate = ScopedTemplate | Form.FieldTemplate[]

  export type NormalizedRule = { ruleName: string, args?: any }

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
}
