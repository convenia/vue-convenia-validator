import FieldBag from '../../src/core/FieldBag'
import Field from '../../src/core/field'

import fieldItems, { dummyField } from '../mock/FieldItems'

const fields = fieldItems.map(fieldMock => new Field(fieldMock))
const fieldBag = new FieldBag(fields)

describe('FieldBag class', () => {
  test('Get single field (scoped/unscoped)', () => {
    expect(fieldBag.get('fullName')).toBeDefined()
    expect(fieldBag.get('fullName').name).toBe('fullName')
    expect(fieldBag.get('fullName').scope).toBe('formOne')

    expect(fieldBag.get('fullName', 'formTwo')).toBeDefined()
    expect(fieldBag.get('fullName', 'formTwo').name).toBe('fullName')
    expect(fieldBag.get('fullName', 'formTwo').scope).toBe('formTwo')
  })

  test('Get multiple fields (scoped/unscoped)', () => {
    expect(fieldBag.all('nonexistent')).toEqual([])

    expect(fieldBag.all().length).toBe(5)
    expect(fieldBag.all('formOne').length).toBe(2)
    expect(fieldBag.all('formTwo').length).toBe(3)

    expect(fieldBag.all('formOne').every(f => f.scope === 'formOne')).toBe(true)
    expect(fieldBag.all('formTwo').every(f => f.scope === 'formTwo')).toBe(true)
  })

  test('Check field existance', () => {
    expect(fieldBag.has('fullName', 'nonexistent')).toBe(false)
    expect(fieldBag.has('fullName', 'formOne')).toBe(true)
    expect(fieldBag.has('fullName', 'formTwo')).toBe(true)
    expect(fieldBag.has('gender', 'formOne')).toBe(false)
    expect(fieldBag.has('gender')).toBe(true)
  })

  test('Adding fields', () => {
    fieldBag.push(new Field(dummyField()))

    expect(fieldBag.has('dummyField')).toBe(true)

    fieldBag.push([
      new Field(dummyField('newFieldOne')),
      new Field(dummyField('newFieldTwo')),
      new Field(dummyField('newFieldThree'))
    ])

    expect(fieldBag.has('newFieldOne')).toBe(true)
    expect(fieldBag.has('newFieldTwo')).toBe(true)
    expect(fieldBag.has('newFieldThree')).toBe(true)
  })
})