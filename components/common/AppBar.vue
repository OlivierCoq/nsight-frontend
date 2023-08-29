<template>
  <div id="appBar">  
    <v-app-bar :class="authData.user.preferences.dark_mode ? 'dark' : ''">
      <!-- <v-app-bar-nav-icon @click="state.drawer = !state.drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <NuxtLink to="/dashboard" class="text-decoration-none" :class="authData.user.preferences.dark_mode ? 'text-white' : 'text-dark'">
          <span class="fw-bold me-4">nSight</span>
        </NuxtLink>
        <NuxtLink to="/Shop" class="text-decoration-none" :class="authData.user.preferences.dark_mode ? 'text-white' : 'text-dark'">
          <span class="fw-bold">Shop</span>
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="authData.loggedIn" text @click="sign_out">Sign Out</v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { reactive, computed, onBeforeMount } from 'vue'
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