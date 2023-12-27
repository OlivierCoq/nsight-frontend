import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const runtimeConfig = useRuntimeConfig()

import { productsStore } from './products'

import { customFetch } from '~/composables/custom_fetch.ts'
const useCustomFetch = customFetch()

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

      // Sign in to Strapi:
      const res = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Authorization': 'sk_53949a5c411dc56df0ca99f9244ee7dda728fb43df7b9'
        },
        body: JSON.stringify(payload)
      })
      if (res.statusCode === 400) {
        this.errors = res.data.message[0].messages[0].message
      } else {
        this.errors = false

        // ofetch: Make sure to set the Authorization header for all future requests:
        globalThis.$fetch = ofetch.create({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res.jwt}`
          }
        })
        // Get user data from Strapi:
        const custom_data = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${res.user.id}?populate=*`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${res.jwt}`,
            'X-Authorization': 'sk_53949a5c411dc56df0ca99f9244ee7dda728fb43df7b9'
          }
        })
        if (custom_data.statusCode === 400) {
          this.errors = custom_data.data.message[0].messages[0].message
        } else {
          // console.log('custom_data: ', custom_data)
          this.errors = false
          this.user = custom_data
          this.token = res.jwt
          this.loggedIn = true
          localStorage.setItem('token', res.jwt)
          localStorage.setItem('user', JSON.stringify(custom_data))

          // Really fucking messy right now, but I'll have to clean up later. I need to get this project done:
          globalThis.$fetch = ofetch.create({
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${res.jwt}`,
              // .'X-Authorization' : 'sk_53949a5c411dc56df0ca99f9244ee7dda728fb43df7b9'
              'X-Authorization': runtimeConfig.apiSecret
            }
          })

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

      // remove X-Authorization header:
      globalThis.$fetch = ofetch.create({
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigateTo('/')
    },
    async updateUser() {
      $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${this.user.id}`, {
        'method': 'PUT',
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'body': JSON.stringify(this.user)
      })
    }
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})