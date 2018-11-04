export default class Field {
  value: any
  name: string
  el: Element | HTMLInputElement
  rules: { string: Object } | null
  scope: string

  _flags: Validation.FieldFlags
  = { pristine: false
    , dirty: false
    , touched: false
    , valid: false
    , required: false
    , validated: false
    }

  constructor (options: Validation.FieldItem) {
    this.value = options.value
    this.name = options.name
    this.el = options.el
    this.rules = options.rules || null

    this.addActionListeners()
  }

  get flags () {
    return this._flags
  }

  createFlags () {

  }

  addActionListeners () {
    if (!this.el) return

    const onBlur = () => {
      this._flags.touched = true
      console.log('onBlur! ', this)
    }

    const onInput = () => {
      this._flags.dirty = true
      this._flags.pristine = false
      console.log('onInput! ', this)
    }

    this.el.addEventListener('blur', onBlur.bind(this), { once: true })
    this.el.addEventListener('input', onInput.bind(this), { once: true })
  }
}
