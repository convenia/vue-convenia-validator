import { shallowMount } from '@vue/test-utils'

import FieldBag from '../../src/core/FieldBag'
import Field from '../../src/core/field'

import DummyForm from '../mock/DummyForm.vue'
const  dummyForm: any = shallowMount(DummyForm)

// A little hack necessary to test the Field watchers
const nextTick = dummyForm.vm.$nextTick


// Field instances
const fullNameField = new Field({
  el: dummyForm.find('input[name="fullName"]').element as Element,
  vm: dummyForm.vm,
  name: 'fullName',
  scope: 'formOne',
  rules: [ 'required' ],
  value: dummyForm.vm.formOne.fullName
})

const customCb = (age: string) => +age > 5
const ageField = new Field({
  el: dummyForm.find('input[name="age"]').element as Element,
  vm: dummyForm.vm,
  name: 'age',
  scope: 'formOne',
  rules: { required: true, numeric: true, custom: customCb },
  value: dummyForm.vm.formOne.age
})

const birthdayField = new Field({
  el: dummyForm.find('input[name="birthday"]').element as Element,
  vm: dummyForm.vm,
  name: 'birthday',
  scope: undefined,
  rules: 'required|dateFormat:DD/MM/YYYY',
  value: dummyForm.vm.birthday
})

dummyForm.vm.$validator.fields = new FieldBag([ fullNameField, ageField, birthdayField ])


describe('Field class', () => {

  test('Rule mapping', () => {
    expect(dummyForm.vm.$validator).toBeDefined()

    // fullNameField rules
    expect(fullNameField.rules).toEqual([
      { ruleName: 'required', args: undefined }
    ])

    // ageField rules
    expect(ageField.rules).toEqual([
      { ruleName: 'required', args: [true] },
      { ruleName: 'numeric',  args: [true] },
      { ruleName: 'custom',   args: [customCb] }
    ])

    // birthdayField rules
    expect(birthdayField.rules).toEqual([
      { ruleName: 'required', args: undefined },
      { ruleName: 'dateFormat', args: ['DD/MM/YYYY'] }
    ])
  })

  test('Field listeners', () => {
    const fullNameInput = dummyForm.find('input[name="fullName"]')

    fullNameInput.trigger('focusout')
    dummyForm.setData({ formOne: { fullName: 'Bla' } })
    expect(dummyForm.vm.formOne.fullName).toBe('Bla')

    nextTick(() => expect(fullNameField.flags).toEqual({
      pristine: false,
      dirty: true,
      changed: true,
      touched: true,
      valid: true,
      errors: []
    }))
  })

  test('Field flags reset', () => {
    dummyForm.setData({ formOne: { fullName: '' } })
    expect(dummyForm.vm.formOne).toEqual({ fullName: '', age: '' })

    nextTick(() => fullNameField.reset())

    nextTick(() => expect(fullNameField.flags).toEqual({
      pristine: true,
      dirty: false,
      touched: false,
      changed: false,
      valid: false,
      errors: []
    }))
  })

  test('Field flag setter', () => {
    fullNameField.setFlag('errors', ['Test'])
    fullNameField.setFlag('changed', true)

    expect(fullNameField.flags.errors).toEqual(['Test'])
    expect(fullNameField.flags.changed).toBe(true)

    fullNameField.reset()
  })

  test('Field getters', () => {
    dummyForm.find('input[name="fullName"]').trigger('focusout')

    expect(fullNameField.watch).toBeDefined()
    expect(fullNameField.validate).toBeDefined()
    expect(fullNameField.errors).toEqual(['Campo obrigatório.'])
    expect(fullNameField.error).toEqual('Campo obrigatório.')
  })
})
