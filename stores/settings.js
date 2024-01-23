import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const runtimeConfig = useRuntimeConfig()



export const settingsStore = defineStore({
  id: 'settingsStore',
  state: () => {
    return {
      dark_mode: false,
      account: {

      }
    }
  },
  actions: {
    toggleDarkMode() {
      this.dark_mode = !this.dark_mode
    }
  },
  getters: {},
  persist: {
    enabled: true
  }
})