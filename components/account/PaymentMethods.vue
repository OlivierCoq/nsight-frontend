
import auth from 'middleware/auth';

import { userInfo } from 'os';

import { env } from 'process';
<template>
  <v-card variant="tonal" class="mb-4">
    <v-card-title class="d-flex flex-row justify-space-between mb-3">
      Payment Methods
      <v-spacer/>
      <v-btn color="info" size="small" @click="state.dialog = true">
        + Add

        <v-dialog v-model="state.dialog" max-width="700">
          <v-card>
            <v-card-title>
              Add new Payment Method
            </v-card-title>
            <v-card-text>
              <v-tabs v-model="state.current_tab" background-color="transparent" show-arrows>
                <v-tab v-for="(tab, index) in state.tabs" :key="index">
                  <v-icon>{{ tab.icon }}</v-icon>
                  {{ tab.name }}
                </v-tab>
              </v-tabs>
              <v-window v-model="state.current_tab">
                <div v-if="state.current_tab == 0" class="tab_window">
                  <!-- Credit card form: -->
                  <v-card variant="tonal" class="mt-5">
                    <v-card-title>Card Details</v-card-title>
                    <v-card-text>
                      <v-progress-circular v-if="!state.stripe_data.cardElement" indeterminate color="primary" /> 
                      <!-- Form with state.new_card.address inputs: -->
                      <v-form v-if="state.stripe_data.cardElement">
                        <v-row>
                          <v-col>
                            <v-text-field v-model="state.new_card.name" label="Name on Card" required dense hide-details></v-text-field>
                            <v-text-field v-model="state.new_card.address.line1" label="Address Line 1" required dense hide-details></v-text-field>
                            <v-text-field v-model="state.new_card.address.line2" label="Address Line 2" dense hide-details></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field v-model="state.new_card.address.city" label="City" required dense hide-details></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="state.new_card.address.state" label="State" required dense hide-details></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="state.new_card.address.postal_code" label="Postal Code" required dense hide-details></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field v-model="state.new_card.address.country" label="Country" required dense hide-details></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            
                          </v-col>
                        </v-row>
                      </v-form>
                      <div class="ctr-card">
                        <div id="card-element"></div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
                <div v-if="state.current_tab == 1" class="tab_window">
                  
                </div>
                <!-- <div v-if="state.current_tab == 0" class="tab_window">
                  
                </div>
                <div v-if="state.current_tab == 0" class="tab_window">
                  
                </div> -->
              </v-window>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" text @click="state.dialog = false">
                Cancel
              </v-btn>
              <v-btn color="primary" text @click="add_new">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-if="!auth.user.payment_methods.data.length">
          <p class="text--white">
            Add a payment method to use for your next order.
          </p>
        </v-col>
        <v-col cols="12" md="6" v-for="(payment_method, a) in auth.user.payment_methods.data" :key="a">
          <v-card :variant="auth.user.selected_payment_method.id == payment_method.id ? 'tonal' : ''" class="mb-4">
            <v-card-title>
              <font-awesome-icon :icon="['fab', `cc-${payment_method.card.brand}`]" /> 
              <small v-if="auth.user.selected_payment_method.id == payment_method.id" class="text-uppercase"> | Default</small>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <p class="text--white">
                    <span class="text-uppercase">
                      {{ payment_method.billing_details.name }}
                    </span> | 
                    <span class="text-uppercase">
                      {{ payment_method.card.brand }} ...{{ payment_method.card.last4 }}
                    </span>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions >
              <!-- <v-btn color="info" size="small" text @click="state.edit_method_dialog = true">
                Edit

                <v-dialog v-model="state.edit_method_dialog" width="500">
                  <v-card>
                    <v-card-title>
                      Edit Payment Method
                    </v-card-title>
                  </v-card>
                </v-dialog>

              </v-btn> -->
              <v-btn v-if="auth.user.selected_payment_method.id !== payment_method.id" color="primary" size="small" text @click="set_default(payment_method)">
                Set as Default
              </v-btn>
              <v-btn color="error" size="small"  text @click="state.delete_method_dialog = true">
                Delete

                <v-dialog v-model="state.delete_method_dialog" width="500">
                  <v-card>
                    <v-card-title>
                      Delete Payment Method
                    </v-card-title>
                    <v-card-text>
                      <p class="text--white">
                        Are you sure you want to delete this payment method?
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn color="primary" text @click="state.delete_method_dialog = false">
                        Cancel
                      </v-btn>
                      <v-btn color="error" text @click="delete_method(payment_method)">
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>  
              <v-spacer />
            </v-card-actions> 
          </v-card> 
        </v-col> 
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
  import { reactive, nextTick } from 'vue'
  import { authStore } from '@/stores/auth'
  import { loadStripe } from '@stripe/stripe-js'

  export default {
    name: 'PaymentMethods',
    setup() {
      const state = reactive({
        user: false,
        dialog: false,
        current_tab: 0,
        tabs: [
          {
            name: 'Credit Card',
            icon: 'mdi-credit-card-outline',
            component: 'CreditCard'
          },
          {
            name: 'PayPal',
            icon: 'mdi-paypal',
            component: 'PayPal'
          }
          // {
          //   name: 'Apple Pay',
          //   icon: 'mdi-apple',
          //   component: 'ApplePay'
          // },
          // {
          //   name: 'Google Pay',
          //   icon: 'mdi-google-wallet',
          //   component: 'GooglePay'
          // }
        ],
        edit_method_dialog: false,
        delete_method_dialog: false,
        new_card: {
          name: '',
          address: {
            city: '',
            country: '',
            line1: '',
            line2: '',
            postal_code: '',
            state: ''
          }
        },
        stripe_data: {
          stripe: null,
          cardElement: null
        }
      })
      const runtimeConfig = useRuntimeConfig()
      const auth = authStore()
      
      // Mounted
      const doStripe = async () => {
         state.stripe_data.stripe = await loadStripe(runtimeConfig.public.NUXT_ENV_STRIPE_PUBLISHABLE_KEY)
        let elements = state.stripe_data.stripe.elements({
          clientSecret: runtimeConfig.public.stripeSecretKey
        })
        state.stripe_data.cardElement = elements.create('card', {
          style: {
            base: {
              color: 'white',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#9a9a9a'
              },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a'
            }
          }
        })
        state.stripe_data.cardElement.mount('#card-element')
      }

      // Watchers
      watch(() => state.dialog, async (val) => {
        if (val) {
          await doStripe()
        }
      })

      // methods
      const set_default = (method) => {
        
        auth.user.selected_payment_method = method
        nextTick(() => {
          auth.updateUser()
        })
      }

      const add_new = async () => {

        state.stripe_data.stripe.createPaymentMethod({
          type: 'card',
          card: state.stripe_data.cardElement,
          billing_details: {
            name: state.new_card.name,
            address: state.new_card.address
          }
        })
          .then((res) => {
            console.log('stripe res', res)
            auth.user.payment_methods.data.push(res.paymentMethod)
            if(!auth.user.selected_payment_method) {
              auth.user.selected_payment_method = res.paymentMethod
            }
            nextTick(() => {
              auth.updateUser()
              state.dialog = false
            })
          })
      }

      const delete_method = (method) => {
        
        auth.user.payment_methods.data = auth.user.payment_methods.data.filter((m) => {
          return m.id !== method.id
        })
        nextTick(() => {
          auth.updateUser()
          state.delete_method_dialog = false
        })
      }
    
      return {
        state,
        auth,
        // methods
        set_default,
        add_new,
        delete_method
      }
    }
  }
</script>
<style lang="scss">
  .tab_window {
    min-height: 300px;
    overflow-y: auto;
  }
  .ctr-card {
    background: #4a4a4a6e;
    padding: 16px 0;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: 1px solid #949494;
  }
  .ctr-payment_method {

  }
</style>