<template>
    <div id="reset_password" class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col justify-center items-center pt-10">

      <div class="w-full md:w-1/3 mx-auto p-4 flex flex-col">
        <h1 class="text-3xl text-center text-zinc-900 dark:text-zinc-100">Reset Password</h1>
        <p class="text-center text-zinc-900 dark:text-zinc-100">Enter your new password.</p>
        <div v-if="!state.success" class="flex flex-col mt-4">
          <input v-model="state.new_password" type="password" placeholder="New Password" @keydown="state.errors = []" class="p-2 border border-zinc-900 dark:border-zinc-100 rounded-md" />
          <input v-model="state.confirm_new_password" type="password" placeholder="Confirm New Password" class="p-2 border border-zinc-900 dark:border-zinc-100 rounded-md mt-2" />
          <button @click="reset_password" class="p-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-md mt-2">Reset Password</button>
        </div>  
        <div v-if="state.success">
          <p class="text-green-500 dark:text-green-400 mt-8 text-center mb-8" v-html="state.success"></p>
          <button @click="goToLogin" class="rounded-md shadow-xl w-full flex flex-row text-neutral-800 justify-center nsight-btn-primary my-2 py-2">Log In</button>
        </div>
        <div v-if="state.errors.length" class="text-red-500 mt-2">
          <ul>
            <li v-for="(error, a) in state.errors" :key="a" v-html="error"></li>
          </ul>
        </div>
      </div>

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

      const route = useRoute()

      // State
      const state = reactive({
        new_password: '',
        confirm_new_password: '',
        success: false,
        error: false,
        errors: false,
        post: false,
        send: false,
        code: route.query.token
      })
      


      // Methods
      const reset_password = async () => {

        state.error = false
        if(!state.new_password.length || (state.new_password !== state.confirm_new_password)) { 
              state.errors = []
              state.errors.push('Passwords do not match.')
          return
        } else {
                  
            state.post = await $fetch(`/api/email/reset-password`,{
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
          }).then((data) => {
                // console.log('password Confirm success', data)
                if(data.statusCode === 200) {
                  state.success = "Password updated successfully. You can now use it to log in to your account."
                } else { state.errors.push(`Error: ${data.data.error}. Please try again.`) }
                
            }).catch((err) => {  state.error = err.response.data.error.message })
        }
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