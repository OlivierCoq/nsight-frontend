<template>
  <div id="confirm_email" class="bg-dark w-100 h-100 d-flex flex-column justify-center align-start p-5">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <div>
              <h2 class="text-danger fw-bold text-uppercase mb-1">Welcome!</h2>
              <p class="text-light mb-4">You've confirmed your email.</p>
              <v-btn color="primary" block @click="goToLogin">Log In</v-btn>
            </div> 
          </v-col>
          <v-col cols="12" sm="12" md="6" /> 
        </v-row>
      </v-container>
  </div> 
</template>
<script>
  export default {
      name: 'ConfirmEmail',
      setup() {
        definePageMeta({
          middleware: ['guest'] 
        })

      return {
        definePageMeta,
        goToLogin() {
          navigateTo('/')
        }
      }
    }
  }
</script>
<style lang="scss">
  #confirm_email {
      min-height: 100vh;
      background-image: url('https://res.cloudinary.com/nsight/image/upload/v1668144020/Doubt_KTM_a780155ada.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top left;

  }
</style>