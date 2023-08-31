<template>
  <div style="height: 100vh;" :class="auth.user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
      <!-- <NuxtLink to="section/">index</NuxtLink>
      <NuxtLink to="section/out1">out1</NuxtLink>
      <NuxtLink to="section/out2">out2</NuxtLink> -->
      <NuxtPage />
  </div>
</template>
<script>
  import { reactive } from 'vue'
  import { authStore } from '@/stores/auth'
  import { productsStore } from '@/stores/products'
  export default {
    name: 'Cart',
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