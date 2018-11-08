import Field from './field'

export default class FieldBag {
  private _items: Field[]

  constructor (items?: [Field]) {
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

  push (item: Field | Field[]) {
    // If item is an object, check if item is an instance of field
    // If item is an array, check if every item is instace of field
    // Check if item has an `id`
    // Check if item is already present in the FieldBag instance

    this._items.push.apply(this._items, Array.isArray(item) ? item : [ item ])
  }
}
