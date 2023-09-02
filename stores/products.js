import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import commerce from '~/common/commerce.js'

export const productsStore = defineStore({
  id: 'productsStore',
  state: () => {
    return {
      merchant: null,
      categories: null,
      products: null,
    }
  },
  actions: {
    async getCommerceData() {

      const [merch, cat, prods ] = await Promise.all([
        commerce.merchants.about(),
        commerce.categories.list(),
        commerce.products.list()
      ])

      this.merchant = merch
      this.categories = cat
      this.products = prods
    }
  },
  getters: {
    
  },
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
