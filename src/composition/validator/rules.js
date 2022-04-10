import { defineRule } from 'vee-validate'

defineRule('required', value => {
  if (!value) {
    return '此欄位不可留空'
  }
  return true
})

defineRule('email', value => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regex.test(value)) {
    return '信箱格式不正確'
  }
  return true
})

defineRule('confirm', (value, [other]) => {
  if (value !== other) {
    return '兩次密碼輸入不一致'
  }
  return true
})
