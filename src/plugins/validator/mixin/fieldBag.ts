import Field from './field'

export default class FieldBag {
  private _items: Field[]

  constructor (items?: Field[]) {
    this._items = items || []
  }

  /**
   * Returns all fields registered in the FieldBag
   * @param scope - If present, returns all the fields from that scope
   * @return Array<field> array of field items
   */
  all (scope?: string): Array<Field> {
    return scope
      ? this._items.filter(f => f.scope === scope)
      : this._items
  }

  has (field: string, scope?: string) {

  }

  push (item: Field | Field[]) {
    // Check if item is already present in the FieldBag instance
    this._items.push.apply(this._items, Array.isArray(item) ? item : [ item ])
  }
}
