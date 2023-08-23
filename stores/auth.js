import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

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

        // production API:
      const res = await $fetch(`https://nsightapi.vip/api/auth/local`, {
    // const res = await $fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      // const res = await $fetch('http://localhost:1337/api/auth/local', {
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

        const custom_data = await $fetch(`https://nsightapi.vip/api/users/${res.user.id}?populate=*`, {
          // const custom_data = await $fetch(`http://localhost:1337/api/users/${res.user.id}?populate=*`, {
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
            console.log('custom_data: ', custom_data)
            this.errors = false
            this.user = custom_data
            this.token = res.jwt
            this.loggedIn = true
            localStorage.setItem('token', res.jwt)
            localStorage.setItem('user', JSON.stringify(custom_data))
            navigateTo('/dashboard')
          }
        return res
      }
                
    },
    async logout() {
      this.token = null
      this.loggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigateTo('/')
    }
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})