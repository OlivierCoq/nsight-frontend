<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon @click="state.drawer = !state.drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>nSight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" text @click="sign_out">Sign Out</v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { mapState, mapActions } from 'pinia'
import { authStore } from '~/stores/auth'
export default {
  name: 'AppBar',
  setup() {
    const auth = authStore()
    const state = reactive({
      drawer: false,
      loggedIn: false
    })
    const loggedIn = computed(() => auth.loggedIn)

    // methods
    const sign_out = async () => {
      await auth.logout()
    }
    return {
      // state/data
      state, 
      loggedIn,
      // methods,
      sign_out
    }
  }
}
</script>