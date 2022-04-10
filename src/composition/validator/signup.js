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
    value: nickname,
    errorMessage: nicknameError,
    validationListeners: nicknameListeners,
  } = useFieldHelper('nickname', 'required')

  const {
    value: password,
    errorMessage: passwordError,
    validationListeners: passwordListeners,
  } = useFieldHelper('password', 'required')

  const {
    value: confirm,
    errorMessage: confirmError,
    validationListeners: confirmListeners,
  } = useFieldHelper('confirm', 'required|confirm:@password')

  return {
    handleSubmit,
    email,
    emailError,
    emailListeners,
    nickname,
    nicknameError,
    nicknameListeners,
    password,
    passwordError,
    passwordListeners,
    confirm,
    confirmError,
    confirmListeners,
  }
}