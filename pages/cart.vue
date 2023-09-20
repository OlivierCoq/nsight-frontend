<template>
  <div id="products" class="overflow-auto" :class="auth.user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
    <v-card variant="tonal" class="h-100">
      <v-card-text>
        <v-container>
          <v-row class="overflow-auto">
            <v-col>
              <v-container fluid>
                <v-row>
                  <v-col>
                    <div class="shop_header d-flex flex-row align-center justify-center p-5 my-5">
                      <h1 class="text-center">cart</h1>
                    </div>
                  </v-col>
                </v-row>
                <hr class="my-5"/>
              </v-container>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="prodStore.cart.total_items" cols="12" sm="12" md="6" lg="6" xl="6">
              <v-container>
                <cart-card v-for="product in prodStore.cart.line_items" :key="product.id" :product="product" /> 
              </v-container>
            </v-col>
            <v-col v-else cols="12" sm="12" md="6" lg="6" xl="6">
              <div class="d-flex flex-row align-center justify-center h-100">
                <p>Looks like your cart's empty. Head over to our shop to see what we've got!</p>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-container v-if="prodStore.cart.total_items">
                <v-row>
                  <v-col>
                    <div class="d-flex flex-row align-center justify-start">
                      <h2>subtotal: {{ prodStore.cart.subtotal.formatted_with_symbol }}</h2>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="d-flex flex-row align-center justify-center">
                      <v-btn color="info" block @click="checkout" :disabled="!prodStore.cart.total_items">
                        checkout
                        <v-progress-circular
                          v-if="state.loading"
                          indeterminate
                          color="white"
                          size="15"
                          class="mx-2"/>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import { reactive } from 'vue'
  import { authStore } from '@/stores/auth'
  import { productsStore } from '@/stores/products'
  import CartCard from '@/components/products/CartCard.vue'

  export default {
    name: 'Cart',
    components: {
      CartCard
    },
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const state = reactive({
        loading: false
      })
      const auth = authStore()
      const prodStore = productsStore()

      // methods
      const checkout = () => {

      }

      return {
        // meta
        definePageMeta,
        // state
        state,
        auth,
        prodStore,
        // methods
        checkout
      }
    },
  }
</script>