import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from './stores/user'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/list',
    },
    {
      path: '/list/:state?',
      name: 'Home',
      component: Home,
      props: true,
      beforeEnter(to, from, next) {
        const userStore = useUserStore()
        if (userStore.email) {
          next()
        } else {
          next({ name: 'Login' })
        }
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
