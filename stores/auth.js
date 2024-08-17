import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ofetch } from "ofetch";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const runtimeConfig = useRuntimeConfig();
import { defineStore } from "pinia";

// Your store definition here

import { productsStore } from "./products";
import { settingsStore } from "./settings";
import { chatStore } from "./chat";

import { customFetch } from "~/composables/custom_fetch.ts";
const useCustomFetch = customFetch();
import qs from "qs";
import auth from "~/middleware/auth";

export const authStore = defineStore({
  id: "authStore",
  state: () => {
    return {
      user: null,
      token: null,
      loggedIn: false,
      errors: false,
      suggested_friends: [],
    };
  },
  actions: {
    async login(payload) {
      const prodStore = productsStore();
      const settings = settingsStore();

      // Sign in to Strapi:
      const res = await $fetch(
        `${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(payload),
        },
      );
      if (res.statusCode === 400) {
        this.errors = res.data.message[0].messages[0].message;
      } else {
        this.errors = false;

        // ofetch: Make sure to set the Authorization header for all future requests:
        globalThis.$fetch = ofetch.create({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${res.jwt}`,
          },
        });
        // Get user data from Strapi:

        const custom_data = await $fetch(
          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${res.user.id}?${qs.stringify(
            {
              populate: [
                "username",
                "email",
                "first_name",
                "last_name",
                "favorites",
                "cart",
                "addresses",
                "selected_addresses",
                "selected_payment_method",
                "payment_methods",
                "chats",
                "preferences",
                "nsight_id",
                "friends",
                "friends.nsight_id",
                "friends.friends",
                "friends.chats",
                "friends.profile_picture",
                "users.friends",
                "phone_number",
                "square_id",
                "orders",
                "returns",
                "cancelled_orders",
                "profile_picture",
                "pictures",
                "cart_obj",
              ],
            },
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${res.jwt}`,
            },
          },
        ).then(async (full_user_data) => {
          this.errors = false;
          this.user = full_user_data;
          this.token = res.jwt;
          this.loggedIn = true;
          localStorage.setItem("token", res.jwt);

          // Grap products from api/square
          prodStore.getProducts();
          prodStore.initCart();
          settings.initSettings();
          await this.format_payment_methods();

          setTimeout(() => {
            navigateTo("/dashboard");
          }, 1000);
        });
      }
    },
    async logout() {
      const prodStore = productsStore();
      const chat = chatStore();

      this.token = null;
      this.loggedIn = false;
      chat.current_conversation = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("authStore");
      this.user = null;

      navigateTo("/");
    },
    async format_payment_methods() {
      // console.log('Formatting payment methods: ', this.user.payment_methods);
      if(this.user.payment_methods.data.length > 0) {
        this.user.payment_methods.data.forEach((payment_method) => {
          // console.log('Formatting payment method: ', payment_method.card);
            payment_method['deleting'] = false;
        });
      }
    },
    async updateUser() {
      $fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          user: this.user,
          token: this.token,
        }),
      })
        .then((res) => {
          console.log("Updated user. ", res);
        })
        .catch((err) => {
          console.log("Error updating user: ", err);
        });
    },
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage,
  },
});
