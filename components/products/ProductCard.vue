<template>
  <v-card class="product-card w-100 h-100" variant="tonal">
    <v-img
      class="white--text align-end w-100 product_img"
      :src="product.image.url"
      @click="go_to_product(product.permalink)"
      style="z-index; 1;"
    >
    </v-img>
    <div class="position-relative w-100 height: 80px;" :class="state.show_options ? 'toggled' : ''" style="margin-top: -3rem;">
      <v-card-title class="text-white product_name text-wrap text-right h-100" style="position-absolute bottom: 0;">
        <div v-if="state.show_options">
          <div class="w-100 d-flex flex-row align-center justify-space-between">
              <ul style="list-style: none;" class="p-0 m-0 overflow-hidden">
                <li v-for="variant in state.product.variants" :key="variant.id" class="float-left mx-1 option" :class="state.product.selected_option === variant ? 'option_selected': ''">
                  <span class="text-button" @click="select_option(variant)">{{ variant.description }}</span>
                </li>
              </ul>
            <v-spacer />
            <font-awesome-icon :icon="['fas', 'x']" size="xs" @click="toggleOptions" cursor="pointer" />
          </div>
          <div>
            <v-btn color="info" block @click="add_to_cart" :disabled="!state.product.selected_option || state.loading">
              Add to cart
              <v-progress-circular
                v-if="state.loading"
                indeterminate
                color="white"
                size="15"
                class="mx-2"/>
            </v-btn>
            <v-snackbar
              v-model="state.snackbar"
              :timeout="3000"
              :top="true"
              :right="true"
              location="top"
              :multi-line="true"
              :vertical="true"
              color="success"
            >
              {{ state.snackbar_text }}
            </v-snackbar>
          </div>
        </div>
        <div v-else class="h-100 w-100" style="z-index: 2;">
          <font-awesome-icon :icon="['fas', 'heart']" class="mx-2 btn-like" />
          <font-awesome-icon :icon="['fas', 'cart-plus']" class="mx-2 btn-add_to_cart" @click="toggleOptions" />
        </div>
      </v-card-title>
    </div>
    <v-card-actions>
      <div class="d-flex w-100 flex-column">
        <span>{{ product.name }}</span>
        <span>{{ product.price.formatted_with_symbol }}</span>
      </div>
      <v-spacer />
      
    </v-card-actions>
  </v-card>
</template>
<script setup>
  import commerce from '~/common/commerce.js'
  import { reactive } from 'vue'

  
  const props = defineProps(['product'])
  const state = reactive({
    product: props.product,
    show_options: false,
    snackbar: false,
    snackbar_text: ''
  })
  const prodStore = productsStore()

  const get_variants = () => {
    // get
    commerce.products.getVariants(state.product.id)
      .then((res) => {
        state.product.variants = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  get_variants()

  const toggleOptions = () => {
    state.show_options = !state.show_options
  }
  const go_to_product = (permalink) => {
    navigateTo(`/shop/products/${permalink}`)
  }
  const select_option = (variant) => {
    state.product.selected_option = variant == state.product.selected_option ? null : variant
  }
  const add_to_cart = () => {
    // add product to cart
    state.loading = true
    commerce.cart.add(state.product.id, 1, state.product.selected_option.id)
      .then((res) => {
      //  console.log(res)
        // update cart
        commerce.cart.retrieve()
          .then((res) => {
          //  console.log(res)
            // update cart store
            prodStore.cart = res
            state.snackbar_text = `"${state.product.name}" - (${state.product.selected_option.description}) added to cart!`
            state.snackbar = true
            state.loading = false
          })
          .catch((err) => { console.log(err) })
      })
      .catch((err) => { console.log(err) })
  }
</script>
<style lang="scss">

  .product_name {
    text-shadow: 1px 1px 9px rgb(20 1 1 / 56%);
  }

  .toggled {
    background: #000000b0;
    height: 6rem;
    margin-top: -6rem !important;
  }

  .product_img,
  .btn-like,
  .btn-add_to_cart,
  .option {
    cursor: pointer;
  }
  .option_selected {
    text-decoration: underline;
  }
</style>