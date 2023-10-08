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
                  
                </div>
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
          },
          {
            name: 'Apple Pay',
            icon: 'mdi-apple',
            component: 'ApplePay'
          },
          {
            name: 'Google Pay',
            icon: 'mdi-google-wallet',
            component: 'GooglePay'
          }
        ]
      })
      const auth = authStore()

      // methods
      const setDefault = (id) => {
        console.log('setDefault', id)
      }
      const add_new = () => {
        console.log('add_new')
        state.dialog = false
      }
    
      return {
        state,
        auth,
        // methods
        setDefault,
        add_new
      }
    }
  }
</script>
<style lang="scss">
  .tab_window {
    height: 300px;
    overflow-y: auto;
  }
</style>