<template>
    <div id="forgot_password" class="bg-dark w-100 h-100">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 offset-md-3">
                    <div class="d-flex flex-column justify-content-center align-items-center p-3 p-md-5 h-100">
                        <h1 class="text-light m-3">forgot password?</h1><hr/>
                        <p v-if="!success" class="text-light">Send me a reset link</p>
                        <form v-if="!success" class="w-100">
                            <div class="mb-3">
                                <input type="email" class="form-control " v-model="email" placeholder="your email">
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary btn-block w-100" @click.prevent="forgotPassword" :disabled="email.length < 1">send link</button>
                            </div>
                        </form>
                        <div v-if="success" class="my-3 alert alert-success">
                            <p v-html="success"></p>
                            <p v-if="!resent">Didn't get it? <span class="fw-bolder is-hoverable" @click="resend">Send again</span></p>
                            <p v-else class="fw-bolder">Resent.</p>
                        </div>
                        <div v-if="error" class="my-3 alert alert-danger">
                            <p v-html="error"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'forgot-password',
        middleware: 'guest',
        data() {
            return {
                email: "",
                success: false,
                error: false,
                post: false,
                resent: false
            }
        },
        methods: {
            async forgotPassword() {

                /*
                    Note to self: create robust client-side validation so the server isn't responsible for
                    user feedback.
                */
                const configObj = {
                            headers: { 'content-type': 'application/json' }
                        }
                this.post = await this.$axios.post("api/auth/forgot-password", {
                        email: this.email,
                    }, configObj).then((data) => {
                        // console.log(data)
                        this.error = false
                        this.success = `A reset password link has been sent to your email account. <br/>
                             Please click on the link to complete the password reset.`
                    }).catch((err) => {
                        this.error = err
                    })
            },
            resend() {
                this.forgotPassword()
                this.resent = true
            }
        }
    }
</script>
<style lang="scss">
  #forgot_password {
    height: 100vh !important;
   }
</style> 

            