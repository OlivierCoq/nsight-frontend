<template>
  <v-container fluid id="login_screen">
    <v-row>
      <v-col cols="12" sm="12" md="6" offset-md="3">
        <div class="d-flex flex-column justify-center align-center p-3 pmd-5 h-100vh">
          <img src="https://res.cloudinary.com/nsight/image/upload/v1668144672/ps_nsight_logo_0362f44f69.png" class="w-100 mt-5 mb-4" alt="PS/nSight Logo">     
          <form class="w-100">
              <div class="mb-3">
                <v-text-field
                  v-model="state.input.email"
                  type="email"
                  placeholder="Email"
                  @keydown="state.errors = []"
                />
              </div>
              <div class="mb-3">
                <v-text-field
                  v-model="state.input.password"
                  type="password"
                  placeholder="Password"
                  @keydown="state.errors = []"
                />
              </div>
              <!-- <div class="mb-3">
                <v-text-field
                  v-model="state.input.nsight_id"
                  type="password"
                  placeholder="nSight ID"
                />
              </div> -->
              <div class="mb-3">
                <v-btn block color="primary" @click.prevent="sign_in">
                  Let's get it
                </v-btn>
              </div>
              <div class="mb-3">
                <small class="text-light">Forgot Password? 
                  <NuxtLink to="/forgot-password" class="text-info fw-bolder text-decoration-none">Let's fix that.</NuxtLink>
                </small>
              </div>
              <v-alert v-if="state.errors.length" color="error">
                <p class="mb-2 fw-bold">Oh man! Something went wrong: </p>
                <ul class="list-group-danger p-0">
                  <li v-for="(error, a) in state.errors" :key="a" >{{error}}.</li>
                </ul>
              </v-alert>
              <div class="my-4">
                <div class="w-100 px-3 py-4">
                  <client-only>
                    <figure v-if="state.quote">
                      <blockquote class="blockquote">
                        <p class="text-light">{{state.quote.attributes.quote_body}}</p>
                      </blockquote>
                      <figcaption class="blockquote-footer">
                        <a :href="state.quote.attributes.link ? state.quote.attributes.link : 'javascript:(0)' " :target="state.quote.attributes.link ? '_blank' : '_self'" class="text-decoration-none text-info">
                        -  {{ state.quote.attributes.author }}
                        </a>
                      </figcaption>
                    </figure> 
                  </client-only>
                </div>
              </div>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { reactive, nextTick } from 'vue'
  import { authStore } from '~/stores/auth'

  export default {
    name: 'IndexPage',
    setup() {
      definePageMeta({
        middleware: ['guest'],
        layout: 'default'
      })
        // State
      const state = reactive({
        input: {
          email: '',
          password: '',
          nsight_id: '',
          strapi_data: false
        },
        quotes: false,
        quote: false,
        nsight_ids: false,
        errors: [],
      })
      const auth = authStore()

        // Methods
      const pull_quote = () => {
        if(state.quotes) {
          let random = Math.floor(Math.random() * state.quotes.data.length)
          state.quote = state.quotes.data[random]
        }
      }
      const quotes = async () => {
        const res = await $fetch('https://nsightapi.vip/api/quotes?populate=*', { method: 'GET' })
          .then((res) => { 
            state.quotes = res
            pull_quote()
          })
          .catch((err) => { console.log(err) })
      } 
      const sign_in = async () => {
        console.log('signing in!')
        try {
          await auth.login({ identifier: state.input.email, password: state.input.password })
            .then((res) => {
              console.log('res', JSON.parse(res))
            }).catch((err) => {
              nextTick(() => {
                state.errors.push("Incorrect email, username, or password.")   
              })    
            })
        } catch (err) {
          state.errors.push("Incorrect email, username, or password.")   
        }
    }

      // Created:
      quotes()

      return {
        state,
        definePageMeta,
        quotes,
        pull_quote,
        sign_in
      }
    }
  }
</script>
<style lang="scss">
  #login_screen {
    min-height: 100vh !important;
    background-color: black !important;

    color: white;
   }
</style>