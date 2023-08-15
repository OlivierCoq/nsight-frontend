<template>
  <v-container fluid>

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
        middleware: ['auth'] 
      })

        // Computed:
      // const UUIDv4 = computed(() => {

      //     const function_obj = { 
      //         generateNumber: (limit) => {
      //           let value = value = limit * Math.random()
      //               return value | 0
      //         },
      //         generateX: () => {
      //           let value = generateNumber(16)
      //           return value.toString(16)
      //         },
      //         generateXes: (count) => {
      //           let value = ''
      //           for(let i = 0; i < count; i++) {
      //             value += generateX()
      //           }
      //           return value
      //         },
      //         generateVariant: () => {
      //           let value = generateNumber(16)
      //           let variant = (value & 0x3) | 0x8
      //           return variant.toString(16)
      //       }
      //     }
          
      //     function_obj['generate'] = () => {
      //       let result = generateXes(8)
      //           + '-' + generateXes(4)
      //           + '-' + '4' + generateXes(3)
      //           + '-' + generateVariant() + generateXes(3)
      //           + '-' + generateXes(12)
      //       return result
      //     }
          
      //     return function_obj.generate()
      //   })

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