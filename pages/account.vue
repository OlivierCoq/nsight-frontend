<template>
  <v-row id="account" :class="auth.user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
    <v-col class="h-100">
      <v-card :theme="auth.user.preferences.dark_mode ? 'dark' : 'light'" class="mx-3 my-3 h-100 overflow-auto">
        <v-card-title>account</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-card variant="tonal">
                  <v-card-title>
                    Personal Info
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-form>
                            <v-text-field
                              v-model="auth.user.first_name"
                              label="First Name"
                              outlined
                              dense
                              class="mb-3"
                            />
                            <v-text-field
                              v-model="auth.user.last_name"
                              label="Last Name"
                              outlined
                              dense
                              class="mb-3"
                            />
                            <v-text-field
                              v-model="auth.user.email"
                              label="Email"
                              outlined
                              dense
                              class="mb-3"
                            />
                            <v-text-field
                              v-model="auth.user.nsight_id.nsight_id"
                              label="nSight ID"
                              outlined
                              dense
                              class="mb-3"
                              disabled
                            />
                            <v-btn
                              color="info"
                              class="mt-3"
                              @click="update_user"
                            >
                              Update
                            </v-btn>
                          </v-form>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card variant="tonal" class="mb-4">
                  <v-card-title>
                    Orders
                  </v-card-title>
                  <v-card-text>

                  </v-card-text>
                </v-card>
                <v-card variant="tonal" class="mb-4">
                  <v-card-title>
                    Payment Methods
                  </v-card-title>
                  <v-card-text>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card variant="tonal">
                  <v-card-title>
                    Addresses
                  </v-card-title>
                  <v-card-text>
                    
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>

              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import { reactive } from 'vue'
  import { authStore } from '@/stores/auth'
  
  export default {
    name: 'Account',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })
      const state = reactive({
        user: false
      })
      const auth = authStore()

      // methods
      const update_user = async () => {
        // await auth.updateUser()
      }
    
      return {
        state,
        auth,
        // methods
        update_user
      }
    }
  }
</script>
<style lang="scss">
  #account {
    height: 100vh;
  }
</style>