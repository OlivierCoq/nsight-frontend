<template>
  <v-row id="products">
    <v-col>
      <v-container >
        <v-row>
          <v-col>
            <div class="shop_header d-flex flex-row align-center justify-center p-5 my-5">
              <h1 class="text-center">nSight shop</h1>
            </div>
          </v-col>
        </v-row>
        <hr class="my-5"/>
        <v-row v-if="state.products">
          <v-col v-for="product in state.products.data" :key="product.id" cols="12" md="6" lg="3" xl="2">
            <product-card :product="product" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
  import { reactive, onBeforeMount } from 'vue'
  import commerce from '~/common/commerce.js'
  import ProductCard from '~/components/products/ProductCard.vue'
  export default {
    name: 'Products',
    components: {
      ProductCard
    },
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const state = reactive({
        merchant: null,
        categories: null,
        products: null,
      })  

      const getCommerceData = async () => {

        const [merch, cat, prods ] = await Promise.all([
          commerce.merchants.about(),
          commerce.categories.list(),
          commerce.products.list()
        ])

        state.merchant = merch
        state.categories = cat
        state.products = prods
      }
      onBeforeMount(() => {
        getCommerceData()
      })

      return {
        // meta
        definePageMeta,
        // state
        state,
        // methods:
        getCommerceData
      }
    },
  }
</script>