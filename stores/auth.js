import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const runtimeConfig = useRuntimeConfig()

import { productsStore } from './products'

export const authStore = defineStore({
  id: 'authStore',
  state: () => {
    return {
      user: null,
      token: null,
      loggedIn: false,
      errors: false,
    }
  },
  actions: {
    async login(payload) {

      const prodStore = productsStore()

      const res = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/local`, {
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if(res.statusCode === 400) {
        this.errors = res.data.message[0].messages[0].message
      } else {
        this.errors = false

        // ofetch:
        globalThis.$fetch = ofetch.create({ 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res.jwt}`
          }
        })

        const custom_data = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${res.user.id}?populate=*`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${res.jwt}`
            }
          })
          if(custom_data.statusCode === 400) {
            this.errors = custom_data.data.message[0].messages[0].message
          } else {
            // console.log('custom_data: ', custom_data)
            this.errors = false
            this.user = custom_data
            this.token = res.jwt
            this.loggedIn = true
            localStorage.setItem('token', res.jwt)
            localStorage.setItem('user', JSON.stringify(custom_data))

            // Take care of user cart
            prodStore.getCommerceData()

            setTimeout(() => {
              navigateTo('/dashboard')
            }, 1000)
          }
        return res
      }
                
    },
    async logout() {
      const prodStore = productsStore()

      this.token = null
      this.loggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      prodStore.cart = null

        // take care of user cart
      document.cookie = 'commercejs_cart_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      // remove X-Authorization header:
      globalThis.$fetch = ofetch.create({ 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigateTo('/')
    }
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})