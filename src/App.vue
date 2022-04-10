<template>
  <router-view></router-view>
  <Loading v-show="isLoading" />
</template>

<script>
import { computed } from 'vue'
import Loading from '@/components/Loading.vue'
import { useStore } from '@/stores'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    Loading,
  },
  setup() {
    const store = useStore()
    const userStore = useUserStore()

    const isLoading = computed(() => store.isLoading)
    userStore.getUserData()

    return {
      isLoading,
    }
  },
}
</script>

<style lang="scss" src="@/assets/style.scss" />
