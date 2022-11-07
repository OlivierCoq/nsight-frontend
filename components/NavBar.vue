<template>
    <div v-if="current_user" id="navbar" class="container-fluid fixed-top" :class="current_user.preferences.dark_mode ? 'bg-dark' : 'bg-light'">
      <div class="row">
        <div class="col-3">
          <div class="p-3 py-md-2 px-md-4">
            <NuxtLink to="/dashboard" class="text-decoration-none fw-bolder mx-2 fs-5" :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">nSight</NuxtLink>
            <NuxtLink to="/shop" class="text-decoration-none mx-2" :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">Shop</NuxtLink>
          </div>
        </div>
        <div class="col-6"></div>
        <div class="col-3">
          <div class="pt-2 px-md-4">
            <div class="w-100 h-100 d-flex flex-row justify-content-end align-items-center">
              <div class="w-25 h-100"></div>
              <div class="w-25 h-100 d-flex flex-row align-items-start justify-content-end">
                <!-- <i class="fa-solid is-hoverable" :class="current_user.preferences.dark_mode ? 'text-light fa-sun' : 'text-dark fa-moon'" @click="toggle_light_mode"></i> -->
              </div>
              <div class="w-50 h-100">
                <p class="mx-3 text-end" :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">
                  <span v-if="isAuthenticated" class="fw-bolder">logged in | </span>{{ loggedInUser.username }} <br/>
                  <span class="fw-bolder is-hoverable" @click="logout">logout</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w-100 px-3 text-danger">
          <hr class="m-1" />
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters, mapMutations } from "vuex";
  
  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(["isAuthenticated", "loggedInUser"]),
    },
    data(){
      return {
        current_user: false
      }
    },
    created(){
      this.fetch_current_user()
    },
    methods: {
      async logout() {
        await this.$auth.logout()
      },
      ...mapMutations('auth', ['updateUserPreferences']),
      fetch_current_user() {
            const thisObj = this
            this.$axios.$get(`https://nsightapi.vip/api/users/${this.loggedInUser.id}?populate=*`)
                .then((data) => {  
                  thisObj.current_user = data; console.log('adfa', data) 
                  thisObj.loggedInUser['preferences'] = data.preferences
                })
                .catch((err) => { console.log('user_data_error:', err) })
        },
        toggle_light_mode() {
          const thisObj = this
          this.current_user.preferences.dark_mode = !this.current_user.preferences.dark_mode
          // this.$store.commit('updateUserPreferences', !this.current_user.preferences.dark_mode, {root: true} )
          this.$axios.$put(`https://nsightapi.vip/api/users/${this.loggedInUser.id}`, this.current_user)
            .then(() => { thisObj.updateUserPreferences(thisObj.current_user.preferences) })
            .catch((err) => { console.log('user_data_error:', err) })
        }
    }
  }
</script>
<style>
  .is-hoverable:hover { 
    cursor: pointer;
  }
</style>
