<template>
    <div id="dashboard" class="bg-dark w-100">
        <div class="container-fluid">
            <div class="row">
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    middleware: 'auth',
    layout: 'inner_page',
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
    data(){
        return {
           
        }
    }
}
</script>
<style lang="scss">
    #dashboard {
        height: 100vh;
    }
</style>
