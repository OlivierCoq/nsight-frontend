<template>
  <div class="w-[90%] h-[87%] mx-auto mt-4 rounded-md bg-zinc-700 flex flex-col justify-start items-center">
    
    <div class="relative -mb-px px-2 mt-10 w-full" tabindex="-1" uk-slider="finite: true">

      <h3 class="text-lg font-semibold text-gray-500 dark:text-white text-start ms-3">New Payment Method</h3>

      <nav class="overflow-hidden rounded-xl uk-slider-container pt-2">
        <ul class="uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-gray-500 text-sm dark:text-white" uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"> 
            
            <li class="w-auto pr-2.5 mx-auto"> 
              <a v-for="(tab, a) in state.tabs" :key="a" href="#" @click="toggle_tab(tab)" 
                class="inline-block p-4 pt-2 border-b-2 border-transparent aria-expanded:text-zinc-500 aria-expanded:border-zinc-500"
                :class="state.open_tab === tab ? 'text-neutral-900 border-black dark:text-white dark:border-white' : 'text-gray-500 dark:text-white/80'"
              > 
                {{ tab.name }} 
              </a> 
            </li>
              
        </ul>
      </nav>
                
    </div>

    <div class="mt-6 mb-20 text-sm font-medium text-gray-600 dark:text-white/80 shadow-xl rounded-md w-[90%] mx-auto h-full">
      <div class="uk-switcher bg-zinc-100 border rounded-xl shadow-sm md:py-12 md:px-20 p-6 overflow-hidden dark:border-zinc-700 dark:bg-zinc-800 w-full h-full"> 
        
       
        <div class="w-[90%] h-full mx-auto" :class="state.open_tab.name === 'Credit Card' ? 'uk-active' : ''">
          <div v-if="state.open_tab.name === 'Credit Card' " id="tab-credit_card" class="min-h-[30rem] mx-10 p-8 pb-20 fade-in">
            
            


          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

  // Stores:
  const auth = authStore()

  // Setup

  // Props:

  // State:
  const state = reactive({
    user: false,
    dialog: false,
    success: false,
    open_tab: false,
    tabs: [
      {
        name: "Credit Card",
        icon: "mdi-credit-card-outline",
        component: "CreditCard",
      },
      {
        name: "PayPal",
        icon: "mdi-paypal",
        component: "PayPal",
      },
      {
        name: "Apple Pay",
        icon: "mdi-apple",
        component: "ApplePay",
      },
      // {
      //   name: 'Google Pay',
      //   icon: 'mdi-google-wallet',
      //   component: 'GooglePay'
      // }
    ],
    edit_method_dialog: false,
    delete_method_dialog: false,
    new_card: {
      name: "",
      address: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postal_code: "",
        state: "",
      },
    },
  });
  
  // Emits:
  const emit = defineEmits(['close'])

  // Methods
  const toggle_tab = (tab) => {
    state.open_tab = tab

}

  // Lifecycle Hooks
  onMounted(() => {

    // Don't fucking question it.
    state.open_tab = state.tabs[0]
  })

</script>

<style lang="scss" scoped>

</style>