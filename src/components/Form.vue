<template>
  <div class="vue-form">
    <c-form
      :fields="fields"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import CForm from '@/components/CForm.vue'
import formTemplate from '@/templates/SimpleForm.json'

@Component({
  components: { CForm }
})
export default class VueForm extends Vue {
  fields: Form.FieldTemplate[] = formTemplate
}
</script>

<style lang="scss">

.vue-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  & > .c-form { width: 400px; }
  & > .c-form > .fields > .select > .label { left: 0px; }

  & > .c-form > .actions { justify-content: center; }
  & > .c-form > .actions > .action { max-width: 100%; }
}
</style>
