<template>
    <div id="product" v-if="current_user" :class="current_user.preferences.dark_mode ? 'bg-dark' : 'bg-light'" style="opacity: 0;" :style="{opacity: opacity}">
        <div v-if="product" class="container my-5 py-5">
            <div class="row">
                <div class="col-sm-12 col-md-2">
                    <div class="p-3 h-100 w-100 d-flex flex-column justify-content-start align-items-start">
                        <div class="container-fluid">
                            <div v-if="product.data.attributes.additional_images.data.length" class="row">
                                <div v-for="img, a in product.data.attributes.additional_images.data" :key="a" class="col-sm-12 col-md-6 p-0">
                                    <img :src="img.attributes.url" :alt="product.data.attributes.title" class="w-100 p-1 is-hoverable" @click="toggle_main(img)" />
                                </div>
                                <div class="col-sm-12 col-md-6 p-0">
                                    <img :src="product.data.attributes.main_image.data.attributes.url" :alt="product.data.attributes.title" class="w-100 p-1 is-hoverable" @click="clear_main" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div v-if="product" class="p-3 w-100 h-100 d-flex flex-column justify-content-center align-items-start">
                        <img class="w-100" :src="main_image" :alt="product.data.attributes.title" />
                    </div>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div v-if="product" class="p-5 h-100 d-flex flex-column justify-content-start align-items-center">
                        <div class="w-100 d-flex flex-row align-items-center justify-content-between">
                            <h3 class="fw-bold" :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">
                                {{product.data.attributes.title}}
                            </h3>
                            <span :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">${{product.data.attributes.price.toFixed(2)}}</span>
                        </div>
                        <div class="text-danger w-100">
                            <hr class="mt-2 mb-3" />
                        </div>
                        <p :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">
                            {{product.data.attributes.description}}
                        </p>
                        <div class="w-100 d-flex flex-row align-items-center justify-content-center">
                            <div class="w-75">
                                <button 
                                    :data-item-id="product.data.id"
                                    :data-item-price="product.data.attributes.price"
                                    :data-item-url="`${this.$route.fullPath}`"
                                    :data-item-description="product.data.attributes.description"
                                    :data-item-image="product.data.attributes.main_image.data.attributes.url"
                                    :data-item-name="product.data.attributes.title"
                                    v-bind="customFields"

                                    class="btn btn-primary snipcart-add-item w-100 my-3"
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <div class="w-25 d-flex flex-column justify-content-center align-items-center">
                                <i class="fa-regular fa-heart fa-2x text-danger is-hoverable"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Product',
        middleware: 'auth',
        layout: 'inner_page',
        data(){
            return {
                product: null,
                storeUrl: process.env.storeUrl,
                current_user: false,
                opacity: 1,
                main_image: false
            }
        },
        computed: {
            ...mapGetters(["loggedInUser"]),
            customFields() {
                return this.product.data.attributes.custom_field
                    .map(({ title, required, options }) => ({
                        name: title,
                        required,
                        options,
                    }))
                    .map((x, index) =>
                        Object.entries(x).map(([key, value]) => ({
                            [`data-item-custom${index + 1}-${key.toString().toLowerCase()}`]:
                            value,
                        }))
                    )
                .reduce((acc, curr) => acc.concat(curr), [])
                .reduce((acc, curr) => ({ ...acc, ...curr }));
            },
        },
        created() {
            this.fetch_current_user() 
            this.$axios.$get(`https://nsightapi.vip/api/products/${this.$route.params.id}?populate=*`)
                .then((data) => { 
                    this.product = data 
                    this.main_image = this.product.data.attributes.main_image.data.attributes.url
                })
        },
        methods: {
            fetch_current_user() {
                const thisObj = this
                this.$axios.$get(`https://nsightapi.vip/api/users/${this.loggedInUser.id}?populate=*`)
                    .then((data) => {  thisObj.current_user = data })
                    .catch((err) => { console.log('user_data_error:', err) })
            },
            toggle_main(img){
                this.main_image = img.attributes.url
            },
            clear_main() {
                this.main_image = this.product.data.attributes.main_image.data.attributes.url
            }
        }
    }
</script>
<style lang="scss">
    #product {
        min-height: 100vh;
    }
</style>