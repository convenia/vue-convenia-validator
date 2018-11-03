import Field from './field'

type FieldItem = {
  id: string
  value: any
  name: string
  el: HTMLInputElement
  rules: { string: Object }
}

export default class FieldBag {
  _items: Field[]

  constructor (items?: [FieldItem]) {
    this._items = items || []
  }

  get items () {
    return this._items
  }

  push (item: Field | Field[]) {
    // If item is an object, check if item is an instance of field
    // If item is an array, check if every item is instace of field
    // Check if item has an `id`
    // Check if item is already present in the FieldBag instance

    this._items.push.apply(this, Array.isArray(item) ? item : [ item ])
  }
}
