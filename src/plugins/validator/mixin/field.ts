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

    // Call update() instead
    this.addActionListeners()
  }

  // Not even sure if we need this
  get flags () {
    return this._flags
  }

  // This method will be used to initialize the field,
  // it will property setup the flags by calling the
  // createFlags method, and setup the events that need
  // to be listened to, depending on the type of the field.
  update () { }

  // This method will initialize/reset the field flags.
  createFlags () { }

  // In order to properly validate the field value we
  // must be aware of whatever changes that happen to this
  // value, when a change happes, we execute the proper
  // validation method.
  addValueListeners () { }

  // Add listeners mostly for the touched and dirty flags
  // these are only one-time listeners, meaning that they
  // will be removed after firing for the first time.
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

    // We also need to check if `el` is actually a Vue Component instance
    this.el.addEventListener('blur', onBlur.bind(this), { once: true })
    this.el.addEventListener('input', onInput.bind(this), { once: true })
  }
}
