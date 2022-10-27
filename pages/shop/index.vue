<template>
    <client-only>
        <div id="shop_home" class="bg-dark w-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-3"></div>
                    <div class="col-sm-12 col-md-9">
                        <div class="row my-5">
                            <div v-for="product, a in products.data" :key="a" class="col-sm-12 col-md-4">
                                <nuxt-link :to="`/shop/products/${product.id}`" class="text-decoration-none text-dark">
                                    <div class="card w-100">
                                        <img :src="product.attributes.main_image.data.attributes.url" :alt="product.attributes.title">
                                        <div class="card-body">
                                            <h5 class="card-title">{{product.attributes.title}}</h5>
                                            <p class="card-text">{{product.attributes.description}}</p>
                                            <a :href="`/shop/products/${product.id}`" class="btn btn-primary my-2">Check it Out</a>
                                        </div>
                                    </div>
                                </nuxt-link>
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
            products: false
        }
    },
    created() {
    },
    methods: {
    }
}
</script>
<style lang="scss">
    #shop_home {
        height: 100vh;
    }
</style>
