<template>
  <div
    v-if="auth.user"
    id="account"
    class="h-100 w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-10"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="max-w-2xl mx-auto">
                <!-- heading title -->
        <div class="page__heading py-6 mt-6">
          <h1> Settings </h1>
        </div>

        <div class="fade-in fadein bg-zinc-100 bg-transparent border border-zinc-200 rounded-xl shadow-sm dark:border-zinc-700 dark:bg-transparent shadow-xl">

            <!-- Head unit -->
          <div class="flex md:gap-8 gap-4 items-center md:p-10 p-6">
            <div class="relative md:w-20 md:h-20 w-12 h-12 shrink-0"> 

              <label for="file" class="cursor-pointer">
                <img id="img" :src="auth.user.profile_picture ? auth.user.profile_picture.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" class="object-cover w-full h-full rounded-full" alt=""/>
                <input type="file" id="file" class="hidden" />
              </label>

              <label for="file" class="md:p-1 p-0.5 rounded-full bg-zinc-600 md:border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-zinc-700">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="md:w-4 md:h-4 w-3 h-3 fill-white">
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                      <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>

                  <input id="file" type="file" class="hidden" />
              </label>
            </div>

            <div class="flex-1">
              <h3 class="md:text-xl text-base font-semibold text-black dark:text-white">{{ auth.user.first_name }} {{  auth.user.last_name }}</h3>
              <p class="text-sm text-amber-600 mt-1 font-normal">{{auth.user.nsight_id.nsight_id}}</p>
            </div>

          </div>

          <hr class="border-t border-gray-100 dark:border-zinc-700">

          <!-- nav tabs -->
          <div class="relative -mb-px px-2" tabindex="-1" uk-slider="finite: true">

              <nav class="overflow-hidden rounded-xl uk-slider-container pt-2">
                <ul class="uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-gray-500 text-sm dark:text-white" 
                    uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
                    > 
                    
                    <li class="w-auto pr-2.5"> 
                      <a v-for="(tab, a) in state.tabs" :key="a" href="#" @click="state.open_tab = tab" 
                        class="inline-block p-4 pt-2 border-b-2 border-transparent aria-expanded:text-zinc-500 aria-expanded:border-zinc-500"
                        :class="state.open_tab === tab ? 'text-neutral-900 border-black dark:text-white dark:border-white' : 'text-gray-500 dark:text-white/80'"
                      > 
                        {{ tab.name }} 
                      </a> 
                    </li>
                      
                </ul>
            </nav>
                      
              <!-- <a class="absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2.5 justify-start rounded-xl bg-gradient-to-r from-white via-white dark:from-zinc-800 dark:via-zinc-800" href="#" uk-slider-item="previous"> <ion-icon name="chevron-back" class="text-2xl ml-1"></ion-icon> </a>
              <a class="absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2.5 justify-end rounded-xl bg-gradient-to-l from-white via-white dark:from-zinc-800 dark:via-zinc-800" href="#" uk-slider-item="next">  <ion-icon name="chevron-forward" class="text-2xl mr-1"></ion-icon> </a>
           -->
          </div>
        </div>

        <!-- tab content -->
        <div class="mt-6 mb-20 text-sm font-medium text-gray-600 dark:text-white/80 shadow-xl rounded-md">
          <div id="setting_tab" class="uk-switcher bg-zinc-100 border rounded-xl shadow-sm md:py-12 md:px-20 p-6 overflow-hidden dark:border-zinc-700 dark:bg-zinc-800"> 
            
            <!-- tab user basic info -->
            <div>

              <div v-if="state.open_tab.name === 'General' " id="general_tab" class="min-h-[10rem] p-8 pb-20 fade-in">
                <div class="space-y-6">

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> First Name </label>
                    <div class="flex-1 max-md:mt-4">
                      <input type="text" :placeholder="auth.user.first_name" class="lg:w-1/2 w-full">
                    </div>
                  </div>

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Last Name </label>
                    <div class="flex-1 max-md:mt-4">
                      <input type="text" :placeholder="auth.user.last_name" class="lg:w-1/2 w-full">
                    </div>
                  </div>

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Email </label>
                    <div class="flex-1 max-md:mt-4">
                      <input type="text" :placeholder="auth.user.email" class="lg:w-1/2 w-full">
                    </div>
                  </div> 

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Phone </label>
                    <div class="flex-1 max-md:mt-4">
                      <input 
                        type="tel" :placeholder="auth.user.phone_number" 
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="lg:w-1/2 w-full"
                        @keydown="
                          () => {
                            auth.user.phone_number = new AsYouType()
                              .input(auth.user.phone_number)
                              .replace(/\s/g, '-');
                          }
                        "
                      >
                    </div>
                  </div>

                  <div class="md:flex items-start gap-10 px-4 pt-10">
                    <label class="md:w-1/2 text-start text-lg font-bold"> Update Password </label>
                  </div>

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Current Password </label>
                    <div class="flex-1 max-md:mt-4">
                      <input type="password" class="lg:w-1/2 w-full">
                    </div>
                  </div>
                  
                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> New Password </label>
                    <div class="flex-1 max-md:mt-4">
                      <input type="password"  class="lg:w-1/2 w-full">
                    </div>
                  </div>
                
                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Confirm Password </label>
                    <div class="flex-1 max-md:mt-4">
                      <input type="password" class="lg:w-1/2 w-full">
                    </div>
                  </div>
                  
                  <!-- Save Button: -->
                  <div class="md:flex items-center gap-10 pt-10">
                    <div class="md:w-32"></div>
                    <div class="flex-1 max-md:mt-4">
                      <button class="w-full lg:w-1/2 bg-amber-600 text-white rounded-md py-2"> Save Changes </button>
                    </div>
                  </div>

                </div>
              </div>

              <div v-if="state.open_tab.Address" class="min-h-[10rem] p-8 pb-20 fade-in"></div>
              
            </div> 
            
            
            
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
<script setup>

import { parsePhoneNumber, AsYouType } from "libphonenumber-js";


definePageMeta({
  middleware: ["auth"],
  layout: "inner",
});
// Add validation rules for state.address.new_address:

// Stores
const auth = authStore()
const prodStore = productsStore()
const settings = settingsStore()

const state = reactive({
  open_tab: false,
  tabs: [
    { name: "General", component: "AccountEditPersonal" },
    { name: "Address", component: "AccountEditAddress" },
    { name: "Orders", component: "AccountOrders" },
    { name: "Payment Methods", component: "AccountPaymentMethods" },
  ],
  saving: false,
  errors: {
    general: {
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      password: null,
    }
  }
})

onMounted(() => {
  state.open_tab = state.tabs[0]
})

// Methods

const validate_email = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}


const validate_general =  () => {
  const errors = state.errors.general
  errors.first_name = !state.first_name ? "First name is required" : null
  errors.last_name = !state.last_name ? "Last name is required" : null
  errors.email = (!state.email || !validate_email(state.email))  ? "Proper email's required" : null
  errors.phone_number = !state.phone_number ? "Phone number is required" : null
  errors.password = !state.password ? "Password is required" : null
}

const save_changes = () => {
  state.saving = true
   
  // setTimeout(() => {
  //   state.saving = false
  // }, 2000)
}

</script>
<style lang="scss">
#account {
  height: 100vh;

  .ctr-address {
    height: 200px;
    width: 250px;
    color: white;
    background-color: #272323;
    border-radius: 5px;
  }

  .ctr-address.selected {
    background-color: #464646;
  }

  .ctr-orders {
    height: 500px;
  }
}
</style>
