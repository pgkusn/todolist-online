import { defineStore } from 'pinia'
import router from '@/router'
import { api } from '../composition/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    nickname: '',
  }),
  actions: {
    getUserData() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData) {
        this.email = userData.email
        this.nickname = userData.nickname
      }
    },
    logout() {
      this.$reset()
      localStorage.removeItem('userData')
      router.push({ name: 'Login' })
    },
    async login(user) {
      try {
        const { data, headers } = await api.post('/users/sign_in', user)
        this.email = data.email
        this.nickname = data.nickname
        localStorage.setItem('userData', JSON.stringify({
          ...this.$state,
          authToken: headers.authorization
        }))
        return data
      } catch (error) {
        throw error
      }
    },
    async signup(user) {
      try {
        const { data } = await api.post('/users', user)
        return data
      } catch (error) {
        throw error
      }
    },
  },
})
