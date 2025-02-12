<template>
  <div class="flex flex-row justify-start bg-zinc-100 dark:bg-zinc-700 p-4 rounded-md mb-4">
    <div class="flex flex-col pe-4 justify-start align-start items-start">
      <p class="text-sm text-gray-500 dark:text-gray-400"> Status:  <span class="dark:text-gray-400">{{ props.order.state }}</span></p>
      <p class="text-sm text-gray-500 dark:text-gray-300"> Order ID: <br/><span class="dark:text-gray-400"> {{ props.order.id }} </span> </p>
      <p class="text-sm text-gray-500 dark:text-gray-300"> Date: <span class="dark:text-gray-400">{{ formatDate(props.order.createdAt) }}</span> </p>
      <p class="text-sm text-gray-500 dark:text-gray-400"> Total: <span class="dark:text-gray-400">{{ formatPrice((props.order.totalMoney.amount * 0.01), 'en-US', order.totalMoney.currency) }}</span> </p>
    </div>
    <div class="flex flex-col justify-start align-start items-start">
      <p class="text-sm text-gray-500 dark:text-gray-300"> Items: </p>
      <ul class="text-sm text-gray-500 dark:text-gray-400">
        <li v-for="item in props.order.lineItems" :key="item.id">
          <strong>{{ item.name }}</strong> <br/> {{ item.variationName }} <br/> x {{ item.quantity }} <br/>
          <!-- <span class="dark:text-gray-400"> {{ formatPrice((item.totalPrice.amount * 0.01), 'en-US', item.totalPrice.currency) }} </span> -->
        </li>
      </ul>
      
      
    </div>
  </div> 
</template>

<script setup lang="ts">

// Props:
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

  // Setup
import { format } from 'date-fns';
import { formatPrice } from '~/utils/formatPrice';



// Methods
const formatDate = (dateString: string) => {
  return format(new Date(dateString), "PPpp");
}


</script>

<style lang="scss" scoped>

</style>