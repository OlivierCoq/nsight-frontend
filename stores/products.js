import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'
const runtimeConfig = useRuntimeConfig()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { authStore } from './auth'

export const productsStore = defineStore({
  id: 'productsStore',
  state: () => {
    return {
      merchant: null,
      categories: null,
      products: null,
      cart: null
    }
  },
  actions: {

    async initCart() {

      const auth = authStore()

    }
  },
  getters: {

  },
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
