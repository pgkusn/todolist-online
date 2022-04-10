import { computed } from 'vue'
import { useField } from 'vee-validate'

export const useFieldHelper = (fieldName, rules, opts = { validateOnValueUpdate: false }) => {
  const { value, errorMessage, handleChange } = useField(fieldName, rules, opts)

  const validationListeners = computed(() => {
    // If the field is valid or have not been validated yet
    // lazy
    if (!errorMessage.value) {
      return {
        blur: handleChange,
        change: handleChange,
        input: e => handleChange(e, false),
      }
    }
    // Aggressive
    return {
      blur: handleChange,
      change: handleChange,
      input: handleChange,
    }
  })
  
  return {
    value,
    errorMessage,
    validationListeners,
  }
}
