<template>
  <div class="dummy-form">
    <form name="formOne">
      <input type="text" name="fullName" v-model="formOne.fullName" />
      <input type="text" name="age" v-model="formOne.age "/>
    </form>

    <input type="text" name="birthday" v-model="birthday">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator'
import FormValidator from '../../src/index.ts'

@Component
export default class DummyForm extends Mixins(FormValidator) {
  formOne = { fullName: '', age: '' }
  birthday = ''

  updateFullName () {
    this.formOne.fullName = 'Jon Doe'
  }

  updateAge () {
    this.formOne.age = '4'
  }

  updateBirthday () {
    this.birthday = '20/02/1940'
  }

  ageCallback (age: string): boolean {
    return +age > 5
  }
}
</script>
