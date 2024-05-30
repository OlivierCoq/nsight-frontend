<template>
  <div id="forgot_password" class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col justify-center items-center pt-10">

    <div class="w-full md:w-1/3 mx-auto p-4 flex flex-col">
      <h1 class="text-3xl text-center text-zinc-900 dark:text-zinc-100">Forgot Password</h1>
      <p class="text-center text-zinc-900 dark:text-zinc-100">Enter your email address to reset your password.</p>
      <div class="flex flex-col mt-4">
        <input v-model="state.input.email" type="email" placeholder="Email" class="p-2 border border-zinc-900 dark:border-zinc-100 rounded-md" />
        <button @click="forgot_password" class="p-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-md mt-2">Reset Password</button>
      </div>
      <div v-if="state.input.error" class="text-red-500 dark:text-red-400 mt-2" v-html="state.input.error"></div>
      <div v-if="state.input.success" class="text-green-500 dark:text-green-400 mt-2" v-html="state.input.success"></div>
      <div v-if="state.input.resent" class="text-green-500 dark:text-green-400 mt-2">Resent</div> 
    </div>

  </div>
</template> 
<script>

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
            state.post = await $fetch(`/api/email/forgot-password`, {
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