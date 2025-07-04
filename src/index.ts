import { nextTick, onMounted, ref, computed, watch } from 'vue'

import ScopedValidator from './core/scopedValidator'

export default (formElRef: any, options: any) => {
  const validator: any = ref(null)
  const validations: any = computed(() => validator?.value?.validations)
  const { validatorOptions, scope, formData } = options || {}

  onMounted(() => {
    validator.value = new ScopedValidator({
      $nextTick: nextTick,
      $options: {
        validatorOptions
      },
      [scope]: formData,
      $el: formElRef.value,
      $watch: watch
    })
  })

  return {
    validator,
    validations
  }
}
