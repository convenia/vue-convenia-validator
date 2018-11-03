type FieldItem = {
  id: string
  value: any
  name: string
  el: Element | HTMLInputElement
  rules: { string: Object } | null
}

export default class Field {
  value: any
  name: string
  el: Element | HTMLInputElement
  rules: { string: Object } | null

  constructor (options: FieldItem) {
    this.value = options.value
    this.name = options.name
    this.el = options.el
    this.rules = options.rules || null
  }
}
