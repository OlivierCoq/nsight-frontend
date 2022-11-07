<template>
    <div id="dashboard" class="w-100" v-if="current_user" :class="current_user.preferences.dark_mode ? 'bg-dark' : 'bg-light'" style="opacity: 0.2;" :style="{opacity: opacity}">
        <div class="container my-5 py-5">
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <div class="card text-dark text-lowercase mt-4 w-100 p-3 box-shadow-1">
                        <div class="card-header">Dashboard</div>
                        <div class="card-body px-0">
                            <div v-for="tab, a in tabs" :key="a" class="w-100 is-hoverable px-3 rounded" :class="tab.name == current_tab.name ? 'text-light bg-dark' : 'text-dark' " @click="toggle(tab)">
                                <h4 :class="tab.name == current_tab.name ? 'text-light' : 'text-dark' ">{{ tab.name }}</h4>
                                <div class="w-100 p-0 text-danger">
                                    <hr class="m-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-9">
                    <div class="card text-dark bg-seconodary mt-4 w-100 h-100 p-3">
                        <div class="card-header text-lowercase">{{ current_tab.name }}</div>
                        <div class="card-body px-0">
                                <!-- Row of friends, not adding new  -->
                            <div v-if="current_tab.name == 'My Members' ">
                                <div v-if="!current_tab.data.adding_new" class="d-flex flex-row justify-content-start align-items-start">
                                    <div class="member-card-empty rounded bg-light is-hoverable box-shadow-1 me-3 p-0" @click="add_new">
                                        <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                                            <i class="fa fa-plus fa-2x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="current_tab.data.posting_new">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="w-100 d-flex flex-row align-items-start justify-content-start mb-2">
                                            <span @click="current_tab.data.adding_new = false" class="is-hoverable">
                                                <i class="fa fa-solid fa-caret-left text-dark"></i> Cancel
                                            </span>
                                        </div>
                                        <div class="w-100 d-flex flex-column align-items-start justify-content-start mb-2 box-shadow-1 rounded px-3 py-4">
                                            <h4 class="mb-3">Invite a friend to be an nSight V.I.P!</h4>
                                            <form class="w-100">
                                                <div class="mb-3">
                                                    <input type="text" class="form-control " v-model="current_tab.data.new_user.first_name" placeholder="Their first name" />
                                                </div>
                                                <div class="mb-3">
                                                    <input type="email" class="form-control " v-model="current_tab.data.new_user.email" placeholder="Their email" />
                                                </div>
                                                <button class="btn btn-primary w-100 btn-sm p-2" 
                                                    :disabled="!current_tab.data.new_user.first_name.length || !current_tab.data.new_user.email.length"
                                                    @click.prevent="post_new_member">
                                                        Invite!
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
import MemberCard from '../../components/dashboard/MemberCard.vue'
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
            current_tab: false,
            dark_mode: false,
            tabs: [
                {
                    name: 'My Profile',
                    data: {}
                },
                { 
                    name: 'My Members', 
                    data: {
                        adding_new: false,
                        posting_new: false,
                        new_user: {
                            email: '',
                            first_name: ''
                        }
                    }
                 }
            ]
        }
    },
    created(){
        this.current_tab = this.tabs[1]
        this.fetch_current_user() 
    },
    methods: {
        fetch_current_user() {
            const thisObj = this
            this.$axios.$get(`https://nsightapi.vip/api/users/${this.loggedInUser.id}?populate=*`)
                .then((data) => {  thisObj.current_user = data })
                .catch((err) => { console.log('user_data_error:', err) })
        },
        toggle(tab) {
            this.current_tab = tab
        },
            // Members
        add_new() {
            this.current_tab.data.adding_new = true
        },
        post_new_member() {
            this.current_tab.data.posting_new = true
            /* */
        }
    }
}
</script>
<style lang="scss">
    #dashboard {
        min-height: 100vh;

        .member-card,
        .member-card-empty {
            height: 250px;
            width: 190px;
        }
    }
</style>
