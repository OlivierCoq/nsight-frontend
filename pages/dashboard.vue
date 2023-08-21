<template>
  <v-container fluid id="dashboard">
    <v-row>
      <v-col>
        Dashboard
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { reactive, computed } from 'vue'
  import { authStore } from '@/stores/auth'
  import { v4 as uuidv4 } from 'uuid'

  export default {
    name: 'Dashboard',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const state = reactive({
        current_user: authStore.user,
        current_tab: false,
          dark_mode: false,
          error: false,
          use_the_force: false,
          tabs: [
              {
                  name: 'My Profile',
                  data: {}
              },
              { 
                name: 'My Members', 
                data: {
                    adding_new: false,
                    posting_new: false,
                    new_user: {
                        email: '',
                        first_name: '',
                        n_id: `nsight-${uuidv4()}`
                    }
                }
              }
            ]
      })
      
     

      return {
          // meta
        definePageMeta,
          // state
        state,
          // methods
      }
    }
  }
</script>
<style scoped>
  #dashboard {
    height: 100vh;
  }
</style>