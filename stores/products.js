import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const productsStore = defineStore({
  id: 'productsStore',
  state: () => {
    return {}
  },
  actions: {},
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
