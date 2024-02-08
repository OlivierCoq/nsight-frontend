import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'
const runtimeConfig = useRuntimeConfig()



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { authStore } from './auth'

// Square
import { Client, Environment, ApiError, } from 'square'
const square_client = new Client({
  accessToken: runtimeConfig.public.SQUARE_ACCESS_TOKEN,
  // Procution environment:
  // environment: Environment.Production
  environment: Environment.Sandbox
})

export const productsStore = defineStore({
  id: 'productsStore',
  state: () => {
    return {
      merchant: null,
      categories: null,
      products: null,
      cart: null,
      cart_obj: null,
      square_client: square_client,
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
