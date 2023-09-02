<template>
  <div>
    <h1></h1>
  </div>
</template>
<script>
  import { reactive } from 'vue'
  import { productsStore } from '~/stores/products'
  export default {
    name: 'Product',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const prodStore = productsStore()
      const state = reactive({

      })
      onBeforeMount(() => {
        prodStore.getCommerceData()
      })

      return {
        // meta
        definePageMeta,
        // state
        prodStore,
        state,
        // methods
      }
    },
  }
</script>