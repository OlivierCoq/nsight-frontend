<template>
  <div
    v-if="auth.user"
    id="account"
    class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-10 overflow-y-scroll"
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
                      <a v-for="(tab, a) in state.tabs" :key="a" href="#" @click="toggle_tab(tab)" 
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

              <div v-if="state.open_tab.name === 'General' " id="general_tab" class="min-h-[50rem] p-8 pb-20 fade-in">
                <div class="space-y-6">

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> First Name </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input type="text" v-model="auth.user.first_name" :placeholder="auth.user.first_name" class="lg:w-1/2 w-full">
                      <small v-if="!validate_name(auth.user.first_name)" class="text-red-500 text-sm mt-2">Please use a full first name.</small>
                    </div>
                  </div>

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Last Name </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input type="text" v-model="auth.user.last_name" :placeholder="auth.user.last_name" class="lg:w-1/2 w-full">
                      <small v-if="!validate_name(auth.user.last_name)" class="text-red-500 text-sm mt-2">Please use a full last name.</small>
                    </div>
                  </div>

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Email </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input type="email" v-model="auth.user.email" :placeholder="auth.user.email" class="lg:w-1/2 w-full">
                      <small v-if="!validate_email(auth.user.email)" class="text-red-500 text-sm mt-2">Please use a valid email.</small>
                    </div>
                  </div> 

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Phone </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input 
                        v-model="auth.user.phone_number"
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
                      <small v-if="!auth.user.phone_number" class="text-red-500 text-sm mt-2">Please use a valid phone number.</small>
                    </div>
                  </div>

                  <!-- Save Button: -->
                  <div class="md:flex items-center gap-10 pt-5">
                    <div class="md:w-32"></div>
                    <div class="flex-1 max-md:mt-4">
                      <button class="w-full lg:w-1/2 bg-amber-500 hover:bg-amber-600 text-white rounded-md py-2" @click="save_changes"> Save Changes </button>
                    </div>
                  </div>

                  <div class="md:flex items-start gap-10 px-4 pt-10">
                    <label class="md:w-1/2 text-start text-lg font-bold"> Update Password </label>
                  </div>

                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Current Password </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input type="password" v-model="state.password.current" class="lg:w-1/2 w-full">
                      <small v-if="state.errors.general.password.current" class="text-red-500 text-sm mt-2">{{ state.errors.general.password.current }}</small>
                    </div>
                  </div>
                  
                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> New Password </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input type="password" v-model="state.password.new" class="lg:w-1/2 w-full">
                      <small v-if="state.errors.general.password.new" class="text-red-500 text-sm mt-2">{{ state.errors.general.password.new }}</small>
                    </div>
                  </div>
                
                  <div class="md:flex items-center gap-10">
                    <label class="md:w-32 text-right"> Confirm Password </label>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <input type="password" v-model="state.password.confirm" class="lg:w-1/2 w-full">
                      <small v-if="state.errors.general.password.confirm" class="text-red-500 text-sm mt-2">{{ state.errors.general.password.confirm }}</small>
                    </div>
                  </div>

                  <!-- Update password button: -->
                  <div class="md:flex items-center gap-10 pt-5">
                    <div class="md:w-32"></div>
                    <div class="flex-1 max-md:mt-4 flex flex-col">
                      <button class="w-full lg:w-1/2 bg-amber-500 hover:bg-amber-600 text-white rounded-md py-2" @click="update_password"> Update Password </button>
                      <small v-if="state.success.password" class="text-green-500 text-sm mt-2">{{ state.success.password }}</small>
                    </div>
                  </div>
                  
                  

                </div>
              </div>

              <div v-if="state.open_tab.name === 'Address' " class="min-h-[50rem] p-8 pb-20 fade-in relative z-0">

                  
                <div v-if="!auth.user.addresses?.shipping?.length" class="flex gap-10">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold dark:text-white"> Address </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400"> {{ auth.user.address ? auth.user.address : 'No address added yet.' }} </p>
                  </div>
                </div>

                <div v-else>
                  <AddressCard :address="address" :key="b" :id="b" v-for="(address, b) in auth.user?.addresses?.shipping" />
                </div>
                
                <div class="w-full flex flex-col py-4">
                  <button class="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-md py-2" @click="open_address_modal"> 
                    Add Address 
                  </button>

                  <div style="z-index: 999999 !important;" v-if="state.tabs[1].modal" class="absolute px-10 pb-20 bg-zinc-900 shadow-xl top-5 rounded-lg w-[92%] h-[92%] flex flex-col overflow-y-scroll">
                    <div class="flex flex-row justify-between">
                      <div class="flex flex-1"></div>
                      <div class="w-[40px] h-[40px] flex flex-col justify-center align-center">
                        <button
                          class="absolute top-[10px] right-[8px] p-4"
                          type="button"
                          uk-close
                          @click="state.tabs[1].modal = false"
                          ></button>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col">
                      <h3 class="text-lg font-semibold text-white"> Add Address </h3>
                      <div class="flex flex-col gap-4">
                        <div class="flex flex-row justify-between">
                          <div class="mx-1 flex-1"> 
                            <input type="text" v-model="state.tabs[1].new_address.first_name" @keydown="state.errors.address.new_address.first_name = false" placeholder="First Name" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.first_name" class="text-red-500 text-sm m-2">Please use a full first name.</small>
                          </div>
                          <div class="mx-1 flex-1"> 
                            <input type="text" v-model="state.tabs[1].new_address.last_name" @keydown="state.errors.address.new_address.last_name = false" placeholder="Last Name" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.last_name" class="text-red-500 text-sm m-2">Please use a full last name.</small>
                          </div>
                        </div>
                          <div class="mx-1 flex-1">
                            <input type="text" required v-model="state.tabs[1].new_address.street" @keydown="state.errors.address.new_address.street = false" placeholder="Street" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.street" class="text-red-500 text-sm m-2">Please enter an address street</small>
                          </div>
                          <div class="mx-1 flex-1">
                            <input type="text" v-model="state.tabs[1].new_address.street_2" placeholder="Street 2 (optional)" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                          </div>
                          <div class="mx-1 flex-1">
                            <input type="text" required v-model="state.tabs[1].new_address.town_city" @keydown="state.errors.address.new_address.town_city = false" placeholder="Town/City" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.town_city" class="text-red-500 text-sm m-2">Please enter a town/city</small>
                          </div>
                          <div class="mx-1 flex-1">
                            <input type="text" required v-model="state.tabs[1].new_address.county_state" @keydown="state.errors.address.new_address.county_state = false" placeholder="County/State" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.county_state" class="text-red-500 text-sm m-2">Please enter a county/state</small>
                          </div>
                          <div class="mx-1 flex-1">
                            <input type="text" required v-model="state.tabs[1].new_address.postal_zip_code" @keydown="state.errors.address.new_address.postal_zip_code = false" placeholder="Postal/Zip Code" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.postal_zip_code" class="text-red-500 text-sm m-2">Please enter a postal/zip code</small>
                          </div>
                          <div class="mx-1 flex-1">
                            <input type="tel" required v-model="state.tabs[1].new_address.phone_number" @keydown="state.errors.address.new_address.phone_number = false" placeholder="Phone Number" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                            <small v-if="state.errors.address.new_address.phone_number" class="text-red-500 text-sm m-2">Please enter a phone number</small>
                          </div>
                       
                      </div>
                      <div class="flex flex-1"></div>
                      <div class="flex flex-col mt-10">
                        <button 
                          class="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-md py-2" 
                          :class="state.errors.address.new_address.disable ? 'opacity-[0.5] hover:bg-amber-500' : ''"
                          :disable="state.errors.address.new_address.disable"
                          @click="add_new_address"> 
                            Add New Address 
                          </button>
                      </div>
                    </div>
                  </div>

                  <div
                    
                    class="fade-in w-[90vw] md:w-[50vw] h-[90vh] md:h-[22vh] p-0 bg-zinc-200 dark:bg-zinc-900 shadow-xl mx-auto mt-20"
                    id="new_address_modal"
                    uk-modal
                    style="padding: 0 !important"
                    >
                    <div
                      class="uk-modal-dialog tt relative mx-auto rounded-lg shadow-xl overflow-hidden w-full"
                      style="width: 100% !important; height: 100% !important"
                      >
                      <div class="w-full bg-zinc-200 dark:bg-zinc-900 h-[10%]">
                        <button
                          class="absolute top-[10px] right-[8px] p-4"
                          type="button"
                          uk-close
                          @click="state.tabs[1].modal = false"
                          ></button>
                      </div>
                      <div class="w-[80vw] h-[80vh]">nigger nigger nigger</div>
                    </div>
                  </div>

                </div>
                
                
       
                
              </div>

              <div v-if="state.open_tab.name === 'Orders' " class="min-h-[10rem] p-8 pb-20 fade-in">
                  <!-- Accordion -->
                <ul class="relative space-y-3 uk-accordion" uk-accordion="active: 0">
                  <li class="uk-open">
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        All Orders
                        <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content h-[40rem] overflow-y-scroll">
                      <div class="flex flex-col gap-4">

                        <div v-if="auth.user.orders.data?.length" class="w-full">
                          <OrderCard v-for="(order, a) in auth.user.orders.data" :key="a" :order="order" />
                        </div>
                        <div v-else>
                          <p class="text-gray-500 dark:text-gray-400"> No orders found. </p>
                        </div>

                      </div>
                    </div>
                  </li>
                  
                  <li class="">
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        Cancelled
                        <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content h-[40rem] overflow-y-scroll">
                      <div v-if="auth.user.cancelled_orders.data?.length" class="w-full">
                        <OrderCard v-for="(cancelled_order, b) in auth.user.cancelled_orders.data" :key="b" :order="cancelled_order" />
                      </div>
                      <div v-else>
                        <p class="text-gray-500 dark:text-gray-400"> No cancelled orders found. </p>
                      </div>
                    </div>
                  </li>

                  <li class="">
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        Returns
                        <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content h-[40rem] overflow-y-scroll">
                      
                      <div v-if="auth.user.returns.data?.length" class="w-full">
                        <OrderCard v-for="(return_order, c) in auth.user.returns.data" :key="c" :order="return_order" />
                      </div> 
                      <div v-else>
                        <p class="text-gray-500 dark:text-gray-400"> No returns found. </p>
                      </div>
                    </div>
                  </li>


                </ul>
              </div>

              <div v-if="state.open_tab.name === 'Payment Methods' " class="min-h-[50rem] p-8 pb-20 fade-in relative z-0">
                
                <div class="w-full flex flex-col lg:flex-row">
                  <div class="w-full lg:w-1/3">
                    <h3 class="text-lg font-semibold dark:text-white"> Saved cards </h3>
                  </div>
                  <div class="w-full lg:w-2/3 flex flex-col px-4">
                    <div v-if="!auth.user.payment_methods.data.length" class="w-full flex justify-start mt-1">
                      <p class="text-gray-500 dark:text-gray-400"> No payment methods added yet. </p>
                    </div>
                    <div v-else class="w-full flex flex-col gap-4">
                      <PaymentMethodCard v-for="(payment_method, d) in auth.user.payment_methods.data" :key="d" :payment-method="payment_method" />
                    </div>
                  </div>
                </div>

                <div class="w-full flex flex-col p-4">
                  <!-- Add new payment method button: -->
                  <button class="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-md py-2" @click="state.tabs[3].add_new_method = true"> 
                    Add Credit/Debit Card
                  </button>

                  <small class="text-sm mt-4">* If you'd like to use any other payment methods, such as Google Pay or CashApp, these options are available upon checkout.</small>

                  <!-- Add new payment method modal: -->
                  <div v-if="state.tabs[3].add_new_method" class="fade-in absolute w-full h-full top-0 left-0 bg-black/50 z-10 flex flex-col justify-start items-start">
                    <div class="w-full flex flex-row justify-end align-end">
                      <button class="p-4" @click="state.tabs[3].add_new_method = false"> 
                        <font-awesome-icon :icon="['fas', 'times']" class="text-2xl text-white dark:text-zinc-500" />
                      </button>
                    </div>
                    <NewPaymentInterface @close="state.tabs[3].add_new_method = false" />
                  </div>

                </div>

              </div>
              
            </div> 
            
            
            
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
<script setup lang="ts">

