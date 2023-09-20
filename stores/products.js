import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'
const runtimeConfig = useRuntimeConfig()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import commerce from '~/common/commerce.js'
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
    async getCommerceData() {

      const [merch, cat, prods ] = await Promise.all([
        commerce.merchants.about(),
        commerce.categories.list(),
        commerce.products.list()
      ])

      this.merchant = merch
      this.categories = cat
      this.products = prods
      this.initCart()
    },
    async initCart() {

      const auth = authStore()

      // check to see if auth.user has cart. If so, retrieve commerce cart with auth.user.cart. if not, create new cart and set user cart to this new cart:

      if(auth.user.cart) {
        const cart = await commerce.cart.retrieve(auth.user.cart).then((cart) => cart)
        this.cart = cart
      } else {
        const cart = await commerce.cart.retrieve().then((cart) => cart)
        this.cart = cart
        auth.user.cart = cart.id
      }

      const update_user = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${auth.user.id}`,{
        'method': 'PUT',
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'body': JSON.stringify(auth.user)
      })
      commerce.cart.retrieve(auth.user.cart).then((cart) => {
        // using vanilla JS, create a cookie called commercejs_cart_id with the value of cart.id:
        document.cookie = `commercejs_cart_id=${cart.id};path=/;max-age=2592000;`
        this.user = update_user
      })
    }
  },
  getters: {
    
  },
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
