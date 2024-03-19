<template>
  <div class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col px-3 py-4">
    <div class="container mx-auto p-3 flex flex-col md:flex-row">
      <div class="w-full md:w-1/2 p-3">
        <img class="w-full shadow-xl rounded-md" :src="state.product?.images[0]?.imageData?.url" />
      </div>
      <div class="w-full md:w-1/2 p-3">
        <h1 class="text-3xl text-neutral-900 dark:text-neutral-200 uppercase font-thin pb-3">{{ state.product?.item?.itemData?.name }}</h1>
        <!-- <h2 class="text-2xl text-neutral-900 dark:text-neutral-200 uppercase font-thin">$ {{ state.product.variations[0].price_money.amount }}</h2> -->
        <p class="text-lg text-neutral-900 dark:text-neutral-200">{{ state.product?.item?.itemData?.description }}</p>
        <div class="w-full flex flex-row justify-between py-5">
          <button class="btn-add_to_cart nsight-btn-primary my-1 py-1 w-full md:w-1/2 px-5 text-white shadow-xl rounded-md" @click="add_to_cart">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

  definePageMeta({
    middleware: ['auth'],
    layout: 'inner'
  })

      // Data
const prodStore = productsStore(),
  route = useRoute(),
  state = reactive({ product: null })

  $fetch('/api/square/retrieve-item',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(route.params.id)
  })
  .then((res) => { 
    state.product = res 
    state.product['images'] = []
    state.product.related.forEach((obj) => {
      if(obj.type === 'IMAGE') {
        state.product['images'].push(obj)
      }
    })
  })
  .catch((err) => {
    console.log(err)
  })

  // Methods
  const add_to_cart = () => {
    // add product to cart
    state.loading = true

    // state.snackbar_text = `"${state.product.item.itemData.name}" added to cart!`
    // state.snackbar = true
    // state.loading = false
  }

</script>