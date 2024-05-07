<template>
  <div
    v-if="auth.user"
    id="account"
    class="h-100 w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col"
  >
    <div class="w-full p-4 flex flex-row align-start justify-start">
      <h1 class="text-neutral-900 dark:text-white text-5xl mb-3">account</h1>
    </div>
    <div class="w-full flex flex-col md:flex-row">
      <div class="w-full md:w-1/2">
        <AccountEditPersonal />
        <AccountEditAddress />
      </div>
      <div class="w-full md:w-1/2">
        <AccountOrders :store="prodStore" :user="auth?.user" />
        <AccountPaymentMethods />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "inner",
});
// Add validation rules for state.address.new_address:

// Stores
const auth = authStore()
const prodStore = productsStore()
const settings = settingsStore()

</script>
<style lang="scss">
#account {
  height: 100vh;

  .ctr-address {
    height: 200px;
    width: 250px;
    color: white;
    background-color: #272323;
    border-radius: 5px;
  }

  .ctr-address.selected {
    background-color: #464646;
  }

  .ctr-orders {
    height: 500px;
  }
}
</style>
