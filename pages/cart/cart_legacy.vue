<template>
  <div
    v-if="prodStore.cart?.checkout"
    class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col px-3 py-4"
  >
    <div
      class="w-full h-[100px] p-4 flex flex-col justify-start align-start items-start mb-6"
    >
      <h1
        class="text-3xl text-neutral-900 dark:text-neutral-200 uppercase font-thin"
      >
        Cart
      </h1>
    </div>
    <div class="w-full flex flex-col md:flex-row">
      <div
        class="w-full md:w-3/4 py-8 px-4 dark:bg-zinc-800 rounded-md shadow-xl mx-3 flex flex-col"
      >
        <p
          v-if="!prodStore?.cart?.checkout?.order?.order?.lineItems.length"
          class="text-neutral-900 dark:text-white text-lg my-3 font-thin"
        >
          There are no items in your cart! Check out what we've got at our
          <a href="/shop/products"><strong>shop</strong></a
          >!
        </p>
        <div v-else class="w-full flex flex-col">
          <ProductsCartCard
            v-for="item in prodStore.cart?.checkout?.order?.order?.lineItems"
            :key="item.id"
            :product="item"
          />
        </div>
      </div>
      <div class="w-full md:w-1/4 mx-3">
        <div class="dark:bg-zinc-800 rounded-md shadow-xl px-4 pt-4 pb-6">
          <div class="w-full flex flex-row justify-between items-center">
            <h1
              class="text-lg text-neutral-900 dark:text-white font-bold uppercase"
            >
              Order Value
            </h1>
            <h1 class="text-lg text-neutral-900 dark:text-white font-thin">
              {{ prodStore.cart?.checkout?.order?.order?.value?.str }}
            </h1>
          </div>
          <div class="w-full flex flex-row justify-between items-center">
            <h1
              class="text-lg text-neutral-900 dark:text-white font-bold uppercase"
            >
              Shipping
            </h1>
            <!-- <h1 class="text-lg v-neutral-900 dark:text-white font-thin">{{ prodStore.cart?.checkout?.order?.order?.value }}</h1> -->
          </div>
          <div class="w-full flex flex-row justify-between items-center">
            <h1
              class="text-lg text-neutral-900 dark:text-white font-bold uppercase"
            >
              Total
            </h1>
            <h1 class="text-lg text-neutral-900 dark:text-white font-thin">
              {{ prodStore.cart?.checkout?.order?.order?.total?.str }}
            </h1>
          </div>
          <div class="w-full flex flex-col justify-between items-center">
            <button
              class="btn-empty_cart nsight-btn-primary my-2 py-2 w-full px-5 text-neutral-800 shadow-xl rounded-md"
              @click="checkout"
            >
              Proceed to Checkout
            </button>
            <!-- <button v-if="!state.emptying" @click="empty_cart" class="btn-empty_cart nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-white shadow-xl rounded-md">Empty Cart</button>
            <button v-else class="btn-empty_cart nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-whitev  shadow-xl rounded-md">Emptying...</button>
            <button v-if="!state.checking_out" @click="checkout" class="btn-checkout nsight-btn-primary my-1 py-1 w-full px-5text-neutral-990 dark:text-white shadow-xl rounded-md">Checkout</button>
            <button v-else class="btn-checkout nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-white shadow-xl rounded-md">Checking out...</button> -->
          </div>
        </div>
      </div>
    </div>
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
