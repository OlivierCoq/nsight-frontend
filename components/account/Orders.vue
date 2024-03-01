<template>
  <div
      class="py-3 px-5 ms-2 me-5 shadow-xl bg-zinc-300 dark:bg-zinc-900 min-h-[300px] rounded-md flex flex-col"
    >
      <h2 class="text-neutral-900 dark:text-white font-bold text-xl m-2">
        Orders
      </h2>
      <div v-if="!state.orders" class="w-full flex flex-col mx-2">
        <p class="text-neutral-900 dark:text-white">No Orders found! Head over to the shop and check out our products!</p>
      </div>
  </div>
</template>
<script>
const runtimeConfig = useRuntimeConfig();
export default {
  name: "Orders",
  setup() {
    definePageMeta({
      middleware: ["auth"],
      layout: "inner",
    });
    const state = reactive({
      orders: false,
      loading: false,
    });
    const auth = authStore();
    const prodStore = productsStore();
    const get_orders = () => {
      state.loading = true;
    };
    onMounted(() => {
      get_orders();
    });
    return {
      state,
      get_orders,
    };
  },
};
</script>
