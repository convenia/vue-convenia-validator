export default class Field {
  value: any
  name: string
  scope?: string
  rules?: Form.ValidationRule
  el: Element | HTMLInputElement

  private initialValue: string

  _flags: Form.FieldFlags
  = { pristine: false
    , dirty: false
    , changed: false
    , touched: false
    , valid: false
    }

  constructor (options: Form.FieldItem) {
    this.el = options.el
    this.name = options.name
    this.value = options.value
    this.rules = options.rules
    this.scope = options.scope
    this._flags = this.createFlags()
    this.initialValue = options.value

    this.init(options)
  }

  // Not even sure if we need this
  get flags () {
    return this._flags
  }

  validate (): boolean { return false }

  init (options: Form.FieldItem): void {
    if (process.env.NODE_ENV !== 'production' && !this.name)
      console.warn('A field declaration is missing a "name" attribute')

    this.addActionListeners()
    this.addValueListeners()
  }

  // This method will initialize/reset the field flags.
  createFlags (): Form.FieldFlags {
    return {
      pristine: !this.value,
      dirty: !!this.value,
      touched: false,
      changed: false,
      valid: this.validate()
    }
  }

  // In order to properly validate the field value we
  // must be aware of whatever changes that happen to this
  // value, when a change happes, we execute the proper
  // validation method.
  addValueListeners (): void {
    if (!this.el) return

    const events = ['input', 'change']
    const listener = (event: any) => {
      const value = (event.target || { value: '' }).value
      console.log('listener value: ', value)

      this.value = value
      this._flags.changed = this.value != this.initialValue
      this.validate()
    }

    events.forEach(event => {
      this.el.addEventListener(event, listener)
    })
  }

  // Add listeners mostly for the touched and dirty flags
  // these are only one-time listeners, meaning that they
  // will be removed after firing for the first time.
  addActionListeners (): void {
    if (!this.el) return

    const onBlur = () => {
      this._flags.touched = true
    }

    const onInput = () => {
      this._flags.dirty = true
      this._flags.pristine = false
    }

    this.el.addEventListener('focusout', onBlur.bind(this), { once: true })
    this.el.addEventListener('input', onInput.bind(this), { once: true })
  }
}
