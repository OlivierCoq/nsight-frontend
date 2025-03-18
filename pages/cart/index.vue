<template>
  <div
    id="cart"
    class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="main__inner">

        <div class="cls-active: bg-zing-100/60 z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top sticky">
          <div class="w-full flex flex-row justify-between">
            <div class="page__heading">
              <h1>Cart</h1> 
            </div>

            <div class="overflow-hidden my-6">
              <div id="product-nav" class="relative flex items-center justify-between border-b dark:border-slate-800 uk-animation-slide-top-medium">
               
              </div>
            </div>

            
          </div>
        </div>

        <div class="w-full flex">
           <div v-if="!prodStore?.cart?.checkout?.order?.order?.lineItems.length" class="w-full flex flex-row">
              <p class="text-neutral-900 dark:text-white text-lg my-3 font-thin">
                There are no items in your cart! Check out what we've got at our <a href="/shop"><strong>shop</strong></a>!
              </p>
            </div>
            <div v-else class="flex flex-col md:flex-row w-full gap-2">
              <div class="w-full md:w-3/4">
                <div class="flex flex-col w-full mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
                  <ProductCard v-for="item in prodStore.cart?.checkout?.order?.order?.lineItems" :key="item.id" :product="item" />
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="shadow-sm border1 bg-zinc-100 dark:bg-zinc-900 rounded-md shadow-md px-4 flex flex-col">
                  <div class="w-full flex flex-col justify-between items-start px-0 py-4 mb-3">
                    <p class="text-lg text-neutral-900 dark:text-white m-0">Subtotal</p>
                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ prodStore.cart?.checkout?.order?.order?.value?.str }}</p>
                  </div>
                  <div class="w-full flex flex-col justify-between items-start px-0 py-4 mb-3">
                    <p class="text-lg text-neutral-900 dark:text-white m-0">Shipping</p>
                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0"></p>
                  </div>
                  <div class="w-full flex flex-col justify-between items-start px-0 py-4 mb-3">
                    <p class="text-lg text-neutral-900 dark:text-white m-0">Total</p>
                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ prodStore.cart?.checkout?.order?.order?.total?.str }}</p>
                  </div>
                  <div class="w-full flex flex-col justify-between items-start px-0 pb-4">
                    <button 
                      @click="checkout" 
                      :disabled="state.checking_out"
                      class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer bg-yellow-500 hover:bg-yellow-600 w-full rounded-md shadow-md py-2 mb-4"
                    >Checkout</button>
                  </div>
                </div>
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

// components
import ProductCard from './components/ProductCard.vue'

// State
const state = reactive({
  loading: false,
  emptying: false,
  checking_out: false,
  snackbar: false,
  snackbar_text: "",
});

// methods
const empty_cart = () => {
  state.emptying = true;

  // Empty Medusa car
};
const checkout = async () => {
  state.checking_out = true;

  // Send to API

  // UX.UI:
  navigateTo("/checkout");
};
</script>
<style lang="scss">
.curser-pointer {
  &:hover {
    cursor: pointer;
  }
}
</style>
