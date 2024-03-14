<template>
  <div class="flex flex-col items-start justify-start mb-5">
    <div class="w-full h-[360px] bg-zinc-200 dark:bg-zinc-400 shadow-lg rounded-md relative">
      <div 
        class="w-full h-full absolute rounded-md bg-cover bg-center z-0 cursor-pointer" :style="{backgroundImage: `url(${ props.product.images[0].url })`}"
        @click="go_to_product(props.product.id)"
      ></div>
      <div class="rounded-full hover:cursor-pointer shadow-xl h-[40px] w-[40px] bg-white flex flex-col items-center justify-center absolute right-[65px] bottom-[15px] z-10">
        <font-awesome-icon
          :icon="['far', 'heart']"
          class="text-red-500 hover:text-red-600"
        >
        </font-awesome-icon>
      </div>
       <div class="rounded-full hover:cursor-pointer shadow-xl h-[40px] w-[40px] bg-white flex flex-col items-center justify-center absolute right-[15px] bottom-[15px] z-10">
        <font-awesome-icon
          :icon="['fas', 'cart-plus']"
          class="text-blue-400 hover:text-blue-500"
          @click="state.show_options = true"
        >
        </font-awesome-icon>
      </div>
      <div v-if="state.show_options" class="rounded-b-md h-[90px] w-full bg-white/75 p-3 flex flex-col justify-start items-start z-20 absolute bottom-0">
        <div class="w-full flex flex-row items-end justify-end">
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="text-neutral-400 hover:text-neutral-500 cursor-pointer"
            @click="state.show_options = false"
          />
        </div>
      </div>
    </div>
    <div class="w-full flex flex-row justify-between mt-2 px-2">
      <h2 class="text-neutral-900 dark:text-white text-lg">{{ props.product.item_data.name }}</h2>
      <h2 class="text-neutral-900 dark:text-white font-thin text-lg">$ {{ format_price(props.product.item_data.variations[0].item_variation_data.price_money.amount) }}</h2>
    </div>
  </div>
</template>
<script setup>

import { reactive } from 'vue'


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const state = reactive({
  product: props.product,
  show_options: false,
  snackbar: false,
  snackbar_text: ''
})
const prodStore = productsStore()

const get_variants = () => {
  // get variants from Medusa

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

  state.snackbar_text = `"${state.product.name}" - (${state.product.selected_option.description}) added to cart!`
  state.snackbar = true
  state.loading = false

}
const format_price = (amount) => {
  return amount / 100
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