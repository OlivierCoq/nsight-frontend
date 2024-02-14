<template>
  <v-row
    v-if="auth.user"
    id="dashboard"
    :class="auth.user.preferences[0].dark_mode ? 'bg-dark' : 'bg-light'"
  >
    <v-col class="h-100">
      <v-card
        :theme="auth.user.preferences[0].dark_mode ? 'dark' : 'light'"
        class="mx-3 my-3 h-100 overflow-auto"
      >
        <v-card-title>let's get it</v-card-title>

        <!-- Tabs -->
        <v-card-text>
          <v-tabs v-model="state.current_tab">
            <v-tab v-for="(tab, a) in state.tabs" :key="a">
              {{ tab.name }}
            </v-tab>
          </v-tabs>

          <!-- Tab content -->
          <v-window v-model="state.current_tab">
            <div v-if="state.current_tab == 1">
              <v-row class="my-3">
                <!-- Member cards -->
                <v-col
                  v-for="(user, b) in auth.user.friends"
                  :key="b"
                  cols="12"
                  sm="6"
                  md="3"
                  lg="2"
                  xl="1"
                >
                  <DashboardMemberCard :member="user" />
                </v-col>

                <!-- Add new member card -->
                <v-col cols="12" sm="6" md="3" lg="2" xl="1">
                  <v-card variant="tonal" class="w-100 h-100">
                    <v-card-text
                      class="d-flex w-100 h-100 justify-center align-center"
                    >
                      <v-btn @click="state.tabs[1].data.adding_new = true" flat>
                        <strong style="font-size: 200%">+</strong>
                        <v-tooltip
                          activator="parent"
                          location="top"
                          open-delay="500"
                          >Invite new member</v-tooltip
                        >

                        <!-- Add new member dialog -->
                        <v-dialog
                          v-model="state.tabs[1].data.adding_new"
                          width="600"
                        >
                          <v-row>
                            <v-col>
                              <v-card flat variant="flat">
                                <v-card-title>
                                  <span class="headline"
                                    >invite new member</span
                                  >
                                </v-card-title>
                                <v-card-text>
                                  <!-- Make rows and columns thin: -->
                                  <v-form>
                                    <v-row dense>
                                      <v-col dense>
                                        <v-text-field
                                          v-model="
                                            state.tabs[1].data.new_member
                                              .first_name
                                          "
                                          label="First Name"
                                          required
                                        />
                                      </v-col>
                                      <v-col dense>
                                        <v-text-field
                                          v-model="
                                            state.tabs[1].data.new_member
                                              .last_name
                                          "
                                          label="Last Name"
                                          required
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row dense>
                                      <v-col cols="7" dense>
                                        <v-text-field
                                          v-model="
                                            state.tabs[1].data.new_member.email
                                          "
                                          label="Email"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="5" dense>
                                        <v-text-field
                                          v-model="
                                            state.tabs[1].data.new_member
                                              .phone_number
                                          "
                                          label="Phone Number"
                                          required
                                          pattern="[0-9\-]*"
                                          placeholder="+1-123-456-7890"
                                          @keydown="
                                            () => {
                                              state.tabs[1].data.new_member.phone_number =
                                                new AsYouType()
                                                  .input(
                                                    state.tabs[1].data
                                                      .new_member.phone_number
                                                  )
                                                  .replace(/\s/g, '-');
                                            }
                                          "
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-form>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="
                                      state.tabs[1].data.adding_new = false
                                    "
                                    >Cancel</v-btn
                                  >
                                  <v-btn
                                    :disabled="!state.validate"
                                    color="blue darken-1"
                                    text
                                    @click="post_new_member"
                                    >Invite</v-btn
                                  >
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
<script setup lang="ts">
// Page meta
definePageMeta({
  title: "Dashboard",
  description: "Dashboard",
  url: "/dashboard",
  middleware: ["auth"],
  layout: "inner",
});

// necessary imports
import moment from "moment";
import qs from "qs";
import { parsePhoneNumber, AsYouType } from "libphonenumber-js";

// oFetch
import { ofetch } from "ofetch";
const runtimeConfig = useRuntimeConfig();

// globalThis.$fetch = ofetch.create({
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Authorization': runtimeConfig.apiSecret
//   }
// })

// Medusa
const medusa_client = useMedusaClient();

// Stores
const auth = authStore();
const prodStore = productsStore();

