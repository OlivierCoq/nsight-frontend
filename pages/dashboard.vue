<template>
  <v-row id="dashboard" :class="auth.user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
    <v-col class="h-100">
      <v-card :theme="auth.user.preferences.dark_mode ? 'dark' : 'light'" class="mx-3 my-3 h-100 overflow-auto">
        <v-card-title>let's get it</v-card-title>
        <v-card-text>
          <v-tabs v-model="state.current_tab">
            <v-tab v-for="(tab, a) in state.tabs" :key="a">
              {{ tab.name }}
            </v-tab>
          </v-tabs>
          <v-window v-model="state.current_tab">
            <div v-if="state.current_tab == 1">
              <v-row class="my-3">
                <v-col v-for="(user, b) in auth.user.users" :key="b" cols="12" sm="6" md="3" lg="2" xl="1">
                  <DashboardMemberCard :member="user" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2" xl="1">
                  <v-card variant="tonal" class="w-100 h-100">
                    <v-card-text class="d-flex w-100 h-100 justify-center align-center">
                      <v-btn @click="state.tabs[1].data.adding_new = true" flat>
                        <strong style="font-size: 200%">+</strong>
                        <v-tooltip activator="parent" location="top" open-delay="500">Invite new member</v-tooltip>
                        <v-dialog v-model="state.tabs[1].data.adding_new" width="600">
                          <v-row>
                            <v-col>
                              <v-card flat variant="flat">
                                <v-card-title>
                                  <span class="headline">invite new member</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-form>
                                    <v-row>
                                      <v-col>
                                        <v-text-field v-model="state.tabs[1].data.new_member.first_name"
                                          label="First Name" required />
                                      </v-col>
                                      <v-col>
                                        <v-text-field v-model="state.tabs[1].data.new_member.last_name" label="Last Name"
                                          required />
                                      </v-col>
                                    </v-row>
                                    <v-text-field v-model="state.tabs[1].data.new_member.email" label="Email"
                                      required></v-text-field>
                                  </v-form>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="blue darken-1" text
                                    @click="state.tabs[1].data.adding_new = false">Cancel</v-btn>
                                  <v-btn :disabled="!state.validate" color="blue darken-1" text
                                    @click="post_new_member">Invite</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-dialog>
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

// necessary imports
import moment from 'moment'
import Medusa from "@medusajs/medusa-js"


import { ofetch } from 'ofetch'
const runtimeConfig = useRuntimeConfig()

// globalThis.$fetch = ofetch.create({ 
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Authorization': runtimeConfig.apiSecret
//   }
// })


export default {
  name: 'Dashboard',
  setup() {
    definePageMeta({
      middleware: ['auth'],
      layout: 'inner'
    })
    const auth = authStore()
    const state = reactive({
      current_user: authStore.user,
      current_tab: null,
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
            post: null,
            new_member: {
              email: '',
              first_name: '',
              last_name: '',
              n_id: `nsight-${auth.user.id}-${moment().format('MMDDYYYY-hmmss')}`
            }
          }
        }
      ],
      validate: false
    })

    // Methods
    const generate_random_password = () => {
      let pass = ``,
        str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$`
      for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
          * str.length + 1);
        pass += str.charAt(char)
      }
      return pass;
    }
    const validateEmail = (email) => {
      return email.toString().toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    const post_new_member = async () => {

      // Horrible, terrible way of doing this. I'm sorry. I'll fix it later. 
      let active_tab = state.tabs[1]
      active_tab.data.posting_new = true
      /*
          - define new member object
          - create a new_nsight_id. Example: `nsight-${0da19e70-59ba-41f0-a2d6-bcdb35781929}`
          - search for all nsight_ids (GET /api/nsight-ids?populate=*)
              - make sure new_nsight_id !== any of the nsight_ids
              - Make new_nsight_id.authentic = true -> insert into DB
              - make new user with new_nsight_id
      */
      active_tab.post = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids?populate=*`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        })
        .then((data) => {
          const n_ids = data
          console.log('nids', n_ids)
          let match
          n_ids.data.forEach((n_id) => {
            if (active_tab.data.new_member.n_id === n_id.attributes.nsight_id) { match = true }
          })
          if (match) {
            console.log('Invalid.'); return false
          } else {
            // add new nsight_id
            let new_nsight_id = {
              data: {
                authentic: true,
                nsight_id: active_tab.data.new_member.n_id
              }
            }
            $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify(new_nsight_id)
            })
              .then((data) => {
                console.log('new_nsight_id', data)
                // Create new user object and insert new member in to DB:
                let new_nsight_member = {
                  blocked: false,
                  confirmed: true,
                  email: active_tab.data.new_member.email,
                  first_name: active_tab.data.new_member.first_name,
                  last_name: active_tab.data.new_member.last_name,
                  nsight_id: data.data,
                  preferences: {
                    dark_mode: true
                  },
                  username: active_tab.data.new_member.email,
                  // password: thisObj.generate_random_password()
                  password: 'P@ssW3rd9756',
                  users: [auth.user]
                }
                $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                  },
                  body: JSON.stringify(new_nsight_member)
                })
                  .then((data) => {
                    console.log('created new member: ', data)

                    // Add customer to MedusaJS
                    const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

                    medusa.customers.create({
                      first_name: new_nsight_member.first_name,
                      last_name: new_nsight_member.last_name,
                      password: new_nsight_member.password,
                      email: new_nsight_member.email,
                      external_id: new_nsight_member.nsight_id
                    })
                      .then((data) => {
                        console.log('added to Medusa: ', data)
                      })
                      .catch((err) => { console.log('Medusa error', err) })



                    // Add user to your Friends list:
                    auth.user.users.push(data)
                    state.tabs[1].data.adding_new = false

                    // Send Email Confirmation
                    $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/send-email-confirmation`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                      },
                      body: JSON.stringify({ email: active_tab.data.new_member.email })
                    })
                      .then((data) => {
                        // console.log('sent new member confirmation email: ', data)

                        // Update friend list in DB
                        $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${auth.user.id}`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                          },
                          body: JSON.stringify(auth.user)
                        })
                          .then((data) => {
                            // console.log('Added to your friends list: ', data)

                            // thisObj.current_user = false
                            // thisObj.fetch_current_user()
                            active_tab.data.posting_new = false
                            active_tab.data.adding_new = false

                          })
                          .catch((err) => { state.error = err })
                      })
                      .catch((err) => { state.error = err })
                  })
                  .catch((err) => { state.error = err })
              })
              .catch((err) => { state.error = err })
          }
        })
        .catch((err) => { state.error = err })
    }

    // Watch

    // email: 
    watch(() => state.tabs[1].data.new_member.email, (val) => {
      state.validate = (val.length > 0) && (validateEmail(val))
    })
    // first_name:
    watch(() => state.tabs[1].data.new_member.first_name, (val) => {
      state.validate = val.length > 0
    })

    return {
      // meta
      definePageMeta,
      // state
      state,
      auth,
      // methods
      generate_random_password,
      post_new_member,
      validateEmail
    }
  }
}
</script>
<style lang="scss" scoped>
#dashboard {
  height: 100vh;
}
</style>