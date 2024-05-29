<template>
  <div v-if="prodStore?.products" id="products" class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col pt-20">

      <!-- Catagories bar -->
      <div class="w-full h-[100px] p-4 flex flex-col justify-center align-center  items-center">
        <h1 class="text-3xl text-neutral-900 dark:text-neutral-200 uppercase font-thin">Category</h1>
      </div>

      <!-- Products -->
      <div class="container mx-auto my-5">
        <div class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 gap-3">
          <ProductsProductCard v-for="product in prodStore.products" :key="product.id" :product="product"/>
        </div>
      </div>
  </div>
</template>
<script setup>

  definePageMeta({
    middleware: ["auth"],
    layout: "inner",
  })


  const prodStore = productsStore()
  const state = reactive({})

</script>
<style lang="scss">
 
</style>
