<template>
  <div id="forgot_password" class="bg-dark w-100 h-100 text-start d-flex align-start justify-center flex-column">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6" offset-md="3">
            <h1 class="text-light m-3">forgot password?</h1><hr/>
            <p v-if="!state.input.success" class="text-light my-3">Send me a reset link</p>
            <form v-if="!state.input.success" class="w-100">
                <div class="my-3">
                  <v-text-field v-model="state.input.email" placeholder="your email" type="email">

                  </v-text-field>
                </div>
                <div class="mb-3">
                  <v-btn color="primary" block @click.prevent="forgot_password" :disabled="state.input.email.length < 1">
                    Send Link
                  </v-btn>
                </div>
            </form>
            <v-alert v-if="state.input.success" text color="success" class="my-3">
                <p v-html="state.input.success"></p>
                <p v-if="!state.input.resent">Didn't get it? <span class="fw-bolder is-hoverable" @click="resend">Send again</span></p>
                <p v-else class="fw-bolder">Resent.</p>
            </v-alert>
            <v-alert v-if="state.input.error.length" text color="error">
                <p v-html="state.error"></p>
            </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template> 
<script>
import { reactive } from 'vue'
export default {
  name: 'ForgotPassword',
  setup() {
      // Meta
    definePageMeta({
      middleware: ['guest'] 
    })

      // State
    const state = reactive({
      input: {
        email: "",
        success: false,
        error: false,
        post: false,
        resent: false,
        send: false
      }
    })

        // Methods
      const forgot_password = async () => { 
        /*
            Note to self: create robust client-side validation so the server isn't responsible for
            user feedback. Especially since it's all being done by Strapi.
        */

        const mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!state.input.email.match(mailformat)) {
            state.input.error = `Please enter email in "name@example.com" format.`
        } else {
            state.input.error = false
            state.post = await $fetch(`https://nsightapi.vip/api/auth/forgot-password`, {
            // state.input.post = await $fetch("http://localhost:1337/api/auth/forgot-password", {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify({ email: state.input.email })
            }).then((data) => {

                // console.log(data)
                state.input.error = false
                state.input.success = `A reset link has been sent to your email account. <br/>
                      Please click on the link to complete the password reset.`
            }).catch((err) => { state.input.error = err.response.data.error.message })
        }
        // state.send = await
    },
    resend = () => {
        forgot_password()
        state.input.resent = true
    }

    return {
      // meta
      definePageMeta,
      // state
      state,
      // methods
      forgot_password,
      resend
    }
  }
} 
</script>
<style lang="scss">
  #forgot_password {
    min-height: 100vh !important;
    background-color: black !important;
    background-image: url('https://res.cloudinary.com/nsight/image/upload/v1668144020/Doubt_KTM_a780155ada.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 20rem -3rem;
   }
</style> 