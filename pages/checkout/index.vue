<template>
  <div v-if="prodStore?.cart" class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col px-3 py-4">
    <div class="w-full h-[100px] p-4 flex flex-col justify-start align-start items-start mb-6">
      <h1 class="text-3xl text-neutral-900 dark:text-neutral-200 uppercase font-thin">Checkout</h1>
    </div>
    <div class="w-full flex flex-col md:flex-row mb-4">
      <div class="w-full md:w-3/4 py-8 px-4 dark:bg-zinc-800 rounded-md shadow-xl mx-3 flex flex-col">

        <PrimeAccordion :activeIndex="[0]" :multiple="true">

          <PrimeAccordionTab header="Shipping">
            <div class="w-full flex flex-row justify-between">
              <p v-if="auth.user.selected_addresses"  class="text-neutral-900 dark:text-white text-lg font-thin">
                Default address: 
                <strong>
                  {{ auth.user.selected_addresses.street }} 
                  {{ auth.user.selected_addresses.street_2 }} 
                  {{ auth.user.selected_addresses.town_city }}, 
                  {{ auth.user.selected_addresses.county_state }} 
                  {{ auth.user.selected_addresses.country }}
                </strong>
              </p>
              <button
                class="nsight-btn-primary py-1 px-5 rounded-md"
                @click="state.update.shipping = true"
              >
                <span v-html="auth?.user?.selected_addresses ? 'update' : 'Update'"></span>

                <PrimeDialog
                  v-model:visible="state.update.shipping"
                  modal
                  header="Update Shipping info"
                  :style="{
                    width: '60rem',
                    backgroundColor: auth.user.preferences[0].dark_mode ? '#18181a' : '#a1a1aa',
                    padding: 0,
                  }"
                > 
                  <div class="w-full flex flex-col min-h-[25vh] bg-transparent" :class="auth.user.preferences[0].dark_mode ? 'dark' : ''">
                    <AccountEditAddress />
                  </div>
                </PrimeDialog>

              </button>
            </div>
          </PrimeAccordionTab>

          <PrimeAccordionTab header="Payment">
            <div class="w-full flex flex-row justify-between">
              <p v-if="auth.user.selected_payment_method"  class="text-neutral-900 dark:text-white text-lg font-thin">
                Default payment method: 
                <strong>
                  <font-awesome-icon class="text-neutral-900 dark:text-white text-2xl me-2" :icon="[ 'fab', format_card_brand(auth.user.selected_payment_method.card.cardBrand)]"/>
                   {{ auth.user.selected_payment_method.card.cardBrand }} ending in {{ auth.user.selected_payment_method.card.last4 }} 
                </strong>
              </p>
              <button
                class="nsight-btn-primary py-1 px-5 rounded-md"
                @click="state.update.payment = true"
              >


                <span v-html="auth?.user?.selected_payment_method ? 'update' : 'Add'"></span>

                <PrimeDialog
                  v-model:visible="state.update.payment"
                  modal
                  header="Update Payment info"
                  :style="{
                    width: '60rem',
                    backgroundColor: auth.user.preferences[0].dark_mode ? '#18181a' : '#a1a1aa',
                  }"
                > 
                  <div class="w-full flex flex-col min-h-[25vh] bg-transparent pb-4" :class="auth.user.preferences[0].dark_mode ? 'dark' : ''">
                    <AccountPaymentMethods />
                  </div>
                </PrimeDialog>

              </button>
            </div>
          </PrimeAccordionTab>

          <PrimeAccordionTab header="Review Items">
            <div class="w-full flex flex-col">
              <div class="w-full flex flex-row justify-end items-end">
                <button @click="back" class="nsight-btn-primary py-1 px-5 rounded-md">Update Cart</button>
              </div>
              <div v-for="item in prodStore?.cart?.checkout?.order?.order?.lineItems" :key="item.id"  class="w-full p-4 flex flex-row">
                <div class="w-1/5 flex flex-col items-start justify-start">
                  <div class="w-[100px] h-[100px] bg-cover bg-center  rounded-md" :style="{ backgroundImage: `url(${item?.images[0]?.url})` }"></div>
                </div>
                <div class="w-4/5 flex flex-col p-4">
                  <div class="w-full flex flex-row align-start justify-between mb-2">
                    <h1 class="text-xl text-neutral-900 dark:text-white font-thin mb-2">{{ item?.name }}</h1>
                    <p class="text-lg text-neutral-700 dark:text-neutral-300 font-thin">
                      {{ format_currency(item?.basePriceMoney?.amount, item?.basePriceMoney?.currency) }}
                    </p>
                  </div>
                  <!-- <div class="w-full flex flex-row align-start justify-between mb-2">
                    <div class="w-full md:w-1/4 mt-5">
                      <label for="quantity" class="text-md text-neutral-900 dark:text-neutral-200 font-thin">Quantity</label>
                      <input 
                        type="number" 
                        v-model="item.quantity" 
                        min="1"
                        @change="prodStore.update_cart()"
                        class="my-2 bg-transparent border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      />
                    </div>
                    <div class="w-full md:w-3/4 mt-5 flex flex-row items-center justify-end">  
                      <button @click="remove_from_cart" class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer">Remove</button>
                    </div>
                  </div> -->
                </div>
              </div>
            </div> 
          </PrimeAccordionTab>

        </PrimeAccordion>

      </div>


      <div class="w-full md:w-1/4 mx-3">
        <div class="dark:bg-zinc-800 rounded-md shadow-xl px-4 pt-4 pb-6">
          <div class="w-full flex flex-row justify-between items-center">
            <h1 class="text-lg text-neutral-900 dark:text-white font-bold uppercase">Order Value</h1>
            <h1 class="text-lg text-neutral-900 dark:text-white font-thin">{{ prodStore.cart?.checkout?.order?.order?.value?.str }}</h1>
          </div>
          <div class="w-full flex flex-row justify-between items-center">
            <h1 class="text-lg text-neutral-900 dark:text-white font-bold uppercase">Shipping</h1>
            <!-- <h1 class="text-lg v-neutral-900 dark:text-white font-thin">{{ prodStore.cart?.checkout?.order?.order?.value }}</h1> -->
          </div>
          <div class="w-full flex flex-row justify-between items-center">
            <h1 class="text-lg text-neutral-900 dark:text-white font-bold uppercase">Total</h1>
            <h1 class="text-lg text-neutral-900 dark:text-white font-thin">{{ prodStore.cart?.checkout?.order?.order?.total?.str }}</h1>
          </div>
          <div class="w-full flex flex-col justify-between items-center">
            <button 
              class="btn-empty_cart nsight-btn-primary my-2 py-2 w-full px-5 text-neutral-800 shadow-xl rounded-md" 
              :class="state.processing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
              :disabled="state.processing"
              @click="place_order"
            >
              Place Order
            </button>
            <!-- <button v-if="!state.emptying" @click="empty_cart" class="btn-empty_cart nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-white shadow-xl rounded-md">Empty Cart</button>
            <button v-else class="btn-em`pty_cart nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-whitev  shadow-xl rounded-md">Emptying...</button>
            <button v-if="!state.checking_out" @click="checkout" class="btn-checkout nsight-btn-primary my-1 py-1 w-full px-5text-neutral-990 dark:text-white shadow-xl rounded-md">Checkout</button>
            <button v-else class="btn-checkout nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-white shadow-xl rounded-md">Checking out...</button> -->
          </div>
        </div>
      </div>

    </div>

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
      payment: false
    },
    billing_same_as_shipping: auth?.user?.selected_addresses?.length ? true : false,
    processing: false
  })

  // Methods
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
    // Place order
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
      
      // - Pay order using client.ordersApi.payOrder('order_id')
        const pay_order_data = await $fetch('/api/square/pay-order', {
          method: 'POST',
          body: JSON.stringify({
            order_id: place_order_data?.data?.result?.order?.id,
            idempotencyKey: uuidv4(),
            sourceId: auth?.user?.selected_payment_method?.card?.id,
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

.p-accordion {

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