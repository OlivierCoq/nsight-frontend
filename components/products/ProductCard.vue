<template>
  <v-card class="product-card w-100 h-100" variant="tonal">
    <NuxtLink :to="`/shop/products/${product.permalink}`" class="text-decoration-none">
      <v-img
        class="white--text align-end w-100"
        :src="product.image.url"
      >
        <v-card-title class="text-white product_name text-wrap" style="line-height: 1.2rem;">{{ product.name }}</v-card-title>
      </v-img>
    </NuxtLink>
    <v-card-actions>
      <span>{{ product.price.formatted_with_symbol }}</span>
      <v-spacer />
      <font-awesome-icon :icon="['fas', 'heart']" class="mx-2 btn-like" />
      <font-awesome-icon :icon="['fas', 'cart-shopping']" class="mx-2 btn-add_to_cart" />
    </v-card-actions>
  </v-card>
</template>
<script setup>
  import { reactive } from 'vue'
  const props = defineProps(['product'])
  const state = reactive({
    product: props.product
  })
</script>
<style lang="scss">

  .product_name {
    text-shadow: 1px 1px 9px rgb(20 1 1 / 56%);
  }

  .btn-like,
  .btn-add_to_cart {
    cursor: pointer;
  }
</style>