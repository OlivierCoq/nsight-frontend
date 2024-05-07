<template>
  <div class="py-3 px-5 ms-2 me-5 shadow-xl bg-zinc-300 dark:bg-zinc-900 h-[400px] rounded-md flex flex-col">
      <h2 class="text-neutral-900 dark:text-white font-bold text-xl m-2">
        Orders
      </h2>
      <div v-if="!props?.user?.orders?.data?.length" class="w-full flex flex-col mx-2">
        <p class="text-neutral-900 dark:text-white">No Orders found! Head over to the shop and check out our products!</p>
      </div>
      <div v-else class="w-full flex flex-col p-4 h-[90%] overflow-y-scroll">
        <div v-for="(order, a) in props?.user?.orders?.data" :key="a" class="w-full px-4 py-6 flex flex-col bg-zinc-400 dark:bg-zinc-800 rounded-md shadow-xl mb-4">
          <div class="w-full flex flex-row justify-between">
           <h3 class="text-neutral-900 dark:text-white text-lg m-2"> Status: {{ order.state }} </h3>
          <h4 class="text-neutral-900 dark:text-white text-md m-2"> Placed: {{ format_date (order.createdAt) }} </h4>
          </div>
          <div class="w-full flex flex-col my-3">
            <div class="w-full flex flex-col">
              <h4 class="text-neutral-900 dark:text-white text-md m-2"> Items: </h4>
              <div v-for="(item, b) in order.lineItems" :key="b" class="w-full flex flex-row justify-between bg-zinc-300 dark:bg-zinc-700 px-2 pt-4 pb-10 rounded-sm shadow-xl">
                <div class="w-1/6 p-1">
                  <img :src="item.images[0].url" class="rounded-md w-full" />
                </div>
                <div class="w-5/6 flex flex-col ms-3">
                  <h5 class="text-neutral-900 dark:text-white text-md m-2"> {{ item.variationName ? item.variationName : item.name  }} </h5>
                <!-- <h5 class="text-neutral-900 dark:text-white text-md m-2"> {{  }} </h5> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig()

 // Props:
 const props = defineProps({
    store: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true
    }
  })

 definePageMeta({
    middleware: ["auth"],
    layout: "inner",
  })

  // State
      const state = reactive({
      orders: false,
      loading: false,
    })

  // Methods
  const format_date = (date) => {
    return new Date(date).toLocaleDateString()
  }

</script>
