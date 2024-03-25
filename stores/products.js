import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'
const runtimeConfig = useRuntimeConfig()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { authStore } from './auth';
import { v4 as uuidv4 } from "uuid";
// import auth from '~/middleware/auth'




export const productsStore = defineStore({
  id: 'productsStore',
  state: () => {
    return {
      merchant: null,
      categories: null,
      filters: {
        category: null,
        search: null,
        sort: { field: 'name', order: 'asc' },
        limit: 10,
        offset: 0
      },
      products: null,
      cart: authStore?.user?.cart ? authStore?.user?.cart : {
        checkout: {
          idempotencyKey: uuidv4(),
          order: {
            order: {
              locationId: runtimeConfig.public.SQUARE_LOCATION_ID,
              customerId: authStore()?.user?.square_id,
              lineItems: [],
              taxes: [],
              discounts: [],
            },
            idempotencyKey: uuidv4(),
          },
          askForShippingAddress: true,
          merchantSupportEmail: 'info@nsight.vip',
          prePopulateBuyerEmail: authStore()?.user?.email,
          prePopulateShippingAddress: authStore()?.user?.selected_addresses ? {
            addressLine1: authStore()?.user?.selected_addresses?.street,
            addressLine2: authStore()?.user?.selected_addresses?.street_2,
            locality: authStore()?.user?.selected_addresses?.town_city,
            administrativeDistrictLevel1: authStore()?.user?.selected_addresses?.county_state,
            postalCode: authStore()?.user?.selected_addresses?.postal_zip_code,
            country: authStore()?.user?.selected_addresses?.country,
            firstName: authStore()?.user?.selected_addresses?.first_name,
            lastName: authStore()?.user?.selected_addresses?.last_name,
          } : {},
          redirectUrl: 'https://nsight.vip/order-confirm',
          additionalRecipients: [],
        }
      }
    }
  },
  actions: {

    async initCart() {

      const auth = authStore()

    },
    getProducts() {
    
      $fetch(`/api/square/list-catalog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }).then((square_res) => {
        // console.log('square_res', square_res);
        this.products = square_res.products
        this.categories = square_res.categories
      });

    },
    add_to_cart(product) { 

      const auth = authStore()

      this.cart.checkout.order.order.lineItems.push(product)
      auth.user.cart_obj.data = this.cart 
      auth.updateUser()
    },
    remove_from_cart(product) {
      this.cart.checkout.order.order.lineItems = this.cart.checkout.order.order.lineItems.filter(item => item.id !== product.id)
      auth.user.cart_obj.data = this.cart 
      auth.updateUser()
    },
  },
  getters: {

  },
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
