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
                        <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                        <div v-if="auth.user.payment_methods.data.length"></div>
                        <div>
                            <p v-if="!auth.user.payment_methods.data.length" class="text-neutral-900 dark:text-white font-thin" style="font-size: 1.1rem; line-height: normal; ">
                              No payment methods found! Add a payment method to use for your next order.
                            </p>
                            <div class="w-full flex flex-col">
                              <p v-if="auth.user.payment_methods.data.length" class="text-neutral-900 dark:text-white text-md">Cards on file:</p>
                              <div class="w-full flex flex-row flex-wrap mb-2">
                                <!-- List existing payment methods here: -->
                                <div v-for="(method, i) in auth.user.payment_methods.data" :key="i" class="w-1/3  h-[110px] fade-in"> 

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
                                    <div :class="state.active_tab.name === 'PayPal' ? 'uk-active' : ''" class="fade-in">
                                      <div class="p-6"> 
                                        <p class="font-normal">PayPal</p>
                                      </div>
                                    </div>
                                    <div :class="state.active_tab.name === 'Apple Pay' ? 'uk-active' : ''" class="fade-in">
                                      <div class="p-6">
                                        <p class="font-normal"> Apple Pay</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>






                              </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        2. Shipping
                        <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content" hidden="">
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                    </div>
                </li>
                <li>
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        3. Review and Confirm
                        <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content" hidden="">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
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

  // UUID
  import { v4 as uuidv4 } from "uuid";

  // Square:
  const runtimeConfig = useRuntimeConfig();

  const appId = runtimeConfig.public.SQUARE_APPLICATION_ID;
  const locationId = runtimeConfig.public.SQUARE_LOCATION_ID;

  let square_loaded;

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
    selected_shipping_method: auth?.user?.addresses?.shipping[0] || null,
    errors: { 
      payment: "",
      shipping: ""
    }
  })

  // Methods

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

  const select_payment_method = (method: any) => {
    state.selected_payment_method = method;
  }

    // Currency:
  const format_currency = (amount: number, currency: string) => {
      if(currency === 'USD') {
        return `$${(amount/100).toFixed(2)}`
      }
    }
  const format_num = (str: string) => {
    return Number(str)
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
            auth?.user?.orders?.data?.push(place_order_data?.data?.result?.order)
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
            sourceId: state.selected_payment_method?.id,
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

    // Payment Method functions:

  const set_default = (method) => {
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
    auth.user.payment_methods.data = auth.user.payment_methods.data.filter(
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
      state.selected_payment_method = await auth?.user?.selected_payment_method?.card || null
    }
  })

  watch(
  () => state.update.payment,
  async () => {
    if (!window.Square) {
      throw new Error("Square.js failed to load properly");
    } else {
      // console.log("Square.js loaded", window.Square);

      const payments = window.Square.payments(appId, locationId);
      square_loaded = payments;
      let card;
      try {
        card = await initializeCard(payments);

        // console.log("card", card);
        const createPayment = async (token) => {
          const body = JSON.stringify({
            locationId,
            sourceId: token,
            customerId: auth.user.square_id,
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

        const handlePaymentMethodSubmission = async (event, paymentMethod) => {
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

            auth.user.payment_methods.data.push(newCard);
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
</style>