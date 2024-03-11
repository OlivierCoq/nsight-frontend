<template>
  <v-row id="products" class="overflow-auto">
    <v-col>
      <v-container>
        <v-row>
          <v-col>
            <div
              class="shop_header d-flex flex-row align-center justify-center p-5 my-5"
            >
              <h1 class="text-center">nSight shop</h1>
            </div>
          </v-col>
        </v-row>
        <hr class="my-5" />
        <v-row v-if="prodStore.products">
          <v-col
            v-for="product in prodStore.products.data"
            :key="product.id"
            cols="12"
            md="6"
            lg="3"
            xl="2"
          >
            <ProductsProductCard :product="product" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <div class="p-5">
              <v-progress-circular indeterminate color="primary" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
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
