<template>
  <div
    v-if="prodStore?.products"
    id="products"
    class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="main__inner">
        <div
          class="cls-active: bg-zing-100/60 z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top sticky"
        >
          <div class="page__heading">
            <h1>Shop</h1>
          </div>
          <!-- tab style one -->
          <div class="overflow-hidden mt-6">
            <div
              id="product-nav"
              class="relative flex items-center justify-between border-b dark:border-slate-800 uk-animation-slide-top-medium"
            >
              <!-- tabs -->
              <ul
                class="flex gap-2 text-sm text-center text-gray-600 capitalize font-semibold dark:text-white/80 -mb-px"
                uk-switcher="connect: #market_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
              >
                <li v-for="(tab, a) in state.tabs" :key="a">
                  <a
                    href="#"
                    class="flex items-center md:p-4 p-2.5 border-transparent text-black border-black dark:text-white dark:border-white"
                    :class="{ 'active-tab': state.active_tab == a }"
                    @click="state.active_tab = a"
                  >
                    {{ tab.name }}
                  </a>
                </li>
              </ul>

              <!-- right button icons -->
              <div class="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  width="24"
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
                    @click="set_filter(filter.id)"
                    class="hover:cursor-pointer"
                  >
                    {{ filter.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "inner",
});

const prodStore = productsStore();
const state = reactive({
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
    },
    {
      id: 1,
      name: "Men",
      isActive: false,
    },
    {
      id: 2,
      name: "Women",
      isActive: false,
    },
    {
      id: 3,
      name: "Kids",
      isActive: false,
    },
  ],
  active_tab: 0,
});

const set_filter = (id) => {
  state.filters.forEach((filter) => {
    filter.isActive = filter.id === id;
  });
};
</script>
<style lang="scss">
.active-tab {
  border-bottom: 1px solid #cecfc4 !important;
  /* smooth transiton: */
  transition: border-bottom 0.5s;
}
</style>
