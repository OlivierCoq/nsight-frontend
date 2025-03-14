<template>
  <div
    id="products"
    class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20 relative"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="main__inner">
        <div
          class="cls-active: bg-zing-100/60 z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top sticky"
        >
          <div class="w-full flex flex-row justify-between">
            <div class="page__heading">
              <h1>Shop</h1>
            </div>
            <!-- font awesome shopping cart icon -->
            <a href="/cart">
              <div
                class="flex items-center gap-4 text-neutral-900 dark:text-white"
              >
                <font-awesome-icon :icon="['fas', 'shopping-cart']" class="hover:cursor-pointer" />
                <span>Cart</span>
                <!-- Number of items in cart: -->
                <span
                  v-if="prodStore?.cart?.checkout?.order?.order?.lineItems?.length"
                  class="bg-yellow-500 text-white text-sm rounded-full h-[25px] w-[25px] flex items-center justify-center"
                >
                  {{ prodStore?.cart?.checkout?.order?.order?.lineItems?.length }}
                </span>
              </div>
            </a>
          </div>
          <!-- tab style one -->
          <div class="overflow-hidden my-6">
            <div
              id="product-nav"
              class="relative flex items-center justify-between border-b dark:border-slate-800 uk-animation-slide-top-medium"
            >
              <!-- tabs -->
              <ul
                v-if="!state.search.isActive"
                class="flex gap-2 text-sm text-center text-gray-600 capitalize font-semibold dark:text-white/80 -mb-px h-[54px]"
                style="padding-left: 0px !important"
                uk-switcher="connect: #market_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
              >
                <li v-for="(tab, a) in state.tabs" :key="a">
                  <a
                    href="#"
                    class="flex items-center md:p-4 p-2.5 border-transparent text-black border-black dark:text-white dark:border-white"
                    :class="{ 'active-tab': state.active_tab == a }"
                    @click="send_category(tab.name, tab.pagination, a)"
                  >
                    {{ tab.name }}
                  </a>
                </li>
              </ul>
              <!-- search input -->
              <div
                v-if="state.search.isActive"
                class="flex items-center gap-2 fade-in shadow-xl rounded-md h-[54px] w-[75%]"
              >
                <input
                  v-model="state.search.query"
                  type="text"
                  class="!bg-transparent focus:!border-transparent focus:!ring-transparent w-full"
                  placeholder="Search"
                />
              </div>

              <!-- right button icons -->
              <div class="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  width="24"
                  class="hover:cursor-pointer"
                  @click="state.search.isActive = !state.search.isActive"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <select
                  class="!bg-transparent focus:!border-transparent focus:!ring-transparent max-sm:hidden md:w-40"
                >
                  <option
                    v-for="(filter, a) in state.filters"
                    :key="a"
                    @click="set_filter(filter.id)"
                    class="hover:cursor-pointer"
                  >
                    {{ filter.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- tab content -->
          <div v-if="!state.search.isActive" class="flex flex-col items-center">
            <div v-for="(tab, a) in state.tabs" :key="a">
              <div
                id="market_tab"
                class="flex flex-col items-center"
                uk-switcher="connect: #product-nav ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
              >
                <div class="flex flex-col items-center">
                  <div
                    v-if="state.active_tab == a"
                    class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 mt-2"
                    uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100"
                  >
                    <ProductCard
                      v-for="(product, b) in tab.products"
                      :key="b"
                      :product="product"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- search content -->
           <div v-else>

           </div>


        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  middleware: ["auth"],
  layout: "inner",
});

// components:

import ProductCard from "./components/ProductCard.vue";

const prodStore = productsStore();

const state = reactive({
  search: {
    isActive: false,
    query: "",
  },
  filters: [
    {
      id: 0,
      name: "All",
      isActive: true,
    },
    {
      id: 1,
      name: "New",
      isActive: false,
    },
    {
      id: 2,
      name: "Popular",
      isActive: false,
    },
    {
      id: 3,
      name: "Sale",
      isActive: false,
    },
  ],
  active_filter: 0,
  tabs: [
    {
      id: 0,
      name: "All",
      isActive: true,
      pagination: {
        page: 1,
        limit: 10
      },
      products: []
    },
    {
      id: 1,
      name: "Men",
      isActive: false,
      pagination: {
        page: 1,
        limit: 10
      },
      products: []
    },
    {
      id: 2,
      name: "Women",
      isActive: false,
      pagination: {
        page: 1,
        limit: 10
      },
      product: []
    },
    {
      id: 3,
      name: "Kids",
      isActive: false,
      pagination: {
        page: 1,
        limit: 10
      },
      products: []
    },
  ],
  active_tab: 0
});

// Lifecycle
onMounted( () => {
  
  state.tabs[0].products = prodStore?.products;
})


const set_filter = (id: Number) => {
  state.filters.forEach((filter) => {
    filter.isActive = filter.id === id;
  });
};

const send_category = async (category: string, pagination: any, index: number) => {


    // Future callback to get products by category
  state.active_tab = index
}


</script>
<style lang="scss">
.active-tab {
  border-bottom: 1px solid #cecfc4 !important;
  /* smooth transiton: */
  transition: border-bottom 0.5s;
}
</style>
