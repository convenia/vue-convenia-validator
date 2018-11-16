<h1 align="center">vue-convenia-validator</h1>

vue-convenia-validator is a model-based form validation library for Vue.js
inspired by Vuelidate and VeeValidate. Unlike Vuelidate and VeeValidate,
vue-convenia-validator is meant to be used as a mixin rather than as a plugin.


### Installation

#### npm

```
npm install cee-validate --save
```

#### yarn

```
yarn add cee-validate
```

### Usage

vue-convenia-validator is a model-based, template-independent validation library,
which means that it is completely decoupled from how you build your templates.
In order to use your component has to define a `validation` option object
defining the validation rules for your form(s):

```vue
<template>
  <div id="vue-app">
    <form>
      <input name="fullName" type="text" v-model="fullName" />
      <input name="birthday" type="text" v-model="birthday" />
    </form>
  </div>
<template>

<script>
import FormValidator from 'cee-validate'

export default {
  mixins: [ FormValidator ],

  data () {
    return {
      fullName: '',
      birthday: ''
    }
  }

  validation: {
    fullName: 'required',
    birthday: 'required|date_format:DD/MM/YYYY'
  }
}
<script>
```

The `name` attribute on the `<input />` fields here is necessary for the mixin
to be able to listen for certain events on the form elements. The `name`
attribute is only necessary on the `<form>` tag when using scoped forms:

```vue
<template>
  <div id="vue-app">
    <form name="formOne">
      <input name="fullName" type="text" v-model="formOne.fullName" />
      <input name="birthday" type="text" v-model="formOne.birthday" />
    </form>

    <form name="formTwo">
      <input name="fullName" type="text" v-model="formTwo.fullName" />
      <input name="birthday" type="text" v-model="formTwo.birthday" />
      <input name="age" type="number" v-model="formTwo.age" />
    </form>
  </div>
<template>

<script>
import FormValidator from 'cee-validate'

export default {
  mixins: [ FormValidator ],

  data () {
    return {
      formOne: {
        fullName: '',
        birthday: ''
      },
      formTwo: {
        fullName: '',
        birthday: ''
      }
    }
  }

  validation: {
    formOne: {
      fullName: 'required',
      birthday: 'required|date_format:DD/MM/YYYY'
    },
    formTwo: {
      fullName: 'required',
      birthday: 'required|date_format:DD/MM/YYYY'
      age: 'numeric'
    }
  }
}
<script>
```

### To-do

- Implement rules
  - [x] alphanumeric - Checks if all characters in a string are alphanumeric.
  - [x] custom - Executes a callback or array of callbacks with input value as argument.
  - [x] dateFormat - Checks if value is a valid date.
  - [x] numeric - Check if all characters in a string are numbers.
  - [x] regex - Tests a RegExp on value.
  - [x] required - Checks if value isn't empty.
  - [ ] dateBetween - Checks if date is in between two date values.
  - [ ] dateBefore - Checks if given date comes before another date.
  - [ ] dateAfter - Cheks if given date comes after another date.
  - [ ] between - Checks if number is in between two values.
  - [ ] email - Checks if value is a valid email address.
  - [ ] url - Checks if value is a valid URL address.
  - [ ] ip - Checks if value is a valid IP address.
  - [ ] credit card - Checks if value is a valid credit card number.

- Implement unit tests
- Improve project documentaion
- Implement option to customize validation error messages
- Implement vue directive