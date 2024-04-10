<template>
  <div class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col px-3 py-4">
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
                  <font-awesome-icon class="text-white text-2xl" :icon="[ 'fab', format_card_brand(auth.user.selected_payment_method.card.cardBrand)]"/>
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
              @click="place_order"
            >
              Place Order
            </button>
            <!-- <button v-if="!state.emptying" @click="empty_cart" class="btn-empty_cart nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-white shadow-xl rounded-md">Empty Cart</button>
            <button v-else class="btn-empty_cart nsight-btn-primary my-1 py-1 w-full px-5 text-neutral-990 dark:text-whitev  shadow-xl rounded-md">Emptying...</button>
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

  // State
  const state = reactive({
    billing: {
      select_address: auth.user.selected_addresses ? auth.user.selected_addresses : false,
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
    billing_same_as_shipping: auth?.user?.selected_addresses?.length ? true : false
  })

  // Methods
  const format_card_brand = (str) => {
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

  const place_order = () => {
    // Place order
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