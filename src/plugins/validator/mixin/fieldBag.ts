import Field from './field'

export default class FieldBag {
  _items: Field[]

  constructor (items?: [Field]) {
    this._items = items || []
  }

  get items () {
    console.log('_items: ', this._items)
    return this._items.reduce((acc, item) => ({
      ...acc,
      [item.name]: item.flags
    }), {})
  }

  push (item: Field | Field[]) {
    // If item is an object, check if item is an instance of field
    // If item is an array, check if every item is instace of field
    // Check if item has an `id`
    // Check if item is already present in the FieldBag instance

    this._items.push.apply(this._items, Array.isArray(item) ? item : [ item ])
  }
}
