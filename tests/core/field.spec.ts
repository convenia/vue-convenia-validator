import { mount, shallowMount } from '@vue/test-utils'
import Field from '../../src/core/field'

import DummyForm from '../mock/DummyForm.vue'
const  dummyForm: any = shallowMount(DummyForm)

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

describe('Field class', () => {
  test('Rule mapping', () => {
    // fullNameField rules
    expect(fullNameField.rules).toEqual([
      { ruleName: 'required', args: undefined }
    ])

    // ageField rules
    expect(ageField.rules).toEqual([
      { ruleName: 'required', args: true },
      { ruleName: 'numeric',  args: true },
      { ruleName: 'custom',   args: customCb }
    ])

    // birthdayField rules
    expect(birthdayField.rules).toEqual([
      { ruleName: 'required', args: undefined },
      { ruleName: 'dateFormat', args: ['DD/MM/YYYY'] }
    ])
  })
})
