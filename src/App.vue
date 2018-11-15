<template>
  <div id="app">
    <c-form :fields="fields" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import CForm from '@/components/CForm.vue'
import formTemplate from '@/templates/SimpleForm.json'

@Component({
  components: { CForm },
})
export default class App extends Vue {
  fields: Form.FieldTemplate[] = formTemplate
}
</script>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  & > .c-form-container { width: 100%; padding: 0 250px; }

  & > .c-form-container > .c-form { width: 400px; }
  & > .c-form-container > .c-form > .fields > .select > .label { left: 0px; }

  & > .c-form-container > .c-form > .actions { justify-content: center; }
  & > .c-form-container > .c-form > .actions > .action { max-width: 100%; }
}
</style>
