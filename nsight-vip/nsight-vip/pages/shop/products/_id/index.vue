<template>
    <div id="product" class="w-100 bg-dark ">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-md-3"></div>
                <div class="col-sm-12 col-md-9">
                    <div class="p-3 p-md-5">
                        <div v-if="product" class="card w-100">
                            <img :src="product.data.attributes.main_image.data.attributes.url" :alt="product.data.attributes.title">
                            <div class="card-body">
                                <h5 class="card-title">{{product.data.attributes.title}}</h5>
                                <p class="card-text">{{product.data.attributes.description}}</p>
                                <p class="card-text">${{product.data.attributes.price}}</p>
                                <button 
                                    :data-item-id="product.data.id"
                                    :data-item-price="product.data.attributes.price"
                                    :data-item-url="`${this.$route.fullPath}`"
                                    :data-item-description="product.data.attributes.description"
                                    :data-item-image="product.data.attributes.main_image.data.attributes.url"
                                    :data-item-name="product.data.attributes.title"
                                    v-bind="customFields"

                                    class="btn btn-primary snipcart-add-item"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Product',
        data(){
            return {
                product: null,
                sotreUrl: process.env.storeUrl
            }
        },
        computed: {
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
            this.$axios.$get(`http://localhost:1337/api/products/${this.$route.params.id}?populate=*`)
                .then((data) => { this.product = data })
        }
    }
</script>
<style lang="scss">
    #product {
        height: 100vh;
    }
</style>