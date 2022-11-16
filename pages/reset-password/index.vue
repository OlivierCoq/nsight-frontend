<template>
    <div id="reset_password" class="bg-dark w-100 h-100">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 offset-md-3">
                    <div class="d-flex flex-column justify-content-center align-items-center p-3 p-md-5 h-100">
                        <h1 class="text-light m-3">reset password</h1><hr/> 
                        <form v-if="!success" class="w-100">
                            <div class="mb-3">
                                <input type="password" class="form-control " v-model="new_password" placeholder="New Password">
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control " v-model="confirm_new_password" placeholder="Confirm Password">
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-danger btn-block w-100" @click.prevent="resetPassword" :disabled="confirm_new_password.length < 1">Reset Password</button>
                            </div>
                        </form>
                        <div v-if="success" class="my-3 alert alert-success">
                            <p v-html="success"></p>
                            <a href="/login" class="btn btn-success w-100"></a>
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
        name: 'reset-password',
        middleware: 'guest',
        asyncData(context) {
            if (!context.route.query.code) context.redirect("/forgot-password");
            else
            return {
                code: context.route.query.code,
            };
        },
        data() {
            return {
                new_password: '',
                confirm_new_password: '',
                success: false,
                error: false,
                errors: false,
                post: false,
                send: false,
                configObj: {
                    headers: { 'Accept': 'application/json' }
                }
            }
        },
        methods: {
            async resetPassword() {
                this.error = false

                if(this.new_password !== this.confirm_new_password) { 
                     this.errors = []
                     this.errors.push('Passwords do not match.')
                }
                this.post = await this.$axios.post('api/auth/reset-password', {
                    code: this.code,
                    password: this.new_password,
                    passwordConfirmation: this.confirm_new_password
                }, this.configObj)
                    .then((data) => {
                        console.log('password Confirm success', data)
                        this.success = "Password updated successfully. You can now use it to log in to your account."
                    }).catch((err) => {  this.error = err.response.data.error.message })
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

            