// State
const state = reactive({
  current_user: authStore.user,
  current_tab: null,
  dark_mode: false,
  error: false,
  use_the_force: false,
  tabs: [
    {
      name: "My Profile",
      data: {},
    },
    {
      name: "My Members",
      data: {
        adding_new: false,
        posting_new: false,
        post: null,
        new_member: {
          email: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          n_id: `nsight-${auth.user.id}-${moment().format("MMDDYYYY-hmmss")}`,
        },
      },
    },
  ],
  validate: false,
});

// Methods
const generate_random_password = () => {
  let pass = ``,
    str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$`;
  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
};

const validateEmail = (email: string) => {
  return (
    email.length &&
    email
      .toString()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
};

const validatePhone = (number: string) => {
  const regex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;
  return regex.test(number);
};
// const new_n_id = () => {
//   state.tabs[1].data.new_member.n_id = `nsight-${auth.user.id}-${moment().format('MMDDYYYY-hmmss')}`
// }

/*
  Steps:
  1. Do a search to /api/nsight-ids to see if the n_id is already taken. Use the qs library to stringify the params:
    qs.stringify({ n_id: state.tabs[1].data.new_member.n_id })
  2. If the n_id is taken, generate a new one and try again? maybe
    state.tabs[1].data.new_member.n_id = `nsight-${auth.user.id}-${moment().format('MMDDYYYY-hmmss')}`
  3. Add the nsight_id to /api/nsight-ids:
    globalThis.$fetch.post('/api/nsight-ids', { n_id: state.tabs[1].data.new_member.n_id })
  4. Add the user to /api/users:
    globalThis.$fetch.post('/api/users', {
      email: state.tabs[1].data.new_member.email,
      first_name: state.tabs[1].data.new_member.first_name,
      last_name: state.tabs[1].data.new_member.last_name,
      password: generate_random_password(),
      nsight_id: state.tabs[1].data.new_member.n_id
    })
  5. Add user to Medusa by using medusa.customers.create()
  6. Add user to your friends list
  7. Send email confirmation to new member
  8. Update on your DB that the user has been added

*/

const post_new_member = async () => {
  let active_tab = state.tabs[1];
  active_tab.data.posting_new = true;

  const headers_obj = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${auth.token}`,
  };

  active_tab.post = $fetch(
    `${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids?${qs.stringify({
      filters: {
        nsight_id: state.tabs[1].data.new_member.n_id,
      },
    })}`,
    {
      method: "GET",
      headers: headers_obj,
    }
  )
    .then((res) => {
      // If none found, add the nsight_id to the nsight-ids table
      if (!res.data.length) {
        // Add the nsight_id to the nsight-ids table
        let new_nsight_id = {
          data: {
            authentic: true,
            nsight_id: active_tab.data.new_member.n_id,
          },
        };
        $fetch(
          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids?populate=*`,
          {
            method: "POST",
            headers: headers_obj,
            body: JSON.stringify(new_nsight_id),
          }
        )
          .then((data) => {
            console.log("New nsight id added", data);
            const new_strapi_nsight_id = data.data;

            // Add the user to the users table
            let new_nsight_member = {
              blocked: false,
              confirmed: false,
              email: active_tab.data.new_member.email,
              first_name: active_tab.data.new_member.first_name,
              last_name: active_tab.data.new_member.last_name,
              phone_number: active_tab.data.new_member.phone_number,
              nsight_id: new_strapi_nsight_id,
              preferences: [
                {
                  dark_mode: true,
                },
              ],
              username: active_tab.data.new_member.email,
              // password: thisObj.generate_random_password()
              medusa_password: generate_random_password(),
              password: "P@ssW3rd9756",
              users: [auth.user],
              friends: [auth.user],
              addresses: {
                shipping: [],
                billing: [],
              },
              selected_addresses: {
                shipping: null,
                billing: null,
              },
              selected_payment_method: null,
              payment_methods: {
                data: [],
              },
              role: {
                id: 1,
                name: "Authenticated",
                description: "Default role given to authenticated user.",
                type: "authenticated",
                connect: [
                  {
                    id: 1,
                  },
                ],
              },
            };

            $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users`, {
              method: "POST",
              headers: headers_obj,
              body: JSON.stringify(new_nsight_member),
            })
              .then((data) => {
                console.log("created new strapi member: ", data);
                const new_strapi_user = data;

                // update nsight_id with new user
                $fetch(
                  `${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids/${new_strapi_nsight_id.id}`,
                  {
                    method: "PUT",
                    headers: headers_obj,
                    body: JSON.stringify({
                      data: {
                        user: [new_strapi_user],
                      },
                    }),
                  }
                )
                  .then((data) => {
                    console.log("updated nsight_id with new user: ", data);

                    // Add the user to Medusa
                    medusa_client.customers
                      .create({
                        first_name: new_nsight_member.first_name,
                        last_name: new_nsight_member.last_name,
                        password: new_nsight_member.medusa_password,
                        email: new_nsight_member.email,
                      })
                      .then(async (data) => {
                        console.log("created new medusa member: ", data);

                        const new_square_customer = {
                          givenName: new_nsight_member.first_name,
                          familyName: new_nsight_member.last_name,
                          emailAddress: new_nsight_member.email,
                          phoneNumber: new_nsight_member.phone_number,
                        };

                        // Add customer to Square
                        $fetch("/api/square/create-customer", {
                          method: "POST",
                          headers: headers_obj,
                          body: JSON.stringify(new_square_customer),
                        })
                          .then((data) => {
                            console.log("created new square customer: ", data);
                          })
                          .catch((err) => {
                            console.log(
                              "error creating new square customer: ",
                              err
                            );
                            state.error = err;
                          });

                        // Update Strapi with medusa_id
                        $fetch(
                          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${new_strapi_user.id}`,
                          {
                            method: "PUT",
                            headers: headers_obj,
                            body: JSON.stringify({
                              data: {
                                medusa_id: data.id,
                              },
                            }),
                          }
                        )
                          .then((data) => {
                            console.log(
                              "updated strapi user with medusa_id: ",
                              data
                            );

                            // Add the user to your friends list
                            // There's an issue right now with friends vs users. I'm adding to both for now.
                            auth.user.friends.push(data);
                            auth.user.users.push(data);
                            state.tabs[1].data.adding_new = false;

                            nextTick(() => {
                              $fetch(
                                `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${auth.user.id}`,
                                {
                                  method: "PUT",
                                  headers: headers_obj,
                                  body: JSON.stringify({ data: auth.user }),
                                }
                              )
                                .then((data) => {
                                  console.log(
                                    "updated strapi user with new member: ",
                                    data
                                  );
                                  active_tab.data.posting_new = false;

                                  // Send email confirmation to new member. Let's refrain for now. SendGrid doesn't like it.
                                  // $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/send-email-confirmation`, {
                                  //   method: 'POST',
                                  //   headers: headers_obj,
                                  //   body: JSON.stringify({ email: active_tab.data.new_member.email })
                                  // })
                                  //   .then((data) => {
                                  //     console.log('email confirmation sent to new member: ', data)
                                  //     active_tab.data.posting_new = false
                                  //   })
                                  //   .catch((err) => { console.log('error sending email confirmation to new member: ', err); state.error = err })
                                })
                                .catch((err) => {
                                  console.log(
                                    "error updating strapi user with new member: ",
                                    err
                                  );
                                  state.error = err;
                                });
                            });
                          })
                          .catch((err) => {
                            console.log(
                              "error updating strapi user with medusa_id: ",
                              err
                            );
                            state.error = err;
                          });
                      })
                      .catch((err) => {
                        console.log("error creating new medusa member: ", err);
                        state.error = err;
                      });
                  })
                  .catch((err) => {
                    console.log(
                      "error updating nsight_id with new user: ",
                      err
                    );
                    state.error = err;
                  });
              })
              .catch((err) => {
                console.log("error creating new member: ", err);
                state.error = err;
              });
          })
          .catch((err) => {
            state.error = err;
          });
      } else {
        const mssg = `nsight id already exists. Please try again.`;
        console.log(mssg, res.data);
        state.error = mssg;
      }
    })
    .catch((err) => {
      console.log("nsight error", err);
      return err;
    });
};

// Watch
// watch all attributes of new_member:
watch(
  () => state.tabs[1].data.new_member,
  (val: object) => {
    state.validate =
      val.email.length > 0 &&
      validateEmail(val.email) &&
      val.first_name.length > 0 &&
      val.last_name.length > 0 &&
      validatePhone(val.phone_number);
  },
  { deep: true }
);

// email:
// watch(() => state.tabs[1].data.new_member.email, (val) => {
//   state.validate = (val.length > 0) && (validateEmail(val))
// })
// // first_name:
// watch(() => state.tabs[1].data.new_member.first_name, (val) => {
//   state.validate = val.length > 0
// })
// // last_name:
// watch(() => state.tabs[1].data.new_member.last_name, (val) => {
//   state.validate = val.length > 0
// })
// // phone_number:
// watch(() => state.tabs[1].data.new_member.phone_number, (val) => {
//   state.validate = val.length > 0
// })
</script>
<style lang="scss" scoped>
#dashboard {
  height: 100vh;
}
</style>
