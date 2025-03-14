import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ofetch } from 'ofetch'
const runtimeConfig = useRuntimeConfig()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import { defineStore } from 'pinia';

// Your store definition here

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
      cart: authStore?.user?.cart_obj.data ? authStore?.user?.cart_obj.data : {
        checkout: {
          idempotencyKey: uuidv4(),
          order: {
            order: {
              locationId: runtimeConfig.public.SQUARE_LOCATION_ID,
              customerId: authStore()?.user?.square_id,
              lineItems: [],
              taxes: [],
              discounts: [],
              value: {
                str: '0.00',
                amount: 0,
              },
              total: {
                str: '0.00',
                amount: 0,
              }
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

      if (auth?.user?.cart_obj) {
        this.cart = auth?.user?.cart_obj
      }
    },
    format_currency(amount, currency) {
      if(currency === 'USD') {
        return `$${(amount/100).toFixed(2)}`
      }
    },
    update_cart() {

      console.log('updating cart')
      const auth = authStore()

      const update_user = () => {
        const auth = authStore()
        auth.user.cart_obj = this?.cart 
        auth.updateUser()
      }

      // In line items, multiply price by quantity for each item:
      if(this.cart.checkout?.order?.order?.lineItems?.length) {
        this.cart.checkout.order.order.lineItems = this.cart?.checkout?.order?.order?.lineItems?.map(item => {
          item['subtotal'] = item.basePriceMoney.amount * Number(item.quantity)
          // console.log('item.subtotal', item.subtotal)
          // item.base_price_money.amount = item.base_price_money.amount * item.quantity
          return item
        })


        nextTick(() => {
          // Total up all the subtotals:
          this.cart.checkout.order.order.total = this.cart?.checkout?.order?.order?.lineItems?.reduce((acc, item) => {
            // console.log('acc', acc)
            // console.log('item.subtotal', item.subtotal)
            // console.log('total', this.format_currency((acc.amount ? acc.amount : acc ) + item.subtotal, item.basePriceMoney.currency))
            return {
              amount: (acc.amount ? acc.amount : acc ) + item.subtotal,
              str: this.format_currency((acc.amount ? acc.amount : acc ) + item.subtotal, item.basePriceMoney.currency)
            } 
          }, 0)

          nextTick(() => { 
            this.cart.checkout.order.order.value = {
              amount: this.cart.checkout.order.order.total.amount,
              str: this.format_currency(this.cart.checkout.order.order.total.amount, 'USD')
            }
          })

          update_user()
        })

      } else {
        this.cart.checkout.order.order.total = {
          amount: '0',
          str: this.format_currency(0, 'USD')
        }
        this.cart.checkout.order.order.value = {
          amount: '0',
          str: this.format_currency(0, 'USD')
        }
        update_user()
      }
    },
    getProducts() {

      console.log('getting products...')
    
      $fetch(`/api/square/products/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          category: 'All'
        })
      }).then((square_res) => {
        // console.log('square_res', square_res);
        this.products = JSON.parse(square_res?.body?.products)
        this.categories = JSON.parse(square_res?.body?.categories)
      }).catch((err) => {
        console.error('Error fetching products', err)
      });
    },
    add_to_cart(product) { 

      const auth = authStore()

      this.cart?.checkout?.order?.order?.lineItems?.push(product)
      // auth.user.cart_obj.data = this.cart 
      this.update_cart()
    },
    remove_from_cart(product) {
       const auth = authStore()
      this.cart.checkout.order.order.lineItems = this.cart?.checkout?.order?.order?.lineItems?.filter(item => item.id !== product.id)
      auth.updateUser()
      this.update_cart()
    }
  },
  getters: {

  },
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})
