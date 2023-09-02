<template>
  <div style="height: 100vh;" :class="auth.user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
      <NuxtPage />
  </div>
</template>
<script>
  import { reactive } from 'vue'
  import { authStore } from '@/stores/auth'
  import { productsStore } from '@/stores/products'
  export default {
    name: 'Shop',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const state = reactive({

      })
      const auth = authStore()
      const products = productsStore()

      return {
        // meta
        definePageMeta,
        // state
        state,
        auth,
        // methods
      }
    },
  }
</script>