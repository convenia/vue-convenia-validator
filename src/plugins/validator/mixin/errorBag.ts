export default class ErrorBag {
  _items: [Validation.FieldError]

  constructor () { }

  all (scope?: string): Array<any> { return [] }

  any (scope?: string): boolean { return false }

  first (field: string, scope?: string): string { return '' }

  has (field: string, scope?: string): boolean { return false }
}
