
import { env } from 'process';
<template>
  <v-card variant="tonal" class="mb-4">
    <v-card-title class="d-flex flex-row justify-space-between">
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
      const setDefault = (id) => {
        console.log('setDefault', id)
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
            nextTick(() => {
              auth.updateUser()
              state.dialog = false
            })
          })
      }
    
      return {
        state,
        auth,
        // stripe,
        // methods
        setDefault,
        add_new
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
</style>