<template>
  <div
    id="cart"
    class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20"
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
                        1. Shipping
                        <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                        <p class="text-neutral-900 dark:text-white font-thin" style="font-size: 1.1rem; line-height: normal; ">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                    </div>
                </li>
                <li>
                    <a class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
                        2. Payment Method
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
                      :disabled="state.processing"
                      class="text-sm text-neutral-900 dark:text-white font-thin curser-pointer bg-yellow-500 hover:bg-yellow-600 w-full rounded-md shadow-md py-2 mb-4"
                      :class="state.processing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
                    >Place Order</button>
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