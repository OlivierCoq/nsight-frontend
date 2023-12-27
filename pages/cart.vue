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
                <hr class="my-5" />
              </v-container>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="prodStore.cart.total_items" cols="12" sm="12" md="6" lg="6" xl="6">
              <v-container>
                <ProductsCartCard v-for="product in prodStore.cart.line_items" :key="product.id" :product="product" />
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
                    <div class="w-100 d-flex flex-column align-end justify-end mb-5">
                      <p class="text-uppercase fw-bold curser-pointer" @click="empty_cart">
                        Empty cart &nbsp; <font-awesome-icon :icon="['fas', 'x']" cursor="pointer" />
                      </p>
                      <v-progress-circular v-if="state.emptying" indeterminate color="red" size="90"
                        class="my-5 mx-5 position-absolute float-left" style="top: 20em; left: 45%; z-index: 999" />
                      <v-snackbar v-model="state.snackbar" :timeout="3000" :top="true" :right="true" location="top"
                        :multi-line="true" :vertical="true" color="success">
                        {{ state.snackbar_text }}
                      </v-snackbar>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="d-flex flex-row align-center justify-start">
                      <h2>subtotal: {{ prodStore.cart.subtotal.formatted_with_symbol }}</h2>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="d-flex flex-column align-center justify-center">
                      <v-btn color="info" block @click="checkout" :disabled="state.checking_out">
                        checkout
                        <v-progress-circular v-if="state.checking_out" indeterminate color="white" size="15"
                          class="mx-2" />
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
export default {
  name: 'Cart',
  setup() {
    definePageMeta({
      middleware: ['auth'],
      layout: 'inner'
    })

    const state = reactive({
      loading: false,
      emptying: false,
      checking_out: false,
      snackbar: false,
      snackbar_text: '',
    })
    const auth = authStore()
    const prodStore = productsStore()

    // methods
    const empty_cart = () => {
      state.emptying = true

      // Empty Medusa car
    }
    const checkout = async () => {

      state.checking_out = true
      // Checkout with Medusa
    }

    return {
      // meta
      definePageMeta,
      // state
      state,
      auth,
      prodStore,
      // methods
      checkout,
      empty_cart
    }
  },
}
</script>
<style lang="scss">
.curser-pointer {
  &:hover {
    cursor: pointer;
  }
}
</style>