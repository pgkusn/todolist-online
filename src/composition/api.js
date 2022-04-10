import axios from 'axios'
import Swal from 'sweetalert2'
import { useStore } from '../stores/'
import { useUserStore } from '../stores/user'

const api = axios.create()

api.defaults.baseURL = 'https://todoo.5xcamp.us'

api.interceptors.request.use(
  function (config) {
    const store = useStore()
    store.isLoading = true
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    const store = useStore()
    store.isLoading = false
    return response
  },
  async function (error) {
    const store = useStore()
    store.isLoading = false
    await Swal.fire({
      icon: 'error',
      title: error.response.data.message || '發生不明錯誤',
    })
    if (error.response.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
    }
    return Promise.reject(error)
  }
)

export { api }