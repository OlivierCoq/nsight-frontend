<template>
  <div
    id="cart"
    class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="main__inner">

        <div class="cls-active: bg-zing-100/60 z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top sticky">
          <div class="w-full flex flex-row justify-between">
            <div class="page__heading">
              <h1>Checkout</h1> 
            </div>

            <div class="overflow-hidden my-6">
              <div id="product-nav" class="relative flex items-center justify-between border-b dark:border-slate-800 uk-animation-slide-top-medium"></div>
            </div>
            
          </div>
        </div>

        <div class="w-full flex">
            <div class="flex flex-col md:flex-row w-full gap-2">
              <div class="w-full md:w-3/4">
                <div class="flex flex-col w-full mb-2 text-xs font-normal text-zinc-500 dark:text-white/80 uk-animation-scale-up delay-100">
                  
                  <!-- Checkout Accordion Steps here -->

            <ul class="relative space-y-3 uk-accordion" uk-accordion="active: 0">
                <li class="uk-open">
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        1. Payment Method
                        <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                        <div v-if="auth.user.payment_methods.length"></div>
                        <div>
                            <p v-if="!auth.user.payment_methods.length" class="text-neutral-900 dark:text-white font-thin" style="font-size: 1.1rem; line-height: normal; ">
                              No payment methods found! Add a payment method to use for your next order.
                            </p>
                            <div class="w-full flex flex-col">

                                <!-- Credit Cards: -->
                              <p v-if="auth.user.payment_methods.length" class="text-neutral-900 dark:text-white text-md">Cards on file:</p>
                              <div class="w-full flex flex-row flex-wrap mb-2">
                                <!-- List existing payment methods here: -->
                                <div v-for="(method, i) in auth.user.payment_methods" :key="i" class="w-1/3  h-[110px] fade-in"> 

                                    <!-- Deleting -->
                                  <div v-if="method.deleting" class="w-full h-full flex flex-col items-center justify-center">
                                    <p class="text-sm text-neutral-900 dark:text-white font-thin">Are you sure you want to delete this payment method?</p>
                                    <div class="w-full flex flex-row justify-center items-center">
                                      <button class="text-xs text-red-500 font-thin curser-pointer me-2" @click="delete_method(method)"> 
                                        <span>Yes</span> &nbsp;
                                      </button>
                                      <button class="text-xs text-yellow-500 font-thin curser-pointer" @click="method.deleting = false"> 
                                        <span>No</span>
                                      </button>
                                    </div>
                                  </div>

                                  <div 
                                    v-else
                                    class="w-[95%] h-full overflow-scroll flex flex-col justify-between items-start mb-2 me-2 px-3 py-4 rounded-md cursor-pointer shadow-md"
                                    :class="state.selected_payment_method?.card && (method.card.id == state.selected_payment_method?.card?.id) ? 'shadow-xl border bg-white dark:bg-zinc-500' : 'bg-white dark:bg-zinc-900'"
                                  >
                                    <div class="w-full flex flex-row">
                                      <div class="w-[40px] flex"> 
                                        <font-awesome-icon :icon="['fab', format_card_brand(method.card.cardBrand)]" 
                                          class="text-2xl" 
                                          :class="state.selected_payment_method && (method.card.id == state.selected_payment_method?.card?.id) ? 'text-neutral-900' : 'text-neutral-300'"
                                        />
                                      </div>
                                      <div class="w-1/2 flex">
                                        <p 
                                          class="text-sm font-thin m-0"
                                          :class="state.selected_payment_method && (method.card.id === state.selected_payment_method?.card?.id) ? 'text-neutral-900' : 'text-neutral-300'"
                                        >{{ method.card.cardBrand }} | {{ method.card.last4 }}</p>
                                      </div>
                                    </div>
                                    <div class="w-full flex flex-row items-end justify-end">
                                      <span v-if="state.selected_payment_method && (method.card.id === state.selected_payment_method?.card?.id)" class="me-2">Selected</span>
                                      <button 
                                        v-else
                                        @click="select_payment_method(method)"
                                        class="text-xs text-yellow-500 font-thin curser-pointer me-2"
                                      >
                                        <span>Select</span>
                                      </button>
                                      <!-- <button class="text-xs text-red-500 font-thin curser-pointer me-2" @click="init_delete(method)"> 
                                        <span>Delete</span> &nbsp;
                                      </button> -->
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="w-1/4 flex flex-row justify-start items-start">
                                <button 
                                  v-if="!auth?.user?.payment_methods?.data?.length"
                                  @click="state.update.payment = true"
                                  class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer bg-yellow-500 hover:bg-yellow-600 w-full rounded-md shadow-md py-2 mb-4"
                                >Add Card</button>
                              </div>
                              <div v-show="state.update.payment" class="ctr-payment-tabs w-full">


                                <div class="bg-white shadow rounded-md overflow-hidden dark:bg-zinc-900">

                                  <div class="relative border-b dark:border-zinc-700">
                                    <ul class="flex gap-2 text-sm text-center text-gray-600 capitalize font-semibold dark:text-white/80 -mb-px" uk-switcher="connect: #payment_tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">  
                                      <li v-for="(tab, a) in state.tabs" :key="a" :class="tab.name === state.active_tab.name ? 'uk-active' : ''" @click="state.active_tab = tab"> 
                                        <a  href="#" 
                                          class="flex items-center md:p-4 p-2.5  border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white" aria-expanded="true"
                                        > 
                                           <font-awesome-icon :icon="[tab.fa_class, tab.fa_icon ]" /> &nbsp; 
                                           <span :class="tab.name == state.active_tab.name ? 'text-yellow-600' : ''">{{ tab.name }}</span>
                                        </a> 
                                      </li>
                                     </ul> 
                                  </div>  
                                
                                  <div id="payment_tabs" class="uk-switcher text-sm" style="touch-action: pan-y pinch-zoom;">
                                    <div :class="state.active_tab.name === 'Credit Card' ? 'uk-active' : ''" class="fade-in">
                                      <div v-show="state.active_tab.name === 'Credit Card'" class="p-6">
                                        <p class="font-normal"> 
                                          Credit Card
                                        </p>
                                        <div id="card-container"></div>
                                        <button id="card-button" class="py-2 px-4 btn bg-yellow-500 hover:bg-yellow-600 text-white rounded-md w-full shadow-md">+ Card</button>
                                        <p v-if="state.update.success" class="text-success mt-2 text-green-300"> {{ state.update.success }} </p>
                                      </div>
                                    </div>
                                    <!-- <div :class="state.active_tab.name === 'PayPal' ? 'uk-active' : ''" class="fade-in">
                                      <div class="p-6"> 
                                        <p class="font-normal">PayPal</p>
                                      </div>
                                    </div>
                                    <div :class="state.active_tab.name === 'Apple Pay' ? 'uk-active' : ''" class="fade-in">
                                      <div class="p-6">
                                        <p class="font-normal"> Apple Pay</p>
                                      </div>
                                    </div> -->
                                  </div>
                                </div>






                              </div>

                              <!-- <div class="w-full text-center">
                                <p class="text-white text-lg my-5">OR</p>
                              </div> -->

                              <!-- Digital Wallets are currently not working.  -->
                              <!-- <div class="w-full flex flex-col">
                                <p class="text-neutral-900 dark:text-white text-md mb-5">Digital Wallets:</p>
                                <div class="w-full flex flex-col py-2 justify-start items-start align-start">

                                  <div v-show="browser == 'Safari'" id="apple-pay" class="my-2">
                                    <div id="payment-form">
                                      <div id="apple-payment-status-container"></div>
                                      <div id="apple-pay-button" class="cursor-pointer"></div>
                                    </div>
                                  </div>

                                  <div id="google-pay" class="my-2">
                                    <div id="payment-form">
                                      <div id="google-payment-status-container" class="p-4"></div>
                                      <div id="google-pay-button"></div>
                                    </div>
                                  </div>

                                </div>
                              </div> -->

                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        2. Shipping
                        <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content" hidden="">

                      <div v-if="auth.user.addresses.shipping.length">
                        <p class="text-neutral-900 dark:text-white text-md">Addresses on file:</p>
                        <div class="w-full flex flex-row flex-wrap mb-2">
                          <!-- List existing addresses here: -->
                          <div v-for="(address, a) in auth.user.addresses.shipping" :key="a" class="w-1/3  min-h-[110px] fade-in"> 
                            <div 
                              class="w-[95%] h-full  flex flex-col justify-between items-start mb-2 me-2 px-3 py-4 rounded-md cursor-pointer shadow-md"
                              :class="state.selected_shipping_method && ((address.street + address.street2) == (state.selected_shipping_method.street + state.selected_shipping_method.street2)) ? 'shadow-xl border bg-white dark:bg-zinc-500' : 'bg-white dark:bg-zinc-900'"
                            >
                              <div class="w-full flex flex-row">
                                <p 
                                  class="text-sm font-thin m-0"
                                  :class="state.selected_shipping_method && ((address.street + address.street2) == (state.selected_shipping_method.street + state.selected_shipping_method.street2)) ? 'text-neutral-900' : 'text-neutral-300'"
                                > 
                                  {{ address.street }} {{ address.street2 }} <br/>
                                  {{ address.town_city }}, {{ address.state }} {{ address.postal_zip_code }}
                                </p>
                              </div>
                              <div class="w-full flex flex-row">
                                <span v-if="state.selected_shipping_method && ((address.street + address.street2) == (state.selected_shipping_method.street + state.selected_shipping_method.street2))" class="me-2">Selected</span>
                                <button 
                                  v-else
                                  @click="state.selected_shipping_method = address"
                                  class="text-xs text-yellow-500 font-thin curser-pointer me-2"
                                >
                                  <span>Select</span>
                                </button>
                              </div>

                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else class="w-full h-full relative">
                        <p class="text-neutral-900 dark:text-white font-thin" style="font-size: 1.1rem; line-height: normal; ">
                          No addresses found! Add an address to use for this order.
                        </p>
                        <button 
                          class="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-md py-2" 
                          :class="state.errors.address.new_address.disable ? 'opacity-[0.5] hover:bg-amber-500' : ''"
                          :disable="state.errors.address.new_address.disable"
                          @click="state.address.new_address_modal = true"> 
                            Add New Address 
                          </button>

                          <div v-if="state.address.new_address_modal" class="fade-in absolute top-[6rem] left-[50%] bg-black/50 p-4 flex flex-col shadow-xl" style="z-index: 9999999 !important;">
                            <div class="w-96 bg-zinc-900 p-5 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div class="w-full flex flex-row justify-end items-end align-end p-2">
                                <button @click="state.address.new_address_modal = false" class="text-white text-sm cursor-pointer">
                                  <font-awesome-icon :icon="['fas', 'times']" />
                                </button>
                              </div>
                              <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-100 text-center m-0">Add New Address</h3>
                              <div class="w-full flex flex-col gap-2 mt-5">
                                <div class="w-full flex flex-row">
                                  <div class="flex flex-col me-2">
                                    <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.first_name" placeholder="First Name" />
                                    <small v-if="state.errors.address.new_address.first_name" class="text-red-500 text-sm m-2">Please use a full first name.</small>
                                  </div>
                                  <div class="flex flex-col">
                                    <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.last_name" placeholder="Last Name" />
                                    <small v-if="state.errors.address.new_address.last_name" class="text-red-500 text-sm m-2">Please use a full last name.</small>
                                  </div>
                                </div>
                                <div class="w-full flex flex-col">
                                  <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.street" placeholder="Street" />
                                  <small v-if="state.errors.address.new_address.street" class="text-red-500 text-sm m-2">Please use a full street address.</small>
                                </div>
                                <div class="w-full flex flex-col">
                                  <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.street2" placeholder="Street 2" />
                                  <small v-if="state.errors.address.new_address.street2" class="text-red-500 text-sm m-2">Please use a full street address.</small>
                                </div>
                                <div class="w-full flex flex-col">
                                  <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.town_city" placeholder="Town/City" />
                                  <small v-if="state.errors.address.new_address.town_city" class="text-red-500 text-sm m-2">Please use a full town/city name.</small>
                                </div>
                                <div class="w-full flex flex-col">
                                  <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.county_state" placeholder="County/State" />
                                  <small v-if="state.errors.address.new_address.county_state" class="text-red-500 text-sm m-2">Please use a full county/state name.</small>
                                </div>
                                <div class="w-full flex flex-col">
                                  <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="state.address.new_address.postal_zip_code" placeholder="Postal/Zip Code" />
                                  <small v-if="state.errors.address.new_address.postal_zip_code" class="text-red-500 text-sm m-2">Please use a full postal/zip code.</small>
                                </div>
                                <div class="w-full flex flex-col">
                                  <select v-model="state.address.new_address.country" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700">
                                    <option v-for="country in auth.country_codes" :value="country.code" :key="country.code">{{ country.name }}</option>
                                  </select>
                                </div>
                                <div class="w-full flex flex-row">
                                  <input type="checkbox" class="me-2" v-model="state.billing_same_as_shipping" />
                                  <label for="billing_same_as_shipping" class="text-sm text-gray-500 dark:text-gray-100">Billing address same as shipping</label>
                                </div>
                                <small v-if="state.errors.address.new_address.disable" class="text-red-500 text-sm m-2">Please fill out all fields.</small>
 
                                <div class="w-full flex flex-row justify-center items-center mt-5">
                                  <button @click="state.address.new_address_modal = false" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-300 cursor-pointer">Cancel</button>
                                  <button @click="add_new_address" class="py-1.5 px-5 font-semibold text-sm me-2 text-yellow-300 cursor-pointer">Add</button>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                </li>
                <li>
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        3. Review and Confirm
                        <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content" hidden="">
                      <div class="flex flex-col">
                        <!-- Review Order + shipping -->
                         <div class="my-2 rounded-md bg-zinc-900 flex flex-col">
                          <div class="w-full flex flex-row justify-between items-center p-4">
                            <p class="text-lg text-neutral-900 dark:text-white m-0">Order Summary</p>
                            <button class="text-sm text-yellow-500 font-thin curser-pointer" @click="back">Edit Cart</button>
                          </div>
                          <div class="w-full flex flex-col">
                            <div class="w-full flex flex-row justify-between items-center p-4 border-b dark:border-zinc-700">
                              <p class="text-lg text-neutral-900 dark:text-white m-0">Items</p>
                              <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ prodStore.cart?.checkout?.order?.order?.lineItems?.length }}</p>
                            </div>
                            <div class="w-full flex flex-col">
                              <div class="w-full flex flex-row justify-between items-center p-4 border-b dark:border-zinc-700" v-for="(item, i) in prodStore.cart?.checkout?.order?.order?.lineItems" :key="i">
                                <div class="w-1/3 flex flex-row">
                                  <img :src="item.images[0]?.url" class="w-12 h-12 me-2" />
                                  <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ item.name }}</p>
                                </div>
                                <div class="w-1/3"></div>
                                <div class="w-1/3 flex flex-col justify-end items-end">
                                  <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ item.quantity }}</p>
                                  <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ format_currency(item.subtotal, item.basePriceMoney.currency) }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                         </div>

                         <div class="my-2 rounded-md bg-zinc-900 flex flex-col">
                          <div class="w-full flex flex-row justify-between items-center p-4">
                            <p class="text-lg text-neutral-900 dark:text-white m-0">Shipping</p>
                          </div>
                          <div class="w-full flex flex-col">
                            <div class="w-full flex flex-row justify-between items-center p-4 border-b dark:border-zinc-700">
                              <p class="text-lg text-neutral-900 dark:text-white m-0">Shipping Address</p>
                            </div>
                            <div class="w-full flex flex-col">
                              <div class="w-full flex flex-row justify-between items-center p-4 border-b dark:border-zinc-700">
                                <div class="w-1/3 flex flex-row">
                                  <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ state.selected_shipping_method?.street }} {{ state.selected_shipping_method?.street2 }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                         </div>

                          <div class="my-2 rounded-md bg-zinc-900 flex flex-col">
                            <div class="w-full flex flex-row justify-between items-center p-4">
                              <p class="text-lg text-neutral-900 dark:text-white m-0">Payment</p>
                            </div>
                            <div class="w-full flex flex-col">
                              <div class="w-full flex flex-row justify-between items-center p-4 border-b dark:border-zinc-700">
                                <p class="text-lg text-neutral-900 dark:text-white m-0">Payment Method</p>
                              </div>
                              <div class="w-full flex flex-col">
                                <div class="w-full flex flex-row justify-between items-center p-4 border-b dark:border-zinc-700">
                                  <div class="w-1/3 flex flex-row">
                                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ state.selected_payment_method?.card?.cardBrand }} {{ state.selected_payment_method?.card?.last4 }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="my-2 flex flex-col">
                            <!-- Checkout button -->
                             <button 
                                @click="place_order" 
                                :disabled="state.processing || state.errors.payment.length > 0 || state.errors.shipping.length > 0"
                                class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer bg-yellow-500 hover:bg-yellow-600 w-full rounded-md shadow-md py-2 mb-4"
                                :class="(state.processing || state.errors.payment) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
                              >Place Order</button>
                              <!-- Errors: -->
                              <p v-if="state.errors.payment.length" class="text-danger mt-2 text-red-300"> {{ state.errors.payment }} </p>
                              <p v-if="state.errors.shipping.length" class="text-danger mt-2 text-red-300"> {{ state.errors.shipping }} </p>
                          </div>


                      </div>
                    </div>
                </li>
            </ul> 


                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="shadow-sm border1 bg-zinc-100 dark:bg-zinc-900 rounded-md shadow-md px-4 flex flex-col">
                  <div class="w-full flex flex-col justify-between items-start px-0 py-4 mb-3">
                    <p class="text-lg text-neutral-900 dark:text-white m-0">Subtotal</p>
                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ prodStore.cart?.checkout?.order?.order?.value?.str }}</p>
                  </div>
                  <div class="w-full flex flex-col justify-between items-start px-0 py-4 mb-2">
                    <p class="text-lg text-neutral-900 dark:text-white m-0">Shipping</p>
                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0"></p>
                  </div>
                  <div class="w-full flex flex-col justify-between items-start px-0 py-4 mb-2">
                    <p class="text-lg text-neutral-900 dark:text-white m-0">Total</p>
                    <p class="text-sm text-neutral-900 dark:text-white font-thin m-0">{{ prodStore.cart?.checkout?.order?.order?.total?.str }}</p>
                  </div>
                  <div class="w-full flex flex-col justify-between items-start px-0 pb-2">
                    <button 
                      @click="place_order" 
                      :disabled="state.processing || state.errors.payment.length > 0 || state.errors.shipping.length > 0"
                      class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer bg-yellow-500 hover:bg-yellow-600 w-full rounded-md shadow-md py-2 mb-4"
                      :class="(state.processing || state.errors.payment) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
                    >Place Order</button>
                    <!-- Errors: -->
                    <p v-if="state.errors.payment.length" class="text-danger mt-2 text-red-300"> {{ state.errors.payment }} </p>
                    <p v-if="state.errors.shipping.length" class="text-danger mt-2 text-red-300"> {{ state.errors.shipping }} </p>
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

  // Meta
  definePageMeta({
    middleware: ['auth'],
    layout: 'inner'
  })

  // Stores
  const auth = authStore()
  const prodStore = productsStore()

  // Setup
  import { v4 as uuidv4 } from "uuid";
  import { detectBrowser } from '~/utils/detectBrowser'
  const browser = detectBrowser()
  console.log('BROSWER DETECTED: ', browser)
  const runtimeConfig = useRuntimeConfig();

  // Square:
  const appId = runtimeConfig.public.SQUARE_APPLICATION_ID;
  const locationId = runtimeConfig.public.SQUARE_LOCATION_ID;
  let square_loaded;
  const payments = window.Square.payments(appId, locationId);
  square_loaded = payments;

  // State
  const state = reactive({
    billing: {
      select_address: auth.user.selected_addresses ? auth?.user?.selected_addresses : false,
      new_address: {
        first_name: '',
        last_name: '',
        postal_zip_code: '',
        county: '',
        county_state: '',
      }
    },
    update: {
      shipping: false,
      payment: false,
      success: false
    },
    deleting: {
      open: false,
      item: false
    },
    billing_same_as_shipping: auth?.user?.selected_addresses?.length ? true : false,
    processing: false,
    tabs: [
      {
        name: "Credit Card",
        fa_class: 'fas',
        fa_icon: "credit-card",
        component: "CreditCard",
      },
      // {
      //   name: "PayPal",
      //   fa_class: 'fab',
      //   fa_icon: "cc-paypal",
      //   component: "PayPal",
      // },
      // {
      //   name: "Apple Pay",
      //   fa_class: 'fab',
      //   fa_icon: "cc-apple-pay",
      //   component: "ApplePay",
      // },
      // {
      //   name: 'Google Pay',
      //   icon: 'mdi-google-wallet',
      //   component: 'GooglePay'
      // }
    ],
    active_tab: {
      name: "Credit Card",
      icon: "mdi-credit-card-outline",
      component: "CreditCard",
    },
    selected_payment_method: null,
    selected_shipping_method: auth?.user?.addresses?.shipping[0] || auth?.user?.selected_addresses?.shipping || null,
    errors: { 
      payment: "",
      shipping: "",
      address: {
        new_address: {
          first_name: '',
          last_name: '',
          street: '',
          street2: '',
          town_city: '',
          county_state: '',
          postal_zip_code: '',
          country: 'US',
          disable: false
        }
      }
    },
    address: {
      new_address_modal: false,
      new_address: {
        first_name: '',
        last_name: '',
        street: '',
        street2: '',
        town_city: '',
        county_state: '',
        postal_zip_code: '',
        country: 'US',
      }
    }
  })

  // Interfaces
  interface PaymentMethod {
    card: {
      billingAddress: {
        postalCode: string;
      };
      bin: number | null;
      cardBrand: string | null;
      cardType: string | null;
      cardholderName: string | null;
      enabled: boolean;
      expMonth: number | null;
      expYear: number | null;
      fingerprint: string | null;
      id: string;
      last4: string | null;
      merchantId: string | null;
      prepaidType: string | null;
      version: number | null;
    } | null;
    deleting: boolean;
    GooglePay: {
      id: string;
    } | null;
  }

  // Methods

    // Formatting:
      // Currency:
  const format_currency = (amount: number, currency: string) => {
      if(currency === 'USD') {
        return `$${(amount/100).toFixed(2)}`
      }
    }
  const format_num = (str: string) => {
    return Number(str)
  } 



    // Credit Cards:
  const format_card_brand = (str: string) => {
    switch (str) {
      case "VISA":
        return "cc-visa";
      case "MASTERCARD":
        return "cc-mastercard";
      case "AMERICAN_EXPRESS":
        return "cc-amex";
      case "DISCOVER":
        return "cc-discover";
      case "DISCOVER_DINERS":
        return "cc-diners-club";
      case "JCB":
        return "cc-jcb";
      default:
        return "credit-card";
    }
  };

    // Apple Pay
  const initApple = async () => {

    const paymentRequest = payments.paymentRequest({
        countryCode: state.selected_shipping_method?.country,
        currencyCode: 'USD',
        lineItems: prodStore?.cart?.checkout?.order?.order?.lineItems,
        shippingLineItems: {amount: '0', label: 'Free Shipping', pending: false},
        taxLineItems: { amount: 0, label: 'Tax', pending: false },
        discounts: { amount: 0, label: 'Discount', pending: false },
        requestBillingContact: false,
        requestShippingContact: false,
        shippingContact: {
          addressLines: [state.selected_shipping_method?.street, state.selected_shipping_method?.street2],
          city: state.selected_shipping_method?.town_city,
          countryCode: state.selected_shipping_method?.country,
          email: auth.user.email,
          familyName: auth.user.frist_name,
          givenName: auth.user.last_name,
          phone: auth.user.phone,
          postalCode: state.selected_shipping_method?.postal_zip_code,
          state: state.selected_shipping_method?.state,
        },
        total: {
          amount: prodStore?.cart?.checkout?.order?.order?.total?.str,
          label: 'Total',
          pending: false,
        },
      });
    console.log('paymentRequest', paymentRequest)

    const applePayButton = document.getElementById('apple-pay-button');

    try {
        // There are a number of reason why Apple Pay may not be supported
        // (e.g. Browser Support, Device Support, Account). Therefore, you should handle
        // initialization failures while still loading other applicable payment methods.
        const applePay = await payments.applePay(paymentRequest);
        // Note: You do not need to `attach` applePay.
    } catch (e) {
      if(e.name === "PaymentMethodUnsupportedError" ) {
        applePayButton.innerHTML = `Apple Pay is unsupported: ${e.message}`
      }
      console.error(e);
    }

    applePayButton.addEventListener('click', async () => {
      const statusContainer = document.getElementById('apple-payment-status-container');

      try {
        const tokenResult = await applePay.tokenize();
        if (tokenResult.status === 'OK') {
          console.log(`Payment token is ${tokenResult.token}`);
          statusContainer.innerHTML = "Payment Successful";
        } else {
          let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
          if (tokenResult.errors) {
            errorMessage += ` and errors: ${JSON.stringify(
              tokenResult.errors
            )}`;
          }

          throw new Error(errorMessage);
        }
      } catch (e) {
        console.error(e.message);
        statusContainer.innerHTML = "Apple Payment Failed";
      }
    })
    
  }
  
  // Google Pay
  const initGoogle = async () => {

    // create a PaymentRequest with total amount
    const paymentRequest = payments.paymentRequest({
        countryCode: state.selected_shipping_method?.country,
        currencyCode: 'USD',
        lineItems: prodStore?.cart?.checkout?.order?.order?.lineItems,
        shippingLineItems: {amount: '0', label: 'Free Shipping', pending: false},
        taxLineItems: { amount: 0, label: 'Tax', pending: false },
        discounts: { amount: 0, label: 'Discount', pending: false },
        requestBillingContact: false,
        requestShippingContact: false,
        shippingContact: {
          addressLines: [state.selected_shipping_method?.street, state.selected_shipping_method?.street2],
          city: state.selected_shipping_method?.town_city,
          countryCode: state.selected_shipping_method?.country,
          email: auth.user.email,
          familyName: auth.user.frist_name,
          givenName: auth.user.last_name,
          phone: auth.user.phone,
          postalCode: state.selected_shipping_method?.postal_zip_code,
          state: state.selected_shipping_method?.state,
        },
        total: {
          amount: prodStore?.cart?.checkout?.order?.order?.total?.str,
          label: 'Total',
          pending: false,
        },
      });
    console.log('paymentRequest', paymentRequest)
  
    // Create a Google Play instance:
    const googlePay = await payments.googlePay(paymentRequest);

    // Attach to page:
    await googlePay.attach('#google-pay-button', { buttonColor: 'default', buttonType: 'long' });

    const googlePayButton = document.getElementById('google-pay-button');
    googlePayButton.addEventListener('click', async () => {
      const statusContainer = document.getElementById('google-payment-status-container');

      try {
        const tokenResult = await googlePay.tokenize();
        if (tokenResult.status === 'OK') {
          console.log(`Payment token is ${tokenResult.token}`);
          statusContainer.innerHTML = "Payment Successful!";
          state.selected_payment_method = { id: tokenResult.token }
          nextTick(async () => {
            await place_order()
          })
        } else {
          let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
          if (tokenResult.errors) {
            errorMessage += ` and errors: ${JSON.stringify(
              tokenResult.errors
            )}`;
          }

          throw new Error(errorMessage);
        }
      } catch (e) {
        console.error(e.message);
        statusContainer.innerHTML = "Payment Failed";
      }
    })
  
  }
    
    // Actions:
  const select_payment_method = (method: any) => {
    state.selected_payment_method = method;
  }
  const back = () => {
    navigateTo("/cart");
  }
  const place_order = async () => {

    if (!state.selected_payment_method) {
      state.payment_error = "Please select a payment method";
      return;
    }

    if (!auth.user.selected_addresses) {
      state.errors.shipping = "Please select a shipping address";
      return;
    }

    // CREATE ORDER RECORD:
    state.processing = true
    
      // - Create a JavaScript Order object

      // - Send to Square's API via a POST request to /api/square/create-checkout:
      // - recieve object with order details
      const place_order_data = await $fetch('/api/square/place-order', {
        method: 'POST',
        body: JSON.stringify( prodStore?.cart?.checkout?.order )
      })
      console.log('place_order_data', place_order_data)

      // - Create order using client.ordersApi.createOrdder()
          // - recieve object with order details
          // - add order to user's account in Strapi
      /* Payorder using client.ordersApi.payOrder('order_id', {
          idempotencyKey: 'idempotency_key',
          paymentIds: ['your_user_payment_id'],
        })
      */

      // Update user's account in Strapi with order details:
        // GitHub Copilot, please loop through place_order_data?.data?.result?.order?.lineItems, match with prodStore.cart.checkout.order.order.lineItems, and add images to each item:
        // Assuming place_order_data and prodStore are defined and have the expected structure
        if (place_order_data?.data?.result?.order?.lineItems && prodStore.cart.checkout.order.order.lineItems) {
          place_order_data.data.result.order.lineItems.forEach((item: any) => {
            const matchingItem = prodStore.cart.checkout.order.order.lineItems.find(
              (prodItem: any) => prodItem.id === item.catalogObjectId
            );

            if (matchingItem) {
              item['images'] = matchingItem.images // Assuming each item in prodStore.cart.checkout.order.order.lineItems has an 'image' property
            }
          });
          nextTick(() => {
            // Update the user's account in Strapi with the updated order details
            auth?.user?.orders?.push(place_order_data?.data?.result?.order)
          });
        }
      
      

      
        const sample = {
                "order": {
                  "id": "EirKrclgDDIt0RF74s2beTQyz9bZY",
                  "location_id": "L56F5MJM7AFC7",
                  "line_items": [
                    {
                      "uid": "tcIs05vbTqjoUd3YiEaw5B",
                      "quantity": "1",
                      "name": "Black Front, Yellow Visor, Black Mesh",
                      "base_price_money": {
                        "amount": 1299,
                        "currency": "USD"
                      },
                      "gross_sales_money": {
                        "amount": 1299,
                        "currency": "USD"
                      },
                      "total_tax_money": {
                        "amount": 0,
                        "currency": "USD"
                      },
                      "total_discount_money": {
                        "amount": 0,
                        "currency": "USD"
                      },
                      "total_money": {
                        "amount": 1299,
                        "currency": "USD"
                      },
                      "variation_total_price_money": {
                        "amount": 1299,
                        "currency": "USD"
                      },
                      "item_type": "ITEM",
                      "total_service_charge_money": {
                        "amount": 0,
                        "currency": "USD"
                      }
                    }
                  ],
                  "created_at": "2024-04-30T01:52:27.510Z",
                  "updated_at": "2024-04-30T01:52:27.510Z",
                  "state": "OPEN",
                  "version": 1,
                  "total_tax_money": {
                    "amount": 0,
                    "currency": "USD"
                  },
                  "total_discount_money": {
                    "amount": 0,
                    "currency": "USD"
                  },
                  "total_tip_money": {
                    "amount": 0,
                    "currency": "USD"
                  },
                  "total_money": {
                    "amount": 1299,
                    "currency": "USD"
                  },
                  "total_service_charge_money": {
                    "amount": 0,
                    "currency": "USD"
                  },
                  "net_amounts": {
                    "total_money": {
                      "amount": 1299,
                      "currency": "USD"
                    },
                    "tax_money": {
                      "amount": 0,
                      "currency": "USD"
                    },
                    "discount_money": {
                      "amount": 0,
                      "currency": "USD"
                    },
                    "tip_money": {
                      "amount": 0,
                      "currency": "USD"
                    },
                    "service_charge_money": {
                      "amount": 0,
                      "currency": "USD"
                    }
                  },
                  "source": {
                    "name": "Sandbox for sq0idp-3lz81j-n2yz-PJkiB5uwUw"
                  },
                  "customer_id": "D5Z71GXE6SVCKPJ891B3TF59QW",
                  "net_amount_due_money": {
                    "amount": 1299,
                    "currency": "USD"
                  }
                }
              }
      
    // PROCESS PAYMENT:

      // - Pay order using client.ordersApi.payOrder('order_id')
        const pay_order_data = await $fetch('/api/square/pay-order', {
          method: 'POST',
          body: JSON.stringify({
            order_id: place_order_data?.data?.result?.order?.id,
            idempotencyKey: uuidv4(),
            sourceId: state.selected_payment_method.card ? state.selected_payment_method?.card.id : state.selected_payment_method.id,
            amountMoney: {
              amount: place_order_data?.data?.result?.order?.totalMoney?.amount,
              currency: place_order_data?.data?.result?.order?.totalMoney?.currency
            },
            customerId: place_order_data?.data?.result?.order?.customerId,
            locationId: place_order_data?.data?.result?.order?.locationId
          })
        })
        console.log('pay_order_data', pay_order_data)

          // - recieve object with order 
      // - User gets email with Order info
      // - Order appears in user's Account Info > Orders tab, with:
        // - Order number
        // - Items
        // - Cost
        // - Shipping Status

        // - Order appears in Admin Dashboard > Orders tab, with:
        if(pay_order_data?.data?.result?.payment?.status === 'COMPLETED') {

          console.log('Payment successful', pay_order_data?.data?.result?.payment?.status)




          prodStore.cart.checkout.order.order.lineItems = []
          auth?.updateUser() 
          // state.processing = false
          nextTick(() => { navigateTo('/account') })
        }
  }

  const add_new_address = async () => {
  Object.keys(state.address.new_address).forEach((key) => {
    if(!state.address.new_address[key]?.length) {
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
      auth.user.addresses.shipping.push(state.address.new_address)
      if(!auth.user.selected_addresses) {
        auth.user.selected_addresses = {
          shipping: state.address.new_address
        }
      }


      auth.updateUser()
      nextTick(() => { state.address.new_address_modal = false })
    }
  })
}


  const set_default_method = (method: any) => {
    auth.user.selected_payment_method = method;
    nextTick(() => {
      auth.updateUser();
    });
  };

  const initializeCard = async (payments) => {
    const card = await payments.card();
    await card.attach("#card-container");
    return card;
  };

  const init_delete = (item) => {
    console.log('delete', item)
    item.deleting = true
    // state.deleting.open = true;
    state.deleting.item = item;
  }

  const delete_method = (method) => {
    auth.user.payment_methods = auth.user.payment_methods.filter(
      (m) => {
        return m.card.id !== method.card.id;
      }
    );
    nextTick(() => {
      auth.updateUser();
      // state.delete_method_dialog = false;
    });
  };


  // Lifecycle
  onMounted(async () => {
    if(auth) {
      state.selected_payment_method = await auth?.user?.selected_payment_method || null
      state.selected_shipping_method = await auth?.user?.selected_addresses?.shipping || null
    }
    // if(browser === 'Safari') { await initApple() }
    // await initGoogle()
  })

  watch(
  () => state.update.payment,
  async () => {
    if (!window.Square) {
      throw new Error("Square.js failed to load properly");
    } else {
      // console.log("Square.js loaded", window.Square);

      
      let card: any;
      try {
        card = await initializeCard(payments);

        // console.log("card", card);
        const createPayment = async (token: string) => {
          const body = JSON.stringify({
            locationId,
            sourceId: token,
            customerId: auth.user?.square_id,
            idempotencyKey: uuidv4(),
            amountMoney: {
              amount: 1,
              currency: "USD",
            },
            appFeeMoney: {
              amount: 0,
              currency: "USD",
            },
          });

          const paymentResponse = await $fetch("/api/square/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });
          console.log("paymentResponse", paymentResponse);
          if (paymentResponse.status == "COMPLETED") {
            return paymentResponse;
          }
          // const errorBody = await paymentResponse.text();
          // throw new Error(errorBody);
        };

        const tokenize = async (paymentMethod) => {
          const tokenResult = await paymentMethod.tokenize();
          if (tokenResult.status === "OK") {
            return tokenResult.token;
          } else {
            let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
            if (tokenResult.errors) {
              errorMessage += ` and errors: ${JSON.stringify(
                tokenResult.errors
              )}`;
            }
            throw new Error(errorMessage);
          }
        };

        const displayPaymentResults = (status) => {
          const statusContainer = document.getElementById(
            "payment-status-container"
          );
          if (status === "SUCCESS") {
            statusContainer.classList.remove("is-failure");
            statusContainer.classList.add("is-success");
          } else {
            statusContainer.classList.remove("is-success");
            statusContainer.classList.add("is-failure");
          }

          statusContainer.style.visibility = "visible";
        };

        const handlePaymentMethodSubmission = async (event: any, paymentMethod: any) => {
          event.preventDefault();

          try {
            // disable the submit button as we await tokenization and make a
            // payment request.
            cardButton.disabled = true;
            const token = await tokenize(paymentMethod);

            /*
              Use card to get the token, then use token to add card to user's payment methods
            */

            const address = {
              addressLin1: auth?.user?.addresses?.street,
              addressLin2: auth?.user?.addresses?.street2 ?? "",
              locality: auth?.user?.addresses?.town_city,
              administrativeDistrictLevel1: auth?.user?.addresses?.state,
              postalCode: auth?.user?.addresses?.postal_zip_code,
              country: auth?.user?.addresses?.country,
            };

            const body = JSON.stringify({
              idempotencyKey: uuidv4(),
              sourceId: token,
              card: {
                cardholderName: `${auth.user.first_name} ${auth.user.last_name}`,

                customerId: auth.user.square_id,
              },
            });

            // billingAddress: address,

            const newCard = await $fetch("/api/square/create-card", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body,
            });
            console.log("createCardResponse", newCard);

            auth.user.payment_methods?.push(newCard);
            if (!auth.user.selected_payment_method) {
              auth.user.selected_payment_method = newCard;
            }
            nextTick(() => {
              // add payment method to Medusa
              auth.updateUser();
              state.update.success = "Payment method added successfully!";
              // state.dialog = false;
            });

            // const paymentResults = await createPayment(token);
            // displayPaymentResults("SUCCESS");

            // console.debug("Payment Success", paymentResults);
          } catch (e) {
            cardButton.disabled = false;
            displayPaymentResults("FAILURE");
            console.error(e.message);
          }
        };

        const cardButton = document.getElementById("card-button");
        cardButton.addEventListener("click", async function (event) {
          console.log('Apple Pay button clicked')
          await handlePaymentMethodSubmission(event, card);
        });
      } catch (e) {
        console.error("Initializing Card failed", e);
        return;
      }
    }
  }
);

</script>
<style lang="scss">
.border-dark {
  border: 1px solid #ffffff2e;
}
.border-light {
  border: 1px solid #0000002e;
}
.nsight-btn-primary {
  background-color: #f6e232 !important;
  color: rgb(39, 39, 39);

  &:hover {
    background-color: #e4d22e !important;
  }
}
.sq-card-wrapper .sq-card-message-no-error {
  color: rgb(186, 180, 180) !important;

  // before:
  &::before {
    background-color: white !important;
  }
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
.p-dialog-header {
  margin-bottom: -1rem;
}
 

//  Apple Pay:
#apple-pay-button {
  height: 48px;
  width: 100%;
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: plain;
  -apple-pay-button-style: black;
}
</style>