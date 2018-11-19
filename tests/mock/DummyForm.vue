<template>
  <div class="dummy-form">
    <form name="formOne">
      <input type="text" name="fullName" v-model="formOne.fullName" />
      <input type="text" name="age" v-model="formOne.age "/>
    </form>

    <input type="text" name="birthday" v-model="birthday">
  </div>
</template>

<script>
//import FormValidator from '../../src/index.ts'
const FormValidator = require('../../src/index.ts')

module.exports = {
  mixins: [ FormValidator ],

  data () {
    return {
      birthday: '',
      formOne: {
        fullName: '',
        age: ''
      }
    }
  }
}
</script>
