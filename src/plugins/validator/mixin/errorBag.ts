type FieldError = { field: string, scope?: string, message: string | string[] }

export default class ErrorBag {
  private _items: FieldError[]

  constructor (items?: FieldError[]) {
    this._items = items || []
  }

  private getFieldError (field: string, scope?: string): FieldError | undefined {
    return this._items.find((item: FieldError) => {
      return scope
        ? item.field === field && item.scope === scope
        : item.field === field
    })
  }

  all (scope?: string): Array<FieldError> {
    return scope
      ? this._items.filter(f => f.scope === scope)
      : this._items
  }

  push (item: FieldError | FieldError[]) {
    console.log('push: ', item)
    this._items.push.apply(this._items, Array.isArray(item) ? item : [ item ])
  }

  remove (field: string, scope?: string) {
    if (!this.getFieldError(field, scope)) return

    this._items = this._items.filter((item: FieldError) => {
      return scope
        ? item.field === field && item.scope === scope
        : item.field === field
    })
  }

  any (scope?: string): boolean { return !!this._items.length }

  first (field: string, scope?: string): string {
    const fieldError = this.getFieldError(field, scope)
 
    if (!fieldError) return ''

    return Array.isArray(fieldError.message)
      ? fieldError.message[0]
      : fieldError.message
  }

  has (field: string, scope?: string): boolean {
    return !!this.getFieldError(field, scope)
  }
}
