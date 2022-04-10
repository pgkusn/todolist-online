<template>
  <div class="signUpView bg-yellow">
    <div class="container signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img class="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt=""
        /></a>
        <img class="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
      </div>
      <div>
        <form class="formControls" @submit.prevent="submitHandler">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input signUp_email"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            :value="email"
            v-on="emailListeners"
          />
          <span v-show="emailError">{{ emailError }}</span>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input signUp_nickname"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            :value="nickname"
            v-on="nicknameListeners"
          />
          <span v-show="nicknameError">{{ nicknameError }}</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input signUp_password"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            :value="password"
            v-on="passwordListeners"
          />
          <span v-show="passwordError">{{ passwordError }}</span>
          <label class="formControls_label" for="confirm">再次輸入密碼</label>
          <input
            class="formControls_input signUp_passwordConfirm"
            type="password"
            name="pwd"
            id="confirm"
            placeholder="請再次輸入密碼"
            :value="confirm"
            v-on="confirmListeners"
          />
          <span v-show="confirmError">{{ confirmError }}</span>
          <input class="formControls_btnSubmit signUp" type="submit" value="註冊帳號" />
          <router-link :to="{ name: 'Login' }" class="formControls_btnLink">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useUserStore } from '../stores/user'
import { useValidator } from '../composition/validator/signup'

export default {
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const {
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
    } = useValidator()

    const submitHandler = handleSubmit(async (values, { resetForm }) => {
      try {
        const { confirm, ...user } = values
        const { message } = await userStore.signup({ user })
        const result = await Swal.fire({
          icon: 'success',
          title: message,
          confirmButtonText: '前往登入',
        })
        if (result.isConfirmed) {
          router.push({ name: 'Login' })
        }
        resetForm()
      } catch (error) {
        console.error(error.message)
      }
    })

    return {
      submitHandler,
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
  },
}
</script>
