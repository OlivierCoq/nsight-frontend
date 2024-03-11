<template>
  <div></div>
</template>
<script>
import { reactive, onBeforeMount } from "vue";

export default {
  name: "Products",
  setup() {
    definePageMeta({
      middleware: ["auth"],
      layout: "inner",
    });
    const prodStore = productsStore();
    const state = reactive({});

    return {
      // meta
      definePageMeta,
      // state
      state,
      prodStore,
      // methods:
    };
  },
};
</script>
<style lang="scss">
#products {
  height: 100vh;
}
</style>
