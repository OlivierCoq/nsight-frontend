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
                            <select v-model="state.tabs[1].new_address.country" class="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700">
                              <option v-for="(country, a) in country_codes" :key="a" :value="country.code">{{ country.name }}</option>
                              
                            </select>
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
        country: "US",
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
        country: null,
        phone_number: null,
        disable: false
      }
    }
  }
})

const country_codes = [
  {"code": "US", "code3": "USA", "name": "United States", "number": "840"},
  {"code": "CA", "code3": "CAN", "name": "Canada", "number": "124"},
  {"code": "AF", "code3": "AFG", "name": "Afghanistan", "number": "004"},
  {"code": "AL", "code3": "ALB", "name": "Albania", "number": "008"},
  {"code": "DZ", "code3": "DZA", "name": "Algeria", "number": "012"},
  {"code": "AS", "code3": "ASM", "name": "American Samoa", "number": "016"},
  {"code": "AD", "code3": "AND", "name": "Andorra", "number": "020"},
  {"code": "AO", "code3": "AGO", "name": "Angola", "number": "024"},
  {"code": "AI", "code3": "AIA", "name": "Anguilla", "number": "660"},
  {"code": "AQ", "code3": "ATA", "name": "Antarctica", "number": "010"},
  {"code": "AG", "code3": "ATG", "name": "Antigua and Barbuda", "number": "028"},
  {"code": "AR", "code3": "ARG", "name": "Argentina", "number": "032"},
  {"code": "AM", "code3": "ARM", "name": "Armenia", "number": "051"},
  {"code": "AW", "code3": "ABW", "name": "Aruba", "number": "533"},
  {"code": "AU", "code3": "AUS", "name": "Australia", "number": "036"},
  {"code": "AT", "code3": "AUT", "name": "Austria", "number": "040"},
  {"code": "AZ", "code3": "AZE", "name": "Azerbaijan", "number": "031"},
  {"code": "BS", "code3": "BHS", "name": "Bahamas (the)", "number": "044"},
  {"code": "BH", "code3": "BHR", "name": "Bahrain", "number": "048"},
  {"code": "BD", "code3": "BGD", "name": "Bangladesh", "number": "050"},
  {"code": "BB", "code3": "BRB", "name": "Barbados", "number": "052"},
  {"code": "BY", "code3": "BLR", "name": "Belarus", "number": "112"},
  {"code": "BE", "code3": "BEL", "name": "Belgium", "number": "056"},
  {"code": "BZ", "code3": "BLZ", "name": "Belize", "number": "084"},
  {"code": "BJ", "code3": "BEN", "name": "Benin", "number": "204"},
  {"code": "BM", "code3": "BMU", "name": "Bermuda", "number": "060"},
  {"code": "BT", "code3": "BTN", "name": "Bhutan", "number": "064"},
  {"code": "BO", "code3": "BOL", "name": "Bolivia (Plurinational State of)", "number": "068"},
  {"code": "BQ", "code3": "BES", "name": "Bonaire, Sint Eustatius and Saba", "number": "535"},
  {"code": "BA", "code3": "BIH", "name": "Bosnia and Herzegovina", "number": "070"},
  {"code": "BW", "code3": "BWA", "name": "Botswana", "number": "072"},
  {"code": "BV", "code3": "BVT", "name": "Bouvet Island", "number": "074"},
  {"code": "BR", "code3": "BRA", "name": "Brazil", "number": "076"},
  {"code": "IO", "code3": "IOT", "name": "British Indian Ocean Territory (the)", "number": "086"},
  {"code": "BN", "code3": "BRN", "name": "Brunei Darussalam", "number": "096"},
  {"code": "BG", "code3": "BGR", "name": "Bulgaria", "number": "100"},
  {"code": "BF", "code3": "BFA", "name": "Burkina Faso", "number": "854"},
  {"code": "BI", "code3": "BDI", "name": "Burundi", "number": "108"},
  {"code": "CV", "code3": "CPV", "name": "Cabo Verde", "number": "132"},
  {"code": "KH", "code3": "KHM", "name": "Cambodia", "number": "116"},
  {"code": "CM", "code3": "CMR", "name": "Cameroon", "number": "120"},
  {"code": "KY", "code3": "CYM", "name": "Cayman Islands (the)", "number": "136"},
  {"code": "CF", "code3": "CAF", "name": "Central African Republic (the)", "number": "140"},
  {"code": "TD", "code3": "TCD", "name": "Chad", "number": "148"},
  {"code": "CL", "code3": "CHL", "name": "Chile", "number": "152"},
  {"code": "CN", "code3": "CHN", "name": "China", "number": "156"},
  {"code": "CX", "code3": "CXR", "name": "Christmas Island", "number": "162"},
  {"code": "CC", "code3": "CCK", "name": "Cocos (Keeling) Islands (the)", "number": "166"},
  {"code": "CO", "code3": "COL", "name": "Colombia", "number": "170"},
  {"code": "KM", "code3": "COM", "name": "Comoros (the)", "number": "174"},
  {"code": "CD", "code3": "COD", "name": "Congo (the Democratic Republic of the)", "number": "180"},
  {"code": "CG", "code3": "COG", "name": "Congo (the)", "number": "178"},
  {"code": "CK", "code3": "COK", "name": "Cook Islands (the)", "number": "184"},
  {"code": "CR", "code3": "CRI", "name": "Costa Rica", "number": "188"},
  {"code": "HR", "code3": "HRV", "name": "Croatia", "number": "191"},
  {"code": "CU", "code3": "CUB", "name": "Cuba", "number": "192"},
  {"code": "CW", "code3": "CUW", "name": "Curaçao", "number": "531"},
  {"code": "CY", "code3": "CYP", "name": "Cyprus", "number": "196"},
  {"code": "CZ", "code3": "CZE", "name": "Czechia", "number": "203"},
  {"code": "CI", "code3": "CIV", "name": "Côte d'Ivoire", "number": "384"},
  {"code": "DK", "code3": "DNK", "name": "Denmark", "number": "208"},
  {"code": "DJ", "code3": "DJI", "name": "Djibouti", "number": "262"},
  {"code": "DM", "code3": "DMA", "name": "Dominica", "number": "212"},
  {"code": "DO", "code3": "DOM", "name": "Dominican Republic (the)", "number": "214"},
  {"code": "EC", "code3": "ECU", "name": "Ecuador", "number": "218"},
  {"code": "EG", "code3": "EGY", "name": "Egypt", "number": "818"},
  {"code": "SV", "code3": "SLV", "name": "El Salvador", "number": "222"},
  {"code": "GQ", "code3": "GNQ", "name": "Equatorial Guinea", "number": "226"},
  {"code": "ER", "code3": "ERI", "name": "Eritrea", "number": "232"},
  {"code": "EE", "code3": "EST", "name": "Estonia", "number": "233"},
  {"code": "SZ", "code3": "SWZ", "name": "Eswatini", "number": "748"},
  {"code": "ET", "code3": "ETH", "name": "Ethiopia", "number": "231"},
  {"code": "FK", "code3": "FLK", "name": "Falkland Islands (the) [Malvinas]", "number": "238"},
  {"code": "FO", "code3": "FRO", "name": "Faroe Islands (the)", "number": "234"},
  {"code": "FJ", "code3": "FJI", "name": "Fiji", "number": "242"},
  {"code": "FI", "code3": "FIN", "name": "Finland", "number": "246"},
  {"code": "FR", "code3": "FRA", "name": "France", "number": "250"},
  {"code": "GF", "code3": "GUF", "name": "French Guiana", "number": "254"},
  {"code": "PF", "code3": "PYF", "name": "French Polynesia", "number": "258"},
  {"code": "TF", "code3": "ATF", "name": "French Southern Territories (the)", "number": "260"},
  {"code": "GA", "code3": "GAB", "name": "Gabon", "number": "266"},
  {"code": "GM", "code3": "GMB", "name": "Gambia (the)", "number": "270"},
  {"code": "GE", "code3": "GEO", "name": "Georgia", "number": "268"},
  {"code": "DE", "code3": "DEU", "name": "Germany", "number": "276"},
  {"code": "GH", "code3": "GHA", "name": "Ghana", "number": "288"},
  {"code": "GI", "code3": "GIB", "name": "Gibraltar", "number": "292"},
  {"code": "GR", "code3": "GRC", "name": "Greece", "number": "300"},
  {"code": "GL", "code3": "GRL", "name": "Greenland", "number": "304"},
  {"code": "GD", "code3": "GRD", "name": "Grenada", "number": "308"},
  {"code": "GP", "code3": "GLP", "name": "Guadeloupe", "number": "312"},
  {"code": "GU", "code3": "GUM", "name": "Guam", "number": "316"},
  {"code": "GT", "code3": "GTM", "name": "Guatemala", "number": "320"},
  {"code": "GG", "code3": "GGY", "name": "Guernsey", "number": "831"},
  {"code": "GN", "code3": "GIN", "name": "Guinea", "number": "324"},
  {"code": "GW", "code3": "GNB", "name": "Guinea-Bissau", "number": "624"},
  {"code": "GY", "code3": "GUY", "name": "Guyana", "number": "328"},
  {"code": "HT", "code3": "HTI", "name": "Haiti", "number": "332"},
  {"code": "HM", "code3": "HMD", "name": "Heard Island and McDonald Islands", "number": "334"},
  {"code": "VA", "code3": "VAT", "name": "Holy See (the)", "number": "336"},
  {"code": "HN", "code3": "HND", "name": "Honduras", "number": "340"},
  {"code": "HK", "code3": "HKG", "name": "Hong Kong", "number": "344"},
  {"code": "HU", "code3": "HUN", "name": "Hungary", "number": "348"},
  {"code": "IS", "code3": "ISL", "name": "Iceland", "number": "352"},
  {"code": "IN", "code3": "IND", "name": "India", "number": "356"},
  {"code": "ID", "code3": "IDN", "name": "Indonesia", "number": "360"},
  {"code": "IR", "code3": "IRN", "name": "Iran (Islamic Republic of)", "number": "364"},
  {"code": "IQ", "code3": "IRQ", "name": "Iraq", "number": "368"},
  {"code": "IE", "code3": "IRL", "name": "Ireland", "number": "372"},
  {"code": "IM", "code3": "IMN", "name": "Isle of Man", "number": "833"},
  {"code": "IL", "code3": "ISR", "name": "Israel", "number": "376"},
  {"code": "IT", "code3": "ITA", "name": "Italy", "number": "380"},
  {"code": "JM", "code3": "JAM", "name": "Jamaica", "number": "388"},
  {"code": "JP", "code3": "JPN", "name": "Japan", "number": "392"},
  {"code": "JE", "code3": "JEY", "name": "Jersey", "number": "832"},
  {"code": "JO", "code3": "JOR", "name": "Jordan", "number": "400"},
  {"code": "KZ", "code3": "KAZ", "name": "Kazakhstan", "number": "398"},
  {"code": "KE", "code3": "KEN", "name": "Kenya", "number": "404"},
  {"code": "KI", "code3": "KIR", "name": "Kiribati", "number": "296"},
  {"code": "KP", "code3": "PRK", "name": "Korea (the Democratic People's Republic of)", "number": "408"},
  {"code": "KR", "code3": "KOR", "name": "Korea (the Republic of)", "number": "410"},
  {"code": "KW", "code3": "KWT", "name": "Kuwait", "number": "414"},
  {"code": "KG", "code3": "KGZ", "name": "Kyrgyzstan", "number": "417"},
  {"code": "LA", "code3": "LAO", "name": "Lao People's Democratic Republic (the)", "number": "418"},
  {"code": "LV", "code3": "LVA", "name": "Latvia", "number": "428"},
  {"code": "LB", "code3": "LBN", "name": "Lebanon", "number": "422"},
  {"code": "LS", "code3": "LSO", "name": "Lesotho", "number": "426"},
  {"code": "LR", "code3": "LBR", "name": "Liberia", "number": "430"},
  {"code": "LY", "code3": "LBY", "name": "Libya", "number": "434"},
  {"code": "LI", "code3": "LIE", "name": "Liechtenstein", "number": "438"},
  {"code": "LT", "code3": "LTU", "name": "Lithuania", "number": "440"},
  {"code": "LU", "code3": "LUX", "name": "Luxembourg", "number": "442"},
  {"code": "MO", "code3": "MAC", "name": "Macao", "number": "446"},
  {"code": "MG", "code3": "MDG", "name": "Madagascar", "number": "450"},
  {"code": "MW", "code3": "MWI", "name": "Malawi", "number": "454"},
  {"code": "MY", "code3": "MYS", "name": "Malaysia", "number": "458"},
  {"code": "MV", "code3": "MDV", "name": "Maldives", "number": "462"},
  {"code": "ML", "code3": "MLI", "name": "Mali", "number": "466"},
  {"code": "MT", "code3": "MLT", "name": "Malta", "number": "470"},
  {"code": "MH", "code3": "MHL", "name": "Marshall Islands (the)", "number": "584"},
  {"code": "MQ", "code3": "MTQ", "name": "Martinique", "number": "474"},
  {"code": "MR", "code3": "MRT", "name": "Mauritania", "number": "478"},
  {"code": "MU", "code3": "MUS", "name": "Mauritius", "number": "480"},
  {"code": "YT", "code3": "MYT", "name": "Mayotte", "number": "175"},
  {"code": "MX", "code3": "MEX", "name": "Mexico", "number": "484"},
  {"code": "FM", "code3": "FSM", "name": "Micronesia (Federated States of)", "number": "583"},
  {"code": "MD", "code3": "MDA", "name": "Moldova (the Republic of)", "number": "498"},
  {"code": "MC", "code3": "MCO", "name": "Monaco", "number": "492"},
  {"code": "MN", "code3": "MNG", "name": "Mongolia", "number": "496"},
  {"code": "ME", "code3": "MNE", "name": "Montenegro", "number": "499"},
  {"code": "MS", "code3": "MSR", "name": "Montserrat", "number": "500"},
  {"code": "MA", "code3": "MAR", "name": "Morocco", "number": "504"},
  {"code": "MZ", "code3": "MOZ", "name": "Mozambique", "number": "508"},
  {"code": "MM", "code3": "MMR", "name": "Myanmar", "number": "104"},
  {"code": "NA", "code3": "NAM", "name": "Namibia", "number": "516"},
  {"code": "NR", "code3": "NRU", "name": "Nauru", "number": "520"},
  {"code": "NP", "code3": "NPL", "name": "Nepal", "number": "524"},
  {"code": "NL", "code3": "NLD", "name": "Netherlands (the)", "number": "528"},
  {"code": "NC", "code3": "NCL", "name": "New Caledonia", "number": "540"},
  {"code": "NZ", "code3": "NZL", "name": "New Zealand", "number": "554"},
  {"code": "NI", "code3": "NIC", "name": "Nicaragua", "number": "558"},
  {"code": "NE", "code3": "NER", "name": "Niger (the)", "number": "562"},
  {"code": "NG", "code3": "NGA", "name": "Nigeria", "number": "566"},
  {"code": "NU", "code3": "NIU", "name": "Niue", "number": "570"},
  {"code": "NF", "code3": "NFK", "name": "Norfolk Island", "number": "574"},
  {"code": "MP", "code3": "MNP", "name": "Northern Mariana Islands (the)", "number": "580"},
  {"code": "NO", "code3": "NOR", "name": "Norway", "number": "578"},
  {"code": "OM", "code3": "OMN", "name": "Oman", "number": "512"},
  {"code": "PK", "code3": "PAK", "name": "Pakistan", "number": "586"},
  {"code": "PW", "code3": "PLW", "name": "Palau", "number": "585"},
  {"code": "PS", "code3": "PSE", "name": "Palestine, State of", "number": "275"},
  {"code": "PA", "code3": "PAN", "name": "Panama", "number": "591"},
  {"code": "PG", "code3": "PNG", "name": "Papua New Guinea", "number": "598"},
  {"code": "PY", "code3": "PRY", "name": "Paraguay", "number": "600"},
  {"code": "PE", "code3": "PER", "name": "Peru", "number": "604"},
  {"code": "PH", "code3": "PHL", "name": "Philippines (the)", "number": "608"},
  {"code": "PN", "code3": "PCN", "name": "Pitcairn", "number": "612"},
  {"code": "PL", "code3": "POL", "name": "Poland", "number": "616"},
  {"code": "PT", "code3": "PRT", "name": "Portugal", "number": "620"},
  {"code": "PR", "code3": "PRI", "name": "Puerto Rico", "number": "630"},
  {"code": "QA", "code3": "QAT", "name": "Qatar", "number": "634"},
  {"code": "MK", "code3": "MKD", "name": "Republic of North Macedonia", "number": "807"},
  {"code": "RO", "code3": "ROU", "name": "Romania", "number": "642"},
  {"code": "RU", "code3": "RUS", "name": "Russian Federation (the)", "number": "643"},
  {"code": "RW", "code3": "RWA", "name": "Rwanda", "number": "646"},
  {"code": "RE", "code3": "REU", "name": "Réunion", "number": "638"},
  {"code": "BL", "code3": "BLM", "name": "Saint Barthélemy", "number": "652"},
  {"code": "SH", "code3": "SHN", "name": "Saint Helena, Ascension and Tristan da Cunha", "number": "654"},
  {"code": "KN", "code3": "KNA", "name": "Saint Kitts and Nevis", "number": "659"},
  {"code": "LC", "code3": "LCA", "name": "Saint Lucia", "number": "662"},
  {"code": "MF", "code3": "MAF", "name": "Saint Martin (French part)", "number": "663"},
  {"code": "PM", "code3": "SPM", "name": "Saint Pierre and Miquelon", "number": "666"},
  {"code": "VC", "code3": "VCT", "name": "Saint Vincent and the Grenadines", "number": "670"},
  {"code": "WS", "code3": "WSM", "name": "Samoa", "number": "882"},
  {"code": "SM", "code3": "SMR", "name": "San Marino", "number": "674"},
  {"code": "ST", "code3": "STP", "name": "Sao Tome and Principe", "number": "678"},
  {"code": "SA", "code3": "SAU", "name": "Saudi Arabia", "number": "682"},
  {"code": "SN", "code3": "SEN", "name": "Senegal", "number": "686"},
  {"code": "RS", "code3": "SRB", "name": "Serbia", "number": "688"},
  {"code": "SC", "code3": "SYC", "name": "Seychelles", "number": "690"},
  {"code": "SL", "code3": "SLE", "name": "Sierra Leone", "number": "694"},
  {"code": "SG", "code3": "SGP", "name": "Singapore", "number": "702"},
  {"code": "SX", "code3": "SXM", "name": "Sint Maarten (Dutch part)", "number": "534"},
  {"code": "SK", "code3": "SVK", "name": "Slovakia", "number": "703"},
  {"code": "SI", "code3": "SVN", "name": "Slovenia", "number": "705"},
  {"code": "SB", "code3": "SLB", "name": "Solomon Islands", "number": "090"},
  {"code": "SO", "code3": "SOM", "name": "Somalia", "number": "706"},
  {"code": "ZA", "code3": "ZAF", "name": "South Africa", "number": "710"},
  {"code": "GS", "code3": "SGS", "name": "South Georgia and the South Sandwich Islands", "number": "239"},
  {"code": "SS", "code3": "SSD", "name": "South Sudan", "number": "728"},
  {"code": "ES", "code3": "ESP", "name": "Spain", "number": "724"},
  {"code": "LK", "code3": "LKA", "name": "Sri Lanka", "number": "144"},
  {"code": "SD", "code3": "SDN", "name": "Sudan (the)", "number": "729"},
  {"code": "SR", "code3": "SUR", "name": "Suriname", "number": "740"},
  {"code": "SJ", "code3": "SJM", "name": "Svalbard and Jan Mayen", "number": "744"},
  {"code": "SE", "code3": "SWE", "name": "Sweden", "number": "752"},
  {"code": "CH", "code3": "CHE", "name": "Switzerland", "number": "756"},
  {"code": "SY", "code3": "SYR", "name": "Syrian Arab Republic", "number": "760"},
  {"code": "TW", "code3": "TWN", "name": "Taiwan", "number": "158"},
  {"code": "TJ", "code3": "TJK", "name": "Tajikistan", "number": "762"},
  {"code": "TZ", "code3": "TZA", "name": "Tanzania, United Republic of", "number": "834"},
  {"code": "TH", "code3": "THA", "name": "Thailand", "number": "764"},
  {"code": "TL", "code3": "TLS", "name": "Timor-Leste", "number": "626"},
  {"code": "TG", "code3": "TGO", "name": "Togo", "number": "768"},
  {"code": "TK", "code3": "TKL", "name": "Tokelau", "number": "772"},
  {"code": "TO", "code3": "TON", "name": "Tonga", "number": "776"},
  {"code": "TT", "code3": "TTO", "name": "Trinidad and Tobago", "number": "780"},
  {"code": "TN", "code3": "TUN", "name": "Tunisia", "number": "788"},
  {"code": "TR", "code3": "TUR", "name": "Turkey", "number": "792"},
  {"code": "TM", "code3": "TKM", "name": "Turkmenistan", "number": "795"},
  {"code": "TC", "code3": "TCA", "name": "Turks and Caicos Islands (the)", "number": "796"},
  {"code": "TV", "code3": "TUV", "name": "Tuvalu", "number": "798"},
  {"code": "UG", "code3": "UGA", "name": "Uganda", "number": "800"},
  {"code": "UA", "code3": "UKR", "name": "Ukraine", "number": "804"},
  {"code": "AE", "code3": "ARE", "name": "United Arab Emirates (the)", "number": "784"},
  {"code": "GB", "code3": "GBR", "name": "United Kingdom of Great Britain and Northern Ireland (the)", "number": "826"},
  {"code": "UM", "code3": "UMI", "name": "United States Minor Outlying Islands (the)", "number": "581"},
  {"code": "UY", "code3": "URY", "name": "Uruguay", "number": "858"},
  {"code": "UZ", "code3": "UZB", "name": "Uzbekistan", "number": "860"},
  {"code": "VU", "code3": "VUT", "name": "Vanuatu", "number": "548"},
  {"code": "VE", "code3": "VEN", "name": "Venezuela (Bolivarian Republic of)", "number": "862"},
  {"code": "VN", "code3": "VNM", "name": "Viet Nam", "number": "704"},
  {"code": "VG", "code3": "VGB", "name": "Virgin Islands (British)", "number": "092"},
  {"code": "VI", "code3": "VIR", "name": "Virgin Islands (U.S.)", "number": "850"},
  {"code": "WF", "code3": "WLF", "name": "Wallis and Futuna", "number": "876"},
  {"code": "EH", "code3": "ESH", "name": "Western Sahara", "number": "732"},
  {"code": "YE", "code3": "YEM", "name": "Yemen", "number": "887"},
  {"code": "ZM", "code3": "ZMB", "name": "Zambia", "number": "894"},
  {"code": "ZW", "code3": "ZWE", "name": "Zimbabwe", "number": "716"},
  {"code": "AX", "code3": "ALA", "name": "Åland Islands", "number": "248"}
]


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