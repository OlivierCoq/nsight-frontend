<template>
  <v-container fluid>
    <v-row v-if="state.product">
      <v-col>
        <h1>{{ state.product.name }}</h1>
        <p>{{ state.product.price.formatted_with_symbol }}</p>
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
</template>
<script>

  import commerce from '~/common/commerce'

  export default {
    name: 'Product',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

        // Data
      const prodStore = productsStore(), 
            route = useRoute(),
            state = reactive({ product: null })

        // Methods
      const get_product = async () => {
        const product = await commerce.products.retrieve(route.params.id, { type: 'permalink' })
        state.product = product
      }
        // Lifecycle
      onBeforeMount(() => {
        prodStore.getCommerceData()
        get_product()
      })

      return {
        // meta
        definePageMeta,
        // state
        prodStore,
        state,
        // methods
        get_product
      }
    },
  }
</script>