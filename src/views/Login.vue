<template>
  <div class="loginView bg-yellow">
    <div class="container loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img class="logoImg" src="https://user-images.githubusercontent.com/10492197/187050823-f78cc9b3-a62e-4e48-b52a-bf336b231de0.png" alt=""
        /></a>
        <img class="d-m-n" src="https://user-images.githubusercontent.com/10492197/187050825-f4f68aec-2df9-468f-b10c-b7cedfa40757.png" alt="workImg" />
      </div>
      <div>
        <form class="formControls" @submit.prevent="submitHandler">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input login_email"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            :value="email"
            v-on="emailListeners"
          />
          <span v-show="emailError">{{ emailError }}</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input login_password"
            type="password"
            id="pwd"
            name="pwd"
            placeholder="請輸入密碼"
            :value="password"
            v-on="passwordListeners"
          />
          <span v-show="passwordError">{{ passwordError }}</span>
          <input class="formControls_btnSubmit login" type="submit" value="登入" />
          <router-link :to="{ name: 'SignUp' }" class="formControls_btnLink">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useUserStore } from '@/stores/user'
import { useValidator } from '@/composition/validator/login'

export default {
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const {
      handleSubmit,
      email,
      emailError,
      emailListeners,
      password,
      passwordError,
      passwordListeners,
    } = useValidator()

    const submitHandler = handleSubmit(async user => {
      try {
        const { message } = await userStore.login({ user })
        await Swal.fire({
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500,
        })
        router.replace({ name: 'Home' })
      } catch (error) {
        password.value = ''
        console.error(error.message)
      }
    })

    return {
      submitHandler,
      email,
      emailError,
      emailListeners,
      password,
      passwordError,
      passwordListeners,
    }
  },
}
</script>
