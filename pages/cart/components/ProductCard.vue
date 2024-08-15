<template>
  <div class="fade-in w-full mb-3 me-3">  
    <div class="w-full flex items-center h-[175px] flex-wrap justify-between overflow-hidden rounded-lg shadow-sm border1 bg-zinc-100 dark:bg-zinc-900">
       <div class="bg-cover bg-center w-1/4 h-full" :style="{ backgroundImage: `url(${props?.product?.images[0]?.url})` }"></div>
       <div class="w-3/4 h-full flex flex-col p-4 items-start justify-start align-start">
        <div class="w-full flex flex-row justify-between items-start align-start mb-6">
          <h5 class="text-md text-neutral-900 dark:text-white m-0 w-1/2">{{ props?.product?.name }}</h5>  
          <p class="text-lg text-neutral-700 dark:text-neutral-300 font-thin m-0">
            {{ format_currency(props?.product?.basePriceMoney?.amount, props?.product?.basePriceMoney?.currency) }}
          </p>
         </div>
        <div class="w-full flex flex-row align-start justify-between mb-0">
          <div class="w-full md:w-1/3">

            <div class="w-full flex flex-col justify-center align-center ">
              <label for="quantity" class="text-md text-neutral-900 dark:text-neutral-200 font-thin me-2">Quantity</label>
              <input 
                type="number" 
                v-model="props.product.quantity" 
                min="1"
                @change="prodStore.update_cart()"
                class="my-2  border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-zinc-800/20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              />
            </div>
              
          </div>
          <div class="w-full md:w-1/2 mt-5 flex flex-row items-center justify-end">  
            <button @click="remove_from_cart" class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer">Remove</button>
          </div>
        </div>
      </div>
       
    </div>
  </div>
</template>
<script setup>

// Props
const props = defineProps( {
  product: {
    type: Object,
    required: true
  }
})
// State
const state = reactive({
  product: props.product,
  snackbar: false,
  snackbar_text: '',
  num_select: 1,
  loading: false
})
// Stores
const prodStore = productsStore()

// Methods
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