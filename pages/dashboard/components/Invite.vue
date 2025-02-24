<template>
  <div
    class="h-[90%] flex flex-col justify-start items-start"
    :class="settings.dark_mode ? 'dark' : ''"
  >
    <div
      class="w-full flex flex-col h-full bg-zinc-800 shadow-xl px-5 justify-center items-center"
    >
      <p
        v-if="state.success.show"
        class="text-lg font-thin text-neutral-800 dark:text-white"
        v-html="state.success.message"
      ></p>
      <div v-else class="w-full">
        <div class="input_group w-full flex flex-row mt-3">
          <div class="w-full md:w-1/2 px-2">
            <input
              type="text"
              class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-700 dark:placeholder:text-white dark:text-white"
              :class="
                auth.user.preferences[0].dark_mode
                  ? 'border-dark'
                  : 'border-light'
              "
              placeholder="First Name"
              v-model="new_nsight_member.first_name"
            />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <input
              type="text"
              class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-700 dark:placeholder-white dark:text-white"
              :class="
                auth.user.preferences[0].dark_mode
                  ? 'border-dark'
                  : 'border-light'
              "
              placeholder="Last Name"
              v-model="new_nsight_member.last_name"
            />
          </div>
        </div>

        <div class="input_group w-full flex flex-row mt-3">
          <div class="w-full md:w-2/3 px-2">
            <input
              type="email"
              class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-700 dark:placeholder:text-white dark:text-white"
              :class="
                auth.user.preferences[0].dark_mode
                  ? 'border-dark'
                  : 'border-light'
              "
              placeholder="Email"
              v-model="new_nsight_member.email"
            />
          </div>
          <div class="w-full md:w-1/3 px-2">
            <input
              type="text"
              class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-700 dark:placeholder-white dark:text-white"
              :class="
                auth.user.preferences[0].dark_mode
                  ? 'border-dark'
                  : 'border-light'
              "
              v-model="new_nsight_member.phone_number"
              pattern="[0-9\-]*"
              placeholder="+1-123-456-7890"
              @keydown="
                () => {
                  new_nsight_member.phone_number = new AsYouType()
                    .input(new_nsight_member.phone_number)
                    .replace(/\s/g, '-');
                }
              "
            />
          </div>
        </div>

        <div class="input_group w-full flex flex-row mt-3">
          <button
            class="nsight-btn-primary px-4 py-2 text-neutral-700 w-full rounded-md mx-2 shadow-xl"
            :disabled="!state.validate"
            @click="post_new_member"
          >
            <span :class="!state.validate ? 'opacity-50' : 'opacity-1'"
              >invite friend</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Config
import moment from "moment";
import qs from "qs";
import { parsePhoneNumber, AsYouType } from "libphonenumber-js";
import { ofetch } from "ofetch";
import password from "~/presets/nsight_style_presets/password";
const runtimeConfig = useRuntimeConfig();

// globalThis.$fetch = ofetch.create({
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Authorization': runtimeConfig.apiSecret
//   }
// })

// Define emits:
const emit = defineEmits(["post_new_member"]);

// Stores
const auth = authStore();
const prodStore = productsStore();
const settings = settingsStore();

// Methods:
// State
const state = reactive({
  current_user: authStore.user,
  current_tab: null,
  dark_mode: false,
  error: false,
  use_the_force: false,
  adding_new: false,
  posting_new: false,
  new_member: {
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    n_id: `nsight-${auth.user.id}-${moment().format("MMDDYYYY-hmmss")}`,
  },
  post: null,
  validate: false,
  success: {
    message: "",
    show: false,
  },
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
// console.log("random password: ", generate_random_password());

const validateEmail = (email: string) => {
  return (
    email.length &&
    email
      .toString()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  );
};

const validatePhone = (number: string) => {
  const regex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;
  return regex.test(number);
};

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
  5. Add user to Square by using local API endpoint /api/square/create-customer
  6. Add user to your friends list
  7. Send email confirmation to new member
  8. Update on your DB that the user has been added

*/

const generateSecureToken = () => {
  $fetch("/api/utils/secure-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application",
    },
  }).then((data) => {
    return data.token;
  });
};

