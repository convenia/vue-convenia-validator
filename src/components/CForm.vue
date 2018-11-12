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
          <template v-for="field in fields">
            <!-- Add support for checkboxes, radio buttons, and textareas -->

            <c-select
              v-if="['select'].includes(field.type)"
              class="select field"
              :key="field.name"
              :name="field.name"
              :validation="getValidationMsg(field)"
              :value="getSelectValue(field)"
              v-bind="field"
              @input="formData[field.name] = field.trackBy ? $event[field.trackBy] : $event"
            />

            <c-input
              v-else
              class="field"
              :name="field.name"
              :key="field.name"
              :validation="getValidationMsg(field)"
              :value="formData[field.name]"
              v-bind="field"
              @input="formData[field.name] = $event"
            />
          </template>
        </slot>
      </div>

      <div class="actions">
        <slot name="actions">
          <c-button error class="action" @click.stop="$validator.reset()">
            Reset
          </c-button>
          <c-button primary class="action" @click.stop="$validator.validateAll()">
            Salvar
          </c-button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins, Watch } from 'vue-property-decorator'

import FormValidator from '@/plugins/validator'


@Component
export default class CForm extends Mixins(FormValidator) {
  @Prop(Array) fields!: Form.FieldTemplate[]
  @Prop(Boolean) disabled: boolean
  @Prop(Boolean) loading: boolean

  private formData: { [name: string]: any } = { }

  getValidationMsg (fieldDef: Form.FieldTemplate): string {
    const field = this.$validator.fields.get(fieldDef.name)
    if (!field) return ''

    return field.errors.length
      ? fieldDef.validationMsg || field.error
      : ''
  }

  getSelectValue (field: Form.SelectField): Form.SelectFieldOption {
    const options = <Form.SelectFieldOption[]>field.options

    return options.find(option => {
      return field.trackBy
        ? option[field.trackBy] === this.formData[field.name]
        : option === this.formData[field.name]
    }) || ''
  }

  submit () {
    console.log('CForm.validator: ', this.$validator)
  }

  created () {
    const test =
      [{ "type": "text"
       , "name": "testfullName"
       , "label": "Nome completo"
       , "placeholder": "Nome completo"
       , "validation": "required"
       , "value": ""
       }]

    this.$validator.init({ formData: this.fields })

    this.formData = this.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.value
    }), { })
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
