<template>
  <div id="reset_password" class="bg-dark d-flex flex-column justify-center align-center p-3 p-md-5 h-100">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
            <h1 class="text-light m-3">reset password</h1><hr class="mb-3"/> 
            <form v-if="!state.success" class="w-100">
                <div class="mb-3">
                  <v-text-field v-model="state.new_password" placeholder="New Password" type="password" />
                </div>
                <div class="mb-3">
                    <v-text-field v-model="state.confirm_new_password" placeholder="Confirm Password" type="password" />  
                </div>
                <div class="mb-3">
                  <v-btn color="primary" block @click.prevent="reset_password" :disabled="state.confirm_new_password.length < 1">
                    Reset Password
                  </v-btn>
                </div>
            </form>
            <v-alert v-if="state.success" color="success" class="my-3">
              <p v-html="state.success"></p>
              <v-btn color="primary" block @click="goToLogin">Log In</v-btn>
            </v-alert>
            <div v-if="state.error" class="my-3 alert alert-danger">
              <p v-html="state.error"></p>
            </div>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>
<script>

export default {
    name: 'ResetPassword',
    setup() {
      // Meta
      definePageMeta({
        middleware: ['guest'] 
      })

      // State
      const state = reactive({
        new_password: '',
        confirm_new_password: '',
        success: false,
        error: false,
        errors: false,
        post: false,
        send: false
      })
      const runtimeConfig = useRuntimeConfig()

      // Methods
      const reset_password = async () => {

        state.error = false
        if(state.new_password !== state.confirm_new_password) { 
              state.errors = []
              state.errors.push('Passwords do not match.')
        }
        state.post = await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/auth/reset-password`,{
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
              code: state.code,
              password: state.new_password,
              passwordConfirmation: state.confirm_new_password
          })
        })
            .then((data) => {
                console.log('password Confirm success', data)
                state.success = "Password updated successfully. You can now use it to log in to your account."
            }).catch((err) => {  state.error = err.response.data.error.message })
      },
      goToLogin = () => {
          navigateTo('/')
        }

      return {
        // meta
        definePageMeta,
        // state
        state,
        // methods
        reset_password,
        goToLogin
      }
    }
  }
</script>
<style lang="scss">
  #reset_password {
    min-height: 100vh !important;
    background-color: black !important;
    background-image: url('https://res.cloudinary.com/nsight/image/upload/v1668144020/Doubt_KTM_a780155ada.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 20rem -3rem;
   }
</style> 