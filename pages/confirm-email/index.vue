<template>
    <div id="confirm_email" class="bg-dark">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <div class="ctr-main w-100 h-100 d-flex flex-column justify-content-center align-items-start p-5">
                        <h2 class="text-danger fw-bold text-uppercase mb-1">Welcome!</h2>
                        <p class="text-light mb-4">You've confirmed your email.</p>
                        <NuxtLink to="/" class="btn btn-danger w-75 btn-block">Log In</NuxtLink> 
                    </div> 
                </div>
                <div class="col-sm-12 col-md-6"></div>
            </div>
        </div>
    </div> 
</template>
<script>
    export default {
        name: 'ConfirmEmail',
        middleware: 'guest',
        data() {
            return {}
        },
        created(){},
        methods: {}
    }
</script>
<style lang="scss">
    #confirm_email {
        min-height: 100vh;
        background-image: url('https://res.cloudinary.com/nsight/image/upload/v1668144020/Doubt_KTM_a780155ada.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top left;

        .ctr-main {
            min-height: 100vh;
        }
    }
</style>