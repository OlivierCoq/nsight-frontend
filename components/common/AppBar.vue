<template>
  <div id="appBar">
    <!-- mobile -->
    <!-- Tablet & larger -->
    <div class="w-full h-[50px] bg-zinc-400 dark:bg-zinc-800 flex flex-row justify-between fixed z-50">
      <div class="flex flex-row h-full justify-start align-center items-center w-1/6" >
        <a href="/home" class="w-[50px] p-2">
          <img :src="logo" alt="nSight Logo" class="w-full h-full" />
        </a>
        <NuxtLink to="/shop/products" class="text-decoration-none ms-5">
          <span class="fw-bold text-neutral-900 dark:text-white">Shop</span>
        </NuxtLink>
      </div>
      <div class="flex flex-row h-full justify-end align-start items-center mx-5 w-2/3">
        <input
          v-show="state.search.searching"
          v-model="state.search.query"
          class="w-full h-[30px] px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-transparent text-neutral-900 dark:text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search..."
          @input="doSearch"
          @focusout="toggleSearch"
        />
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="mx-4 btn-search cursor-pointer text-neutral-900 dark:text-white"
          @click="toggleSearch"
          v-tooltip.bottom="'Search products, users, and more'"
        >
        </font-awesome-icon>
      </div>
      <div class="flex flex-row h-full justify-between align-start items-center w-1/6">

          <!-- Cart -->
          <div>
            <font-awesome-icon
              :icon="['fas', 'cart-shopping']"
              class="me-5 btn-cart cursor-pointer text-neutral-900 dark:text-white"
              @click="goToCart"
            />
            <div
              v-if="prodStore.cart?.checkout?.order?.order?.lineItems?.length"
              class="num_count d-flex flex-row justify-center align-center text-center"
            >
              <span class="text-white" v-tooltip="'Items in cart'">
                {{ prodStore.cart?.checkout?.order?.order?.lineItems?.length }}
              </span>
            </div>
          </div>

          <!-- User -->
          <NuxtLink to="/account"  class="text-decoration-none username" 
            :class="authData?.user?.preferences[0].dark_mode ? 'text-white' : 'text-dark'"
          >
            <span
              class="fw-bold relative text-neutral-900 dark:text-white"
              v-tooltip.bottom="authData?.user?.email"
              >{{ authData?.user?.first_name }}</span
            >
          </NuxtLink>
          
          <!-- Sign Out -->
          <button v-if="authData?.loggedIn" text @click="sign_out">
            <span class="text-neutral-900 dark:text-white text-xs uppercase">Sign Out</span>
          </button>

          <!-- Dark Mode -->
          <font-awesome-icon
            :icon="['fas', `${settings.dark_mode ? 'moon' : 'sun' }`]"
            class="me-6 btn-cart cursor-pointer text-neutral-900 dark:text-white"
            @click="settings.toggleLighting()"
          />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from "~/assets/images/logo/nsight_clear.png";

const auth = authStore();
const state = reactive({
  drawer: false,
  search: {
    query: "",
    results: [],
    searching: false,
    loading: false,
  },
});
// computed
const authData = computed(() => authStore())
const prodStore = productsStore()
const settings = settingsStore()

// methods
const sign_out = async () => {
  await auth.logout();
};
const goToCart = () => {
  navigateTo("/cart");
};
const toggleSearch = () => {
  state.search.searching = !state.search.searching;
};
const doSearch = () => {
  // console.log('searching', state.search)
};

</script>
<style lang="scss">
#appBar {
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
.p-tooltip {
  background-color: #000000d9;
  color: #fff;
  padding: 0.2rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
  position: absolute;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
</style>
