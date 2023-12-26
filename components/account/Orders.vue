<template>
  <v-card variant="tonal" class="mb-4">
    <v-card-title>
      Orders
    </v-card-title>
    <v-card-text>
      <div class="ctr-orders overflow-auto">

      </div>
    </v-card-text>
  </v-card>
</template>
<script>

//import commerce
import commerce from '~/common/commerce.js'
const runtimeConfig = useRuntimeConfig()
export default {
  name: 'Orders',
  setup() {
    definePageMeta({
      middleware: ['auth'],
      layout: 'inner'
    })
    const state = reactive({
      orders: false,
      loading: false
    })
    const auth = authStore()
    const prodStore = productsStore()
    const get_orders = () => {
      state.loading = true
      
      // commerce.js get customer:
      commerce.customer.getToken({
        token: `${runtimeConfig.public.NUXT_ENV_CHEC_PUBLIC_API_KEY}`
      }).then((token) => {
        console.log('token', token)
      })

      // commerce.customer.get(auth.user.chec_customer_id)
      //   .then((customer) => {
      //     console.log('customer', customer)
      //   })
      // commerce.customer.getOrders(auth.user.chec_customer_id)
      //   .then((orders) => {
      //     state.orders = orders
      //     state.loading = false

      //     console.log('orders', orders)
      //   })
    }
    onMounted(() => {
      get_orders()
    })
    return {
      state,
      get_orders
    }
  }
}
</script>