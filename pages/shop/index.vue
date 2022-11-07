<template>
    <client-only>
        <div id="shop_home" class="w-100" v-if="current_user" :class="current_user.preferences.dark_mode ? 'bg-dark' : 'bg-light'" style="opacity: 0.2;" :style="{opacity: opacity}">
            <div class="container-fluid my-5 py-5">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <div class="d-flex align-items-center justify-content-start">

                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6"></div>
                </div>
                <div class="row px-3 px-md-5 mx-md-5">
                    <div v-for="product, a in products.data" :key="a"  class="col-sm-12 col-md-3 p-3">
                        <div class="ctr-product w-100 position-relative">
                            <div class="ctr-image w-100 position-absolute" :style="{ backgroundImage: `url(${product.attributes.main_image.data.attributes.url})` }">
                                <div class="ctr-options h-100 w-100"> 
                                    <NuxtLink :to="`/shop/products/${product.id}`" class="text-decoration-none text-dark mx-2">
                                        <div class="img w-100 position-absolute" :style="{ backgroundImage: `url(${product.attributes.additional_images.data[0].attributes.url})` }" style="top: 0;">
                                        </div>
                                    </NuxtLink>
                                    <div class="w-100 position-absolute bottom-0 bg-light d-flex flex-row align-items-center justify-content-center" style="margin-top: -2rem; height: 7rem;">
                                        <i class="fa-solid fa-share text-dark mx-2"></i>
                                        <i class="fa-regular fa-plus text-dark mx-2"></i>
                                        <i class="fa-regular fa-heart text-danger mx-2"></i>
                                        <NuxtLink :to="`/shop/products/${product.id}`" class="text-decoration-none text-dark mx-2">More <i class="fa fa-arrow-right text-dark"></i></NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <div class="ctr-meta w-100 py-2 position-absolute bottom-0">
                                <h4 class="mb-0" :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'"> {{product.attributes.title}}</h4>
                                <span :class="current_user.preferences.dark_mode ? 'text-light' : 'text-dark'">${{product.attributes.price.toFixed(2)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Shop',
    middleware: 'auth',
    layout: 'inner_page',
    async asyncData({ $axios}) {
        const products = await $axios.$get('https://nsightapi.vip/api/products?populate=*')
        return { products }
    },
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
    data(){
        return {
            opacity: 1,
            products: false,
            current_user: false,
            dark_mode: false,
        }
    },
    created() {
        this.fetch_current_user() 
    },
    methods: {
        fetch_current_user() {
            const thisObj = this
            this.$axios.$get(`https://nsightapi.vip/api/users/${this.loggedInUser.id}?populate=*`)
                .then((data) => {  thisObj.current_user = data })
                .catch((err) => { console.log('user_data_error:', err) })
        }
    }
}
</script>
<style lang="scss">
    #shop_home {
        // height: 100vh;

        .ctr-product {
            height: 535px;
            .ctr-image { 
                height: 460px; 
                background-size: cover;
                background-repeat: no-repeat;

                &:hover {
                    .ctr-options { opacity: 1; }
                }
                
                .ctr-options {
                    opacity: 0;
                    height: inherit;

                    .img {
                        background-size: cover;
                        background-repeat: no-repeat;
                        height: 22rem;
                    }
                }
            }
            .ctr-meta { height: 75px; }
        }
    }
</style>
