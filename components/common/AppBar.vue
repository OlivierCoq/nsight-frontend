<template>
  <div v-if="authData.user" id="appBar">  
    <v-app-bar :class="authData.user.preferences.dark_mode ? 'dark' : ''">
      <v-app-bar-nav-icon @click="state.drawer = !state.drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>nSight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="authData.loggedIn" text @click="sign_out">Sign Out</v-btn>
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
      drawer: false
    })
    // computed
    const authData = computed(() => authStore())

    // methods
    const sign_out = async () => {
      await auth.logout()
    }

    return {
      // state/data
      state,
      // computed
      authData,
      // methods,
      sign_out
    }
  }
}
</script>
<style scoped lang="scss">
  #appBar {
    .v-app-bar {
      background-color: #fff;
      color: #000;
    }
    .v-app-bar.dark {
      background-color: #191818;
      color: #fff;
    }
  }
</style>