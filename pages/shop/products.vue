<template>
  <div class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col">

      <!-- Catagories bar -->
      <div class="w-full h-[100px] p-4 flex flex-col justify-center align-center  items-center">
        <h1 class="text-3xl text-neutral-900 dark:text-neutral-200 uppercase font-thin">Catagory</h1>
      </div>

      <!-- Products -->
      <div class="container mx-auto my-5">
        <div class="w-full grid grid-cols-1 md:grid-cols-4">

        </div>
      </div>
  </div>
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
