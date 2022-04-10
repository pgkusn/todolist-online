import { useForm } from 'vee-validate'
import { useFieldHelper } from './field'

export const useValidator = () => {
  const { handleSubmit } = useForm()

  const {
    value: email,
    errorMessage: emailError,
    validationListeners: emailListeners,
  } = useFieldHelper('email', 'required|email')

  const {
    value: password,
    errorMessage: passwordError,
    validationListeners: passwordListeners,
  } = useFieldHelper('password', 'required')

  return {
    handleSubmit,
    email,
    emailError,
    emailListeners,
    password,
    passwordError,
    passwordListeners,
  }
}