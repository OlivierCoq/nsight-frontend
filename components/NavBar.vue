<template>
    <div class="container-fluid bg-dark">
      <div class="row">
        <div class="col-3">
          <div class="p-3 py-md-2 px-md-4">
            <span class="fw-bold text-light mx-3">nSight</span>
          </div>
        </div>
        <div class="col-6"></div>
        <div class="col-3">
          <div class="p-3 py-md-2 px-md-4">
            <div class="w-100 h-100 d-flex flex-row justify-content-end align-items-center">
              <p class="text-light mx-3 text-end"><span v-if="isAuthenticated" class="fw-bolder">logged in | </span>{{ loggedInUser.username }} <br/>
                <span class="fw-bolder is-hoverable" @click="logout">logout</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w-100 px-3 text-success">
          <hr class="m-1" />
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(["isAuthenticated", "loggedInUser"]),
    },
    methods: {
      async logout() {
        await this.$auth.logout()
      }
    }
  }
</script>
<style>
  .is-hoverable:hover { 
    cursor: pointer;
  }
</style>
