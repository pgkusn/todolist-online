import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'sweetalert2/src/sweetalert2.scss'
import './composition/validator/rules'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  },
})

app.use(createPinia()).use(router).mount('#app')
