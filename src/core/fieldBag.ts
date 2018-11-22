import Field from './field'


export default class FieldBag {
  private _items: Field[]

  constructor (items?: Field[]) {
    this._items = items || []
  }

  set items (items: Field | Field[]) {
    this.push(items)
  }

  /**
   * Returns the corresping Field instance, or undefined if not found.
   *
   * @param {String} field - The name of the field.
   * @param {String} scope? - Optional scope of the field.
   * @returns {Field | undefined} - The Field instance, or undefined if not found.
   */

  get (field: string, scope?: string): Field | undefined {
    return this._items.find((item: Field) => scope
      ? item.name === field && item.scope === scope
      : item.name === field)
  }

  /**
   * Returns all fields registered in the FieldBag
   *
   * @param {String} scope? - If present, returns all the fields from that scope
   * @returns {Array<Field>} - Array of field items
   */

  all (scope?: string): Array<Field> {
    return scope
      ? this._items.filter(f => f.scope === scope)
      : this._items
  }

  /**
   * Check to see if a Field is preseint in the FieldBag, or if a Field
   * exists in a given scope.
   *
   * @param {String} field - The name of the field
   * @param {String} scope? - Optional scope of the field
   * @returns {Boolean}
   */

  has (field: string, scope?: string): boolean {
    return !!this._items.find((item: Field) => scope
      ? item.name === field && item.scope === scope
      : item.name === field)
  }

  /**
   * Add a new Field or an array of Field instances to the existing _items
   * arrays.
   *
   * @param {Field | Array<Field>} scope? - If present, returns all the fields
   * from that scope.
   * @returns {void}
   */

  push (item: Field | Field[]): void {
    // Check if item is already present in the FieldBag instance
    this._items.push.apply(this._items, Array.isArray(item) ? item : [ item ])
  }
}
