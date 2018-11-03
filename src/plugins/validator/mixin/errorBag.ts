type FieldError = {
  fieldName: string
  errors: [Error]
}

export default class ErrorBag {
  _items: [FieldError]

  constructor () {

  }

  all (scope?: string): Array<any> { return [] }

  any (scope?: string): boolean { return false }

  first (field: string, scope?: string): string { return '' }

  has (field: string, scope?: string): boolean { return false }
}
