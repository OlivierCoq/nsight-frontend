<template>
  <v-row id="account" :class="auth.user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
    <v-col class="h-100">
      <v-card :theme="auth.user.preferences.dark_mode ? 'dark' : 'light'" class="mx-3 my-3 h-100 overflow-auto">
        <v-card-title>account</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <AccountEditPersonal />
                <AccountEditAddress />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <AccountOrders />
                <AccountPaymentMethods />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import { reactive, nextTick } from 'vue'
  import { authStore } from '@/stores/auth'
  // import { v4 as uuidv4 } from 'uuid'
  // const runtimeConfig = useRuntimeConfig()

  export default {
    name: 'Account',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })
      // Add validation rules for state.address.new_address:
      const state = reactive({
        user: false,
      })
      const auth = authStore()
    
      return {
        state,
        auth
      }
    }
  }
</script>
<style lang="scss">
  #account {
    height: 100vh;

    .ctr-address {
      height: 200px;
      width: 250px;
      color: white;
      background-color: #272323;
      border-radius: 5px;
    }
    .ctr-address.selected {
      background-color: #464646;
    }
    .ctr-orders {
      height: 500px;
    }
  }
</style>