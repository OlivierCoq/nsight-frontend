<template>
    <div id="dashboard" class="w-100" v-if="current_user" :class="current_user.preferences.dark_mode ? 'bg-dark' : 'bg-light'" style="opacity: 0;" :style="{opacity: opacity}">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <div class="card text-dark text-lowercase bg-seconodary mt-4 w-100 p-3" >
                        <div class="card-header">Dashboard</div>
                        <div class="card-body px-0">
                            <div v-for="tab, a in tabs" :key="a" class="w-100 hoverable px-3" :class="tab.name == current_tab.name ? 'text-light bg-dark' : 'text-dark' " @click="toggle(tab)">
                                <h3 :class="tab.name == current_tab.name ? 'text-light' : 'text-dark' ">{{ tab.name }}</h3>
                                <div class="w-100 p-0 text-danger">
                                    <hr class="m-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-9">
                    <div class="card text-dark text-lowercase bg-seconodary mt-4 w-100 h-100 p-3">
                        <div class="card-header">{{ current_tab.name }}</div>
                        <div class="card-body">

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
    name: 'Dashboard',
    middleware: 'auth',
    layout: 'inner_page',
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
    data(){
        return {
            opacity: 1,
            current_user: false,
            current_tab: {name: 'My Members'},
            dark_mode: false,
            tabs: [
                {
                    name: 'My Profile',
                    data: {}
                },
                { 
                    name: 'My Members', 
                    data: {}
                 }
            ]
        }
    },
    created(){
        this.fetch_current_user() 
    },
    methods: {
        fetch_current_user() {
            const thisObj = this
            this.$axios.$get(`http://localhost:1337/api/users/${this.loggedInUser.id}?populate=*`)
                .then((data) => {  thisObj.current_user = data })
                .catch((err) => { console.log('user_data_error:', err) })
        },
        toggle(tab) {
            console.log('tab', tab)
            this.current_tab = tab
        }
    }
}
</script>
<style lang="scss">
    #dashboard {
        height: 100vh;
        .hoverable {
            &:hover { cursor: pointer;}
        }
    }
</style>
