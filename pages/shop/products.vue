<template>
  <v-row id="products">
    <v-col>
      <v-row>
        <v-col>
          <pre>{{ JSON.stringify(state.merchant, null, 2) }}</pre>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
  import { reactive } from 'vue'
  import commerce from '~/common/commerce.js'
  export default {
    name: 'Products',
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
        const merch = await commerce.merchants.about()
        const cat = await commerce.categories.list()
        const prods = await commerce.products.list()

        state.merchant = merch
        state.categories = cat
        state.products = prods
      }
      getCommerceData()

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