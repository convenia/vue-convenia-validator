<template>
  <form class="c-form" :name="scope" @submit.prevent="$emit('submit', formData)">
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
            :validation="getValidationMsg(field.name)"
            v-bind="field"
            v-model="formData[field.name]"
          />
        </template>
      </slot>
    </div>

    <div class="actions">
      <slot name="actions">
        <c-button primary class="action">
          Salvar
        </c-button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'

import FormValidator from '@/plugins/validator/mixin'

type SelectFieldOption = string | { label: string, value: any }

@Component
export default class CForm extends Mixins(FormValidator) {
  @Prop(Array) fields!: Form.FieldTemplate[]
  @Prop(Boolean) loading: boolean
  @Prop(Boolean) disabled: boolean
  @Prop(String) scope: string

  private formData: { [name: string]: any } = { }

  getValidationMsg (field : Form.FieldTemplate): string {
    return this.$errors.has(field.name)
      ? field.validationMsg || this.$errors.first(field.name)
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

  created () {
    this.$validator.init(this.scope ? { [this.scope]: this.fields } : this.fields)

    this.formData = this.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.value
    }), { })
  }
}
</script>

<style lang="scss">
.c-form {

  & > .fields {

    & > .field:not(:last-child) { margin-bottom: 30px; }
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
