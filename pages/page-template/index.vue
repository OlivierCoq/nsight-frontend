<template>
  <div
    id="cart"
    class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="main__inner">
        <div
          class="cls-active: bg-zing-100/60 z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top sticky"
        >
          <div class="w-full flex flex-row justify-between">
            <div class="page__heading">
              <h1>Cart</h1>
            </div>

            <div class="overflow-hidden my-6">
              <div
                id="product-nav"
                class="relative flex items-center justify-between border-b dark:border-slate-800 uk-animation-slide-top-medium"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
// Meta
definePageMeta({
  middleware: ["auth"],
  layout: "inner",
});

// Stores
const auth = authStore();
const prodStore = productsStore();
const settings = settingsStore();

// State
const state = reactive({
  loading: false,
});

// methods
</script>
<style lang="scss"></style>
