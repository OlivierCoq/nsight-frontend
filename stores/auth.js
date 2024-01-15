import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ofetch } from 'ofetch'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const runtimeConfig = useRuntimeConfig()

import { productsStore } from './products'

import { customFetch } from '~/composables/custom_fetch.ts'
const useCustomFetch = customFetch()


export const authStore = defineStore({
  id: 'authStore',
  state: () => {
    return {
      user: null,
      medusa_user: null,
      token: null,
      loggedIn: false,
      errors: false,
      medusa_client: null
    }
  },
  actions: {
    async login(payload) {

      const prodStore = productsStore()

      // Sign in to Strapi:
      const res = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(payload)
      })
      if (res.statusCode === 400) {
        this.errors = res.data.message[0].messages[0].message
      } else {
        this.errors = false

        // ofetch: Make sure to set the Authorization header for all future requests:
        globalThis.$fetch = ofetch.create({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res.jwt}`
          }
        })
        // Get user data from Strapi:
        const custom_data = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${res.user.id}?populate=*`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${res.jwt}`
          }
        }).then((full_user_data) => {


          this.errors = false
          this.user = full_user_data
          this.token = res.jwt
          this.loggedIn = true
          localStorage.setItem('token', res.jwt)
          localStorage.setItem('user', JSON.stringify(full_user_data))

          const medusa_client = useMedusaClient()

          // Login to Medusa
          // First authenticate api calls for medusa
          medusa_client.auth.getToken({
            email: payload.identifier,
            password: payload.password
          })
            .then((token) => {

              medusa_client.auth.authenticate({
                email: payload.identifier,
                password: payload.password
              })
                .then(({ customer }) => {
                  console.log('Medusa customer', customer.id)
                  this.medusa_user = customer

                  let region

                  // Regions created in Medusa Dashboard. We need to update user to be able to have a preferred 
                  // region.
                  medusa_client.regions.list()
                    .then(({ regions }) => {
                      console.log('regionssss', regions[0])
                      // show customers available regions

                      region = regions[0]
                    })

                  // create cart if cart doesn't exist
                  if (!this.user.cart) {
                    console.log('no cart.')
                    medusa_client.carts.create(region)
                      .then((cart_res) => {
                        console.log('Created new cart', cart_res)
                        this.user.cart = cart_res.cart.id
                        prodStore.cart_obj = cart_res.cart
                        nextTick(() => {
                          this.updateUser()
                        })
                      })
                      .catch((err) => { console.log('Medusa cart', err) })
                  } else {
                    // get cart if cart exists
                    console.log('cart exists.')
                    medusa_client.carts.retrieve(this.user.cart)
                      .then((cart_res) => {
                        prodStore.cart_obj = cart_res
                      })
                      .catch((err) => { console.log('Medusa cart', err) })
                  }
                })
                .catch((err) => { console.log('Medusa err', err) })
            })

          setTimeout(() => {
            navigateTo('/dashboard')
          }, 1000)



        })

      }

    },
    async logout() {

      const prodStore = productsStore()

      this.token = null
      this.loggedIn = false
      // localStorage.removeItem('token')
      // localStorage.removeItem('user')

      prodStore.cart = null
      this.user = null

      // Medusa
      const medusa_client = useMedusaClient()
      medusa_client.auth.deleteSession()
      this.medusa_user = null


      navigateTo('/')
    },
    async updateUser() {
      $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${this.user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(this.user)
      })
        .then((res) => {
          console.log('Updated user', res)

          let medusa_user_obj = {
            id: this.medusa_user.id,
            email: this.user.email,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phone: this.user.phone,
            password: this.user.password,
            cart_id: this.user.cart
          }

          // Update Medusa
          medusa_client.customers.update(this.medusa_user)
            .then((res) => {
              console.log('Updated Medusa user', res)
            })
            .catch((err) => { console.log('Update Medusa user error', err) })
        })
        .catch((err) => { console.log('Update user error', err) })
    }
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage
  }
})