import { parsePhoneNumber, AsYouType } from "libphonenumber-js";
import password from "~/presets/nsight_style_presets/password";
import { format } from 'date-fns';
import { formatPrice } from '~/utils/formatPrice';

//Leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import AddressCard from './components/AddressCard.vue'
import OrderCard from './components/OrderCard.vue'
import PaymentMethodCard from "./components/PaymentMethodCard.vue";
import NewPaymentInterface from "./components/NewPaymentInterface.vue";


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
    { 
      name: "Address", 
      component: "AccountEditAddress", 
      modal: false,
      new_address: {
        full_name: "",
        first_name: "",
        last_name: "",
        street: "",
        street_2: "",
        town_city: "",
        county_state: "",
        postal_zip_code: "",
        phone_number: "",
      }
    },
    { name: "Orders", component: "AccountOrders" },
    { 
      name: "Payment Methods", 
      component: "AccountPaymentMethods",
      add_new_method: false
    },
  ],
  saving: false,
  password: {
    current: "",
    new: "",
    confirm: "",
  },
  success: {
    general: null,
    password: null
  },
  errors: {
    general: {
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      password: {
        current: null,
        new: null,
        confirm: null,
      },
    },
    address: {
      new_address: {
        first_name: null,
        last_name: null,
        street: null,
        town_city: null,
        county_state: null,
        postal_zip_code: null,
        phone_number: null,
        disable: false
      }
    }
  }
})

