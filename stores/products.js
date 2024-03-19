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
      filters: {
        category: null,
        search: null,
        sort: { field: 'name', order: 'asc' },
        limit: 10,
        offset: 0
      },
      products: null,
      cart: null,
      cart_obj: null,
      // square_client: square_client,
    }
  },
  actions: {

    async initCart() {

      const auth = authStore()

    },
    getProducts() {
    
      $fetch(`/api/square/list-catalog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }).then((square_res) => {
        // console.log('square_res', square_res);
        this.products = square_res.products
        this.categories = square_res.categories
      });

    }
  },
  getters: {

  },
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
