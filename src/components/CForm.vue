<template>
  <div class="c-form-container">
    <div class="validations">
      <pre>
        {{ $validations }}
      </pre>
    </div>

    <form class="c-form" name="formData" @submit.prevent="$emit('submit', formData)">
      <div class="fields">
        <slot>
          <template v-for="(field, fieldName) in allFields">
            <!-- Add support for checkboxes, radio buttons, and textareas -->

            <c-select
              v-if="['select'].includes(field.type)"
              class="select field"
              :key="fieldName"
              :name="fieldName"
              :validation="getValidationMsg(field)"
              :value="getSelectValue(field)"
              v-bind="field"
              @input="formData[fieldName] = field.trackBy ? $event[field.trackBy] : $event"
            />

            <c-input
              v-else
              class="field"
              :name="fieldName"
              :key="fieldName"
              :validation="getValidationMsg(field)"
              :value="formData[fieldName]"
              v-bind="field"
              @input="formData[fieldName] = $event"
            />
          </template>
        </slot>
      </div>

      <div class="actions">
        <slot name="actions">
          <c-button success class="action" @click.stop="attach">
            Attach
          </c-button>
          <c-button error class="action" @click.stop="detach">
            Detach
          </c-button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins, Watch } from 'vue-property-decorator'

import FormValidator from '@/validator/index'
//import FormValidator from 'cee-validate'

type SelectFieldOption = string | { label: string, value: any }

@Component
export default class CForm extends Mixins(FormValidator) {
  @Prop(Object) fields!: Form.FieldTemplate[]
  @Prop(Boolean) disabled: boolean
  @Prop(Boolean) loading: boolean

  private formData: { [name: string]: any } = { }
  private allFields: any = {}

  getValidationMsg (fieldDef: Form.FieldTemplate): string {
    const field = this.$validator.fields.get(fieldDef.name)
    if (!field) return ''

    return field.errors.length
      ? fieldDef.validationMsg || field.error
      : ''
  }

  getSelectValue (field: Form.SelectField): SelectFieldOption {
    const options = <SelectFieldOption[]>field.options

    return options.find(option => {
      return field.trackBy
        ? option[field.trackBy] === this.formData[field.name]
        : option === this.formData[field.name]
    }) || ''
  }

  attach () {
    const testField = {
      name: 'testField',
      rules: 'required',
      scope: 'formData'
    }

    const testFieldDef = {
      type: 'text',
      placeholder: 'Test Field',
      label: 'Test Field',
      validation: 'required',
      value: ''
    }

    this.allFields = { ...this.allFields, testField: testFieldDef }

    this.$set(this.formData, 'testField', 'imdo')
    this.$nextTick(() => this.$validator.attach(testField))
  }

  detach () {
    const { testField, ...fields } = this.allFields
    this.allFields = fields
    this.$delete(this.formData, 'testField')

    this.$validator.detach('testField', 'formData')
  }

  created () {
    const reduceToValue = (entity: any, key: any, ignoreEmpty: any): any =>
      Object.keys(entity)
        .reduce((acc: any, propName: any) => ({
          ...acc,
          ...(!(entity[propName] || {})[key] && ignoreEmpty
            ? {}
            : { [propName]: (entity[propName] || {})[key] })
        }), {})

    // This is just so we can test the new attach/detach methods
    this.allFields = { ...this.fields }
    const validations = reduceToValue(this.fields, 'validation', true)

    Object.keys(this.fields).forEach(field => {
      const fieldObj = this.fields[field] || {}

      if (typeof fieldObj.validation === 'function') {
        this.$watch('formData', (val) => {
          const newRule = fieldObj.validation(val)
          this.$validator.setFieldRule({ name: field, scope: 'formData' }, newRule)
        }, { deep: true })
      }
    })

    this.formData = reduceToValue(this.fields, 'value')
    this.$validator.init({ formData: validations })
  }
}
</script>

<style lang="scss">

.c-form-container {
  display: flex;
  justify-content: space-between;
}

.c-form {

  & > .fields {

    & > .field:not(:last-child):not(.-validation) { margin-bottom: 30px; }

    & > .field.-validation { margin-bottom: 45px; }
  }

  & > .actions {
    display: flex;
    justify-content: flex-end;

    margin-top: 40px;

    & > .action {
      flex: 1 1;
      max-width: 180px;

      &:not(:last-child) { margin-right: 10px; }
    }
  }
}
</style>
