import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ofetch } from "ofetch";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const runtimeConfig = useRuntimeConfig();

// Import auth store:
import { authStore } from "./auth";



export const settingsStore = defineStore({
  id: "settingsStore",
  state: () => {
    return {
      dark_mode: true,
      account: {},
    };
  },
  actions: {
    toggleLighting() {
      const auth = authStore()
      auth.user.preferences[0].dark_mode = !auth.user.preferences[0].dark_mode
      this.dark_mode = !this.dark_mode;
      auth.updateUser()
    },
    initSettings() {
      const auth = authStore()
      if (auth.loggedIn) {
        this.dark_mode = auth.user.preferences[0].dark_mode
      }
    }
  },
  getters: {},
  persist: {
    enabled: true,
  },
});
