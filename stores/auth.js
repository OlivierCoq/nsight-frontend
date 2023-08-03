import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ofetch } from 'ofetch'

// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

export const authStore = defineStore({
  id: 'authStore',
  state: () => {
    return {
      user: null,
      token: null,
      loggedIn: false
    }
  },
  actions: {},
  getters: {},
  persist: true
})