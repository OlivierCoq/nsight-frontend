<template>
  <div id="appBar">
    <v-app-bar v-if="authData.user" :class="authData.user.preferences[0].dark_mode ? 'dark' : ''">
      <!-- <v-app-bar-nav-icon @click="state.drawer = !state.drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <NuxtLink to="/dashboard" class="text-decoration-none"
          :class="authData.user.preferences[0].dark_mode ? 'text-white' : 'text-dark'">
          <span class="fw-bold me-4">nSight</span>
        </NuxtLink>
        <NuxtLink to="/shop/products" class="text-decoration-none"
          :class="authData.user.preferences[0].dark_mode ? 'text-white' : 'text-dark'">
          <span class="fw-bold">Shop</span>
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer v-if="!state.search.searching" />
      <v-text-field v-if="state.search.searching" v-model="state.search.query" class="ctr-search " flat density="compact"
        hide-details :loading="state.search.loading" :disabled="state.search.loading"
        :placeholder="state.search.loading ? 'Searching...' : 'Search...'" @input="doSearch" @focusout="toggleSearch" />
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mx-4 btn-search" @click="toggleSearch">
        <v-tooltip activator="parent" location="bottom" open-delay="500">Search products, users, and more</v-tooltip>
      </font-awesome-icon>
      <NuxtLink to="/account" class="text-decoration-none username"
        :class="authData.user.preferences[0].dark_mode ? 'text-white' : 'text-dark'">
        <span class="fw-bold">{{ authData.user.first_name }}</span>
        <v-tooltip activator="parent" location="bottom" open-delay="500">{{ authData.user.email }}</v-tooltip>
      </NuxtLink>
      <font-awesome-icon :icon="['fas', 'cart-shopping']" class="me-4 btn-cart" @click="goToCart" />
      <div v-if="authData.user && authData.user.cart && prodStore.cart && prodStore.cart.total_items"
        class="num_count d-flex flex-row justify-center align-center">
        {{ prodStore.cart.total_items }}
      </div>
      <v-btn v-if="authData.loggedIn" text @click="sign_out">Sign Out</v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { reactive, computed, onBeforeMount } from 'vue'
import { authStore } from '~/stores/auth'
import { productsStore } from '~/stores/products'

export default {
  name: 'AppBar',
  setup() {
    const auth = authStore()
    const state = reactive({
      drawer: false,
      search: {
        query: '',
        results: [],
        searching: false,
        loading: false
      }
    })
    // computed
    const authData = computed(() => authStore())
    const prodStore = productsStore()

    // methods
    const sign_out = async () => {
      await auth.logout()
    }
    const goToCart = () => {
      navigateTo('/cart')
    }
    const toggleSearch = () => {
      state.search.searching = !state.search.searching
    }
    const doSearch = () => {
      // console.log('searching', state.search)
    }

    return {
      // state/data
      state,
      // computed
      authData,
      prodStore,
      // methods,
      sign_out,
      goToCart,
      doSearch,
      toggleSearch
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

  .username {
    margin-right: 1rem;
    text-transform: lowercase;
  }

  .btn-search,
  .btn-cart {
    cursor: pointer;
  }

  .num_count {
    height: 20px;
    width: 20px;
    background: red;
    margin-left: -24px;
    margin-bottom: -18px;
    border-radius: 14px;
    font-size: 12px;
  }
}
</style>