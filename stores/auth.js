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

        // Uncomment for production
    //const res = await $fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      const res = await $fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if(res.statusCode === 400) {
        this.errors = res.data.message[0].messages[0].message
      } else {
        this.errors = false
        this.setUserToken(res.jwt, res.user)
        localStorage.setItem('user', JSON.stringify(res.user))
      }
                
    },
    setUserToken(token, user) {
      this.token = token
      this.loggedIn = true
      localStorage.setItem('token', token)
      this.user = user

      globalThis.$fetch = ofetch.create({ 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      navigateTo('/dashboard')
    }
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})