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
                        <div class="card-body p-0">
                                <!-- Row of friends, not adding new  -->
                            <div v-if="current_tab.name == 'My Members' ">
                                <div v-if="!current_tab.data.adding_new" class="d-flex flex-row justify-content-start align-items-start flex-wrap">

                                    <DashboardMemberCard v-for="member, b in current_user.users" :key="b" :member="member" />

                                    <div class="member-card-empty rounded bg-light is-hoverable box-shadow-2 me-3 p-0 mt-3" @click="add_new">
                                        <div class="h-100 d-flex flex-column justify-content-center align-items-center" style="width: inherit !important;">
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

// SCRIPT KIDDIE'D TF OUTTA THIS:
var UUIDv4 = new function() {
	function generateNumber(limit) {
	   var value = limit * Math.random();
	   return value | 0;
	}
	function generateX() {
		var value = generateNumber(16);
		return value.toString(16);
	}
	function generateXes(count) {
		var result = '';
		for(var i = 0; i < count; ++i) {
			result += generateX();
		}
		return result;
	}
	function generateVariant() {
		var value = generateNumber(16);
		var variant =  (value & 0x3) | 0x8;
		return variant.toString(16);
	}
    // UUID v4
    //
    //   varsion: M=4 
    //   variant: N
    //   pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
    //
	this.generate = function() {
  	    var result = generateXes(8)
  	         + '-' + generateXes(4)
  	         + '-' + '4' + generateXes(3)
  	         + '-' + generateVariant() + generateXes(3)
  	         + '-' + generateXes(12)
  	    return result;
	};
};

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
            error: false,
            use_the_force: false,
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
                            first_name: '',
                            n_id: `nsight-${UUIDv4.generate()}`
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
            thisObj.current_user = false
            this.$axios.$get(`https://nsightapi.vip/api/users/${this.loggedInUser.id}?populate=*`)
                .then((data) => {  thisObj.current_user = data })
                .catch((err) => { console.log('user_data_error:', err) })
        },
        toggle(tab) {
            this.current_tab = tab
        },
            // Members
        add_new() {
            // Toggling Add New User mode
            this.current_tab.data.adding_new = true
        },
        generate_random_password() {
            let pass = ``,
                str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$`
            for (let i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                pass += str.charAt(char)
            }
            return pass;
        },
        post_new_member() {
            this.current_tab.data.posting_new = true
            const thisObj = this
            /*
                - define new member object
                - create a new_nsight_id. Example: `nsight-${0da19e70-59ba-41f0-a2d6-bcdb35781929}`
                - search for all nsight_ids (GET /api/nsight-ids?populate=*)
                    - make sure new_nsight_id !== any of the nsight_ids
                    - Make new_nsight_id.authentic = true -> insert into DB
                    - make new user with new_nsight_id
            */
           this.$axios.$get('https://nsightapi.vip/api/nsight-ids?populate=*')
            .then((data) => {
                const n_ids = data
                console.log('nids', n_ids)
                let match 
                n_ids.data.forEach((n_id) => {
                    if(thisObj.current_tab.data.new_user.n_id == n_id.attributes.nsight_id) { match = true }
                })
                if(match) { console.log('Invalid.'); return false
                } else {
                        // add new nsight_id
                    let new_nsight_id = {
                        data: {
                            authentic: true,
                            nsight_id: thisObj.current_tab.data.new_user.n_id
                        }
                    }
                    this.$axios.$post('https://nsightapi.vip/api/nsight-ids', new_nsight_id)
                        .then((data) => {
                            console.log('new_nsight_id', data)
                                // Create new user object and insert new member in to DB:
                            let new_nsight_member = {
                                blocked: false,
                                    confirmed: false,
                                    email: thisObj.current_tab.data.new_user.email,
                                    first_name: thisObj.current_tab.data.new_user.first_name,
                                    nsight_id: data.data,
                                    preferences: {
                                        dark_mode: true
                                    },
                                    username: thisObj.current_tab.data.new_user.email,
                                    password: thisObj.generate_random_password()
                            }
                            this.$axios.$post('https://nsightapi.vip/api/users', new_nsight_member)
                                .then((data) => { 
                                    console.log('created new member: ', data) 

                                        // Add user to your Friends list:
                                    thisObj.current_user.users.push(data)
                                    
                                            // Send Email Confirmation
                                    this.$axios.$post('https://nsightapi.vip/api/auth/send-email-confirmation', {
                                        email: thisObj.current_tab.data.new_user.email
                                    })
                                        .then((data) => {
                                            // console.log('sent new member confirmation email: ', data)

                                                // Update friend list in DB
                                            this.$axios.$put(`https://nsightapi.vip/api/users/${thisObj.current_user.id}`, thisObj.current_user)
                                                .then((data) => {
                                                    // console.log('Added to your friends list: ', data)
                                                    
                                                    // thisObj.current_user = false
                                                    // thisObj.fetch_current_user()
                                                    thisObj.current_tab.data.posting_new = false
                                                    thisObj.current_tab.data.adding_new = false
                                                })
                                                .catch((err) => { this.error = err.response.data.error.message })
                                            
                                        })
                                        .catch((err) => { this.error = err.response.data.error.message })

                                })
                                .catch((err) => { this.error = err.response.data.error.message })
                        })
                        .catch((err) => { this.error = err.response.data.error.message })
                }
            })
            .catch((err) => { this.error = err.response.data.error.message })
        }
    },
    watch: {
    }
}
</script>
<style lang="scss">
    #dashboard {
        min-height: 100vh;

        .member-card-empty {
            height: 250px !important;
            width: 170px !important;
        }
    }
</style>