onMounted(() => {
  state.open_tab = state.tabs[0]
})

// Methods
const validate_name = (text) => {
  return text.length > 2
}

const validate_email = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

  
const formatDate = (dateString: string) => {
  return format(new Date(dateString), "PPpp");
}

const toggle_tab = (tab) => {
  state.open_tab = tab

}

const save_changes = () => {
  state.saving = true
  

  if(!validate_name(auth.user.first_name)) {
    state.errors.general.first_name = "Please use a full first name."
  } 
  if(!validate_name(auth.user.last_name)) {
    state.errors.general.last_name = "Please use a full last name."
  }
  if(!validate_email(auth.user.email)) {
    state.errors.general.email = "Please use a valid email."
  }
  if(!auth.user.phone_number) {
    state.errors.general.phone_number = "Please use a valid phone number."
  }

  if(
    validate_name(auth.user.first_name) &&
    validate_name(auth.user.last_name) &&
    validate_email(auth.user.email) &&
    auth.user.phone_number
  ) {
    auth.updateUser()
    .then(() => {
      state.saving = false
      state.errors.general = {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        password: null,
      }
    })
    .catch((error) => {
      state.saving = false
      console.log(error)
    })
  } else {
    state.saving = false
  }

}

const update_password = () => {

    $fetch('/api/user/update_password', {
      method: 'POST',
      body: JSON.stringify({
        current_password: state.password.current,
        new_password: state.password.new,
        confirm_password: state.password.confirm,
        auth
      })
    }).then((res) => {
      // console.log('reeeessss', res)
      if(res.status == 'error') {
        if(res.message === 'Passwords do not match') {
          state.errors.general.password.confirm = res.message
        } else if (res.message === 'Current password is incorrect.') {
          state.errors.general.password.current = res.message
          state.errors.general.password.confirm = null
        } else {
          state.errors.general.password = res.message
        }
      } else {
        state.errors.general.password = {
          current: null,
          new: null,
          confirm: null,
        }

        auth.user.password = state.password.new
        nextTick(() => {
          auth.updateUser()
          state.success.password = "Password updated successfully!"
          nextTick(() => {
            state.password = {
              current: "",
              new: "",
              confirm: "",
            }
          })
            
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const open_address_modal = () => {
  state.tabs[1].modal = true
}

const add_new_address = async () => {
  Object.keys(state.tabs[1].new_address).forEach((key) => {
    if(!state.tabs[1].new_address[key]?.length) {
      state.errors.address.new_address[key] = `Please enter a ${key.replace('_', ' ')}`
      state.errors.address.new_address.disable = true
    } else {
      state.errors.address.new_address[key] = null
      state.errors.address.new_address.disable = false
      // console.log('all clear')
    }
    
  })
  nextTick(async ()=> {
    if(!state.errors.address.new_address.disable) {
      auth.user.addresses.shipping.push(state.tabs[1].new_address)
      if(!auth.user.selected_addresses) {
        auth.user.selected_addresses = {
          shipping: state.tabs[1].new_address
        }
      }


      auth.updateUser()

      nextTick(() => {


        state.tabs[1].modal = false
      })
    }
  })
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


  .p-accordion-header {
  a {
    color: #a3a3a3ad !important;
    border: 1px solid rgba(191, 185, 185, 0.425) !important;
    }
  }
  .p-accordion-content {
    background: transparent !important;
    border: 1px solid rgba(191, 185, 185, 0.425) !important;
  }
}
</style>