generateSecureToken();

let clone_user = auth?.user;

const new_nsight_member = reactive({
  blocked: false,
  confirmed: false,
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  nsight_id: `nsight-${clone_user.id}-${moment().format("MMDDYYYY-hmmss")}`,
  square_id: "",
  reset_token: generateSecureToken(),
  preferences: [
    {
      dark_mode: true,
      default_dashboard_tab: "my_friends",
    },
  ],
  username: state.new_member.email,
  // password: thisObj.generate_random_password()
  // password: "P@ssW3rd9756",
  password: generate_random_password(),
  users: [auth?.user],
  friends: [auth?.user],
  pending_friends: {
    data: [],
  },
  profile_picture: {},
  favorites: {
    products: [],
    users: [],
    posts: [],
    picture_posts: [],
    pictures: [],
    videos: [],
  },
  pictures: {
    data: [],
  },
  chats: {
    data: [],
  },
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
  cart_obj: {
    data: [],
  },
  orders: {
    data: [],
  },
  returns: {
    data: [],
  },
  cancelled_orders: {
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
});

const post_new_member = async () => {
  state.posting_new = true;

  const headers_obj = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${auth.token}`,
  };

  state.post = await $fetch(
    `${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids?${qs.stringify({
      filters: {
        nsight_id: state.new_member.n_id,
      },
    })}`,
    {
      method: "GET",
      headers: headers_obj,
    },
  )
    .then(async (nsight_id_check) => {
      // If none found, add the nsight_id to the nsight-ids table
      if (!nsight_id_check.data.length) {
        // Add the nsight_id to the nsight-ids table
        let new_nsight_id = {
          data: {
            authentic: true,
            nsight_id: state.new_member.n_id,
          },
        };
        // Add to nsight_id table
        await $fetch(
          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids?populate=*`,
          {
            method: "POST",
            headers: headers_obj,
            body: JSON.stringify(new_nsight_id),
          },
        )
          .then(async (new_nsight_id_data) => {
            console.log("New nsight id added", new_nsight_id_data);
            const new_strapi_nsight_id = new_nsight_id_data.data;

            new_nsight_member.nsight_id = new_strapi_nsight_id;

            // Add the user to the users table
            await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users`, {
              method: "POST",
              headers: headers_obj,
              body: JSON.stringify(new_nsight_member),
            })
              .then(async (new_strapi_user_data) => {
                console.log(
                  "created new strapi member: ",
                  new_strapi_user_data,
                );
                const new_strapi_user = new_strapi_user_data;

                // update nsight_id with new user
                await $fetch(
                  `${runtimeConfig.public.NUXT_STRAPI_URL}/api/nsight-ids/${new_strapi_nsight_id.id}`,
                  {
                    method: "PUT",
                    headers: headers_obj,
                    body: JSON.stringify({
                      data: {
                        user: [new_strapi_user],
                      },
                    }),
                  },
                )
                  .then(async (updated_nsight_id_data) => {
                    console.log(
                      "updated nsight_id with new user: ",
                      updated_nsight_id_data,
                    );

                    // Add the user to Square
                    const new_square_customer = {
                      givenName: new_nsight_member.first_name,
                      familyName: new_nsight_member.last_name,
                      emailAddress: new_nsight_member.email,
                      phoneNumber: new_nsight_member.phone_number,
                    };

                    // Add customer to Square

                    const square_data = await $fetch(
                      "/api/square/create-customer",
                      {
                        method: "POST",
                        headers: headers_obj,
                        body: JSON.stringify(new_square_customer),
                      },
                    );
                    new_nsight_member.square_id = square_data.customer.id;

                    if (square_data.customer && square_data.customer.id) {
                      new_nsight_member.square_id = square_data.customer.id;

                      // console.log("holup!!!!!!", new_nsight_member);
                      // Update Strapi with square_id
                      nextTick(async () => {
                        new_nsight_member.square_id = square_data.customer.id;
                        console.log(
                          "updated new_nsight_member with square_id: ",
                          new_nsight_member,
                        );

                        const updated_new_sight_member = new_nsight_member;

                        await $fetch(
                          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${new_strapi_user.id}`,
                          {
                            method: "PUT",
                            headers: headers_obj,
                            body: JSON.stringify({
                              square_id: square_data.customer.id,
                            }),
                          },
                        )
                          .then(async (square_id_update_data) => {
                            console.log(
                              "updated strapi user with square_id: ",
                              square_id_update_data,
                            );

                            // Add the user to your friends list
                            // There's an issue right now with friends vs users. I'm adding to both for now.
                            // square_id_update_data['friends'] = new_nsight_member.friends
                            // square_id_update_data['users'] = new_nsight_member.users
                            new_strapi_user["nsight_id"] = {};
                            new_strapi_user.nsight_id.nsight_id =
                              new_strapi_nsight_id.nsight_id;

                            auth?.user?.friends.push(new_strapi_user);
                            auth?.user?.users.push(new_strapi_user);

                            // Update logged in user with new friend:
                            await $fetch(
                              `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${auth?.user?.id}`,
                              {
                                method: "PUT",
                                headers: headers_obj,
                                body: JSON.stringify({
                                  data: {
                                    friends: auth?.user?.friends,
                                    users: auth?.user?.users,
                                  },
                                }),
                              },
                            )
                              .then(async (updated_user_data) => {
                                console.log(
                                  "updated logged in user with new friend: ",
                                  updated_user_data,
                                );

                                // Update friend with logged in user:
                                await $fetch(
                                  `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${square_id_update_data.id}`,
                                  {
                                    method: "PUT",
                                    headers: headers_obj,
                                    body: JSON.stringify({
                                      data: {
                                        friends: [auth.user],
                                        users: [auth.user],
                                      },
                                    }),
                                  },
                                )
                                  .then(async (updated_friend_data) => {
                                    console.log(
                                      "updated new friend with logged in user: ",
                                      updated_friend_data,
                                    );
                                  })
                                  .catch((err) => {
                                    console.log(
                                      "error updating new friend with logged in user: ",
                                      err,
                                    );
                                  });
                              })
                              .catch((err) => {
                                console.log(
                                  "error updating logged in user: ",
                                  err,
                                );
                              });

                            // Send email to new member
                            await $fetch("/api/email/new-user-confirmation", {
                              method: "POST",
                              headers: headers_obj,
                              body: JSON.stringify({
                                full_name: `${new_nsight_member.first_name} ${new_nsight_member.last_name}`,
                                email: new_nsight_member.email,
                                inviting_member_name: `${auth.user.first_name} ${auth.user.last_name}`,
                                username: new_nsight_member.email,
                                password: new_nsight_member.password,
                              }),
                            })
                              .then(async (data) => {
                                console.log(
                                  "email confirmation sent to new member: ",
                                  data,
                                );
                                state.posting_new = false;
                                state.success.message = `${new_nsight_member.first_name}'s been invited and added to your friends list! 🎉 <br/><br/> An email's been sent to them with their login credentials. Let them know that it might be in their spam folder. If they don't see it, they can request a new password. `;

                                emit("post_new_member");

                                nextTick(() => {
                                  state.success.show = true;
                                });
                              })
                              .catch((err) => {
                                console.log(
                                  "error sending email confirmation to new member: ",
                                  err,
                                );
                                state.error = err;
                              });
                          })
                          .catch((err) => {
                            console.log(
                              "error updating strapi user with square_id: ",
                              err,
                            );
                            state.error = err;
                          });
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(
                      "error updating nsight_id with new user: ",
                      err,
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
            console.log("error adding nsight id: ", err);
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
  () => new_nsight_member,
  (val: object) => {
    new_nsight_member.username = new_nsight_member.email;
    state.validate =
      val.email.length > 0 &&
      validateEmail(val.email) &&
      val.first_name.length > 0 &&
      val.last_name.length > 0 &&
      validatePhone(val.phone_number);
  },
  { deep: true },
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
