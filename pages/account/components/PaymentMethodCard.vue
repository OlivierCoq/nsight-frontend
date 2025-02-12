<template>
  <div class="flex flex-col justify-start bg-zinc-100 dark:bg-zinc-700 p-4 rounded-md w-full h-[180px] shadow-xl relative z-0">

    <div v-if="props.paymentMethod.card" class="w-full h-full flex flex-col">
      <div class="w-full h-2/3  overflow-hidden px-2 py-4 flex flex-row justify-between items-center">
        <div class="w-full h-full lg:w-3/4 flex flex-col justify-start align-start items-start">
          <p class="text-sm text-gray-500 dark:text-zinc-500 text-start leading-none m-0 p-0">
            **** **** **** {{ props.paymentMethod.card.last4 }} 
          </p>
          <p class="text-gray-500 dark:text-zinc-500 mt-2 p-0 leading-none"> {{ props.paymentMethod.card.cardholderName }} </p>
          <p class="text-gray-500 dark:text-gray-400 m-0 pb-2 leading-none"> Expires: {{ props.paymentMethod.card.expMonth }}/{{ props.paymentMethod.card.expYear }} </p>

        </div>
        <div class="flex-1 h-full flex flex-col justify-end items-end align-end">
          <font-awesome-icon :icon="['fab', `cc-${props.paymentMethod.card.cardBrand.toLowerCase()}`]" class="text-2xl text-white dark:text-zinc-500 text-start" />
        </div>
      </div>
      <div class="w-3/4 h-1/3 pe-2 flex flex-row justify-between items-center">

        <!-- Set as default -->
        <span v-if="props.paymentMethod.card.id === auth.user?.selected_payment_method.card.id" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-500 uppercase">Default</span>
        <span v-else @click="setDefaultPaymentMethod()" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-300 cursor-pointer">Set as default</span>
          <!-- Delete -->
         <span class="py-1.5 px-5 font-semibold text-sm me-2 text-red-300 cursor-pointer" @click="state.confirm_delete = true">Delete</span>
         <div v-if="state.confirm_delete" class="w-full h-full bg-black/30 absolute top-0 left-0 z-10 flex flex-col justify-center items-center">
          <div class=" w-[90%] h-[80%] bg-zinc-900 mx-auto flex flex-col justify-center align-center rounded-md">
            <h3 class="text-lg text-gray-500 dark:text-gray-100 text-center pt-5 b-">Are you sure you want to delete this payment method?</h3>
            <div class="w-full flex flex-row justify-center items-center">
              <button @click="state.confirm_delete = false" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-300 cursor-pointer">Cancel</button>
              <button @click="deletePaymentMethod()" class="py-1.5 px-5 font-semibold text-sm me-2 text-red-300 cursor-pointer">Delete</button>
            </div>
          </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

// Setup
import { format } from 'date-fns';

// Props
const props = defineProps({
  paymentMethod: {
    type: Object,
    required: true
  }
})

// State:
const state = reactive({
  confirm_delete: false,

})

// Stores:
const auth = authStore()


// Methods

  // CRUD methods:
const deletePaymentMethod = async () => {
  try {
    // Find the payment method in the user's payment methods array:
    const paymentMethodIndex = auth.user.payment_methods.data.findIndex((paymentMethod: any) => paymentMethod.card.id === props.paymentMethod.id)
    // Remove the payment method from the user's payment methods array:
    auth.user.payment_methods.data.splice(paymentMethodIndex, 1)
    // Update the user's payment methods in the database:
    await auth.updateUser()
    nextTick(() => {
      state.confirm_delete = false
      if(auth.user.payment_methods.length === 1) {
        // Set the user's only payment method as the default payment method:
        setDefaultPaymentMethod()
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const setDefaultPaymentMethod = async () => {
  try {
    // await auth.setDefaultPaymentMethod(props.paymentMethod.id)
    auth.user.selected_payment_method = props.paymentMethod
  } catch (error) {
    console.error(error)
  }
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "PPpp");
}




</script>

<style lang="scss" scoped>

</style>