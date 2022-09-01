<template>
    <div></div>
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
        created() {
            this.$axios.$get(`http://localhost:1337/api/products/${this.$route.params.id}?populate=*`)
                .then((data) => { this.product = data })
        }
    }
</script>
<style lang="scss">

</style>