<template>
  <div class="mb-10 w-full flex flex-row">
    <div class="w-1/4">
      <div class="w-full bg-cover bg-center h-[200px] rounded-md" :style="{ backgroundImage: `url(${props?.product?.images[0]?.url})` }"></div>
    </div>
    <div class="w-3/4 flex flex-col items-start justify-between px-4">
      <div class="w-full flex flex-row align-start justify-between mb-2">
        <h1 class="text-xl text-neutral-900 dark:text-white font-thin mb-2">{{ props?.product?.name }}</h1>
        <p class="text-lg text-neutral-700 dark:text-neutral-300 font-thin">
          {{ format_currency(props?.product?.basePriceMoney?.amount, props?.product?.basePriceMoney?.currency) }}
        </p>
      </div>
      <div class="w-full flex flex-row align-start justify-between mb-2">
        <div class="w-full md:w-1/4 mt-5">
          <label for="quantity" class="text-md text-neutral-900 dark:text-neutral-200 font-thin">Quantity</label>
          <input 
            type="number" 
            v-model="props.product.quantity" 
            min="1"
            @change="prodStore.update_cart()"
            class="my-2 bg-transparent border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
           />
        </div>
        <div class="w-full md:w-3/4 mt-5 flex flex-row items-center justify-end">  
          <button @click="remove_from_cart" class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer">Remove</button>
        </div>
      </div>
      <!-- <p class="text-sm text-neutral-700 dark:text-neutral-300 font-thin">{{ props?.product?.variant?.title }}</p>
      <p class="text-sm text-neutral-700 dark:text-neutral-300 font-thin">{{ props?.product?.variant?.price }}</p>
        <div class="w-1/4 flex flex-row items-center justify-start">
          <button @click="remove_from_cart" class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer">Remove</button>
        </div>
        <div class="w-3/4 flex flex-row items-center justify-end">
          <input type="number" class="w-1/4 text-sm text-neutral-900 dark:text-white font-thin" v-model="state.num_select" />
        </div>
      </div> -->            
    </div>
  </div>
</template> 
<script setup>


const props = defineProps( {
  product: {
    type: Object,
    required: true
  }
})
const state = reactive({
  product: props.product,
  snackbar: false,
  snackbar_text: '',
  num_select: 1,
  loading: false
})
const prodStore = productsStore()

const format_currency = (amount, currency) => {
    if(currency === 'USD') {
      return `$${(amount/100).toFixed(2)}`
    }
  }
const format_num = (str) => {
  return Number(str)
}

const remove_from_cart = () => {

  state.loading = true
  // Remove from prodStore
  prodStore.remove_from_cart(props.product)
} 
</script>