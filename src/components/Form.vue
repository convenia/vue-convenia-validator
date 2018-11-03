<template>
  <div class="vue-form">
    <input
      v-for="field in fields"
      :key="field.name"
      v-bind="field"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'

import formTemplate from '@/templates/SimpleForm.json'

import FormValidator from '@/plugins/validator/mixin/index.ts'
import { Field } from '@/plugins/validator/types/index.ts'

@Component
export default class VueForm extends Mixins(FormValidator) {
  fields: Field[] = formTemplate

  created () {
    this.$validator.init(this.fields)
  }
}
</script>

<style scoped lang="scss">

.vue-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  input {
    font-size: 16px;
    max-width: 200px;

    &:not(:last-child) { margin-bottom: 15px; }
  }
}
</style>
