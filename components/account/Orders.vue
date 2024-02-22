<template>
  <v-card variant="tonal" class="mb-4">
    <v-card-title> Orders </v-card-title>
    <v-card-text>
      <div class="ctr-orders overflow-auto">
        <p v-if="!state.orders">
          No orders yet! Head over to the shop and check out our products!
        </p>
      </div>
    </v-card-text>
  </v-card>
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
