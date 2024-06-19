import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ofetch } from "ofetch";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const runtimeConfig = useRuntimeConfig();
import { defineStore } from 'pinia';

// Your store definition here

import { productsStore } from "./products";
import { settingsStore } from "./settings";

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
        }
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
          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${res.user.id}?${qs.stringify({
            populate: [
              'username',
              'email',
              'first_name',
              'last_name',
              'favorites',
              'cart',
              'addresses',
              'selected_addresses',
              'selected_payment_method',
              'payment_methods',
              'preferences',
              'nsight_id',
              'friends',
              'friends.nsight_id',
              'friends.friends',
              'friends.profile_picture',
              'users.friends',
              'phone_number',
              'square_id',
              'orders',
              'returns',
              'cancelled_orders',
              'profile_picture',
              'pictures',
              'cart_obj'
            ]
          })}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${res.jwt}`,
            },
          }
        ).then((full_user_data) => {
          this.errors = false;
          this.user = full_user_data;
          this.token = res.jwt;
          this.loggedIn = true;
          localStorage.setItem("token", res.jwt);

          // Grap products from api/square
          prodStore.getProducts()
          prodStore.initCart()
          settings.initSettings()
        
        
          setTimeout(() => {
            navigateTo("/dashboard");
          }, 1000);
        });
      }
    },
    async logout() {
      const prodStore = productsStore();

      this.token = null;
      this.loggedIn = false;

      
      // localStorage.removeItem('token')
      // localStorage.removeItem('user')
      this.user = null;

      navigateTo("/");
    },
    async updateUser() {
      $fetch(
        `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${this.user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(this.user),
        }
      )
        .then((res) => {
          console.log("Updated nSight user.");
        })
        .catch((err) => {
          console.log("Update user error", err);
        });
    },
  },
  getters: {},
  persist: {
    enabled: true,
    storage: persistedState.localStorage,
  },
});
