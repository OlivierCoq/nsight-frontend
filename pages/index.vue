<template>
  <div id="login_screen" class="bg-dark w-100 h-100">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <div class="d-flex flex-column justify-content-center align-items-center p-3 p-md-5 h-100">
            <h1 class="text-light m-3">nSight</h1><hr/>
            <form class="w-100">
              <div class="mb-3">
                <input type="email" class="form-control " v-model="input.email" placeholder="Email">
              </div>
              <div class="mb-3">
                <input type="password" class="form-control " v-model="input.password" placeholder="Password">
              </div>
              <div class="mb-3">
                <input type="password" class="form-control" v-model="input.nsight_id" placeholder="nSight ID">
              </div>
              <div class="mb-3">
                <button class="btn btn-primary btn-block w-100" @click.prevent="sign_in">Let's get it</button>
              </div>
              <div class="mb-3">
                <small class="text-light">Forgot Password? 
                  <NuxtLink to="/forgot-password" class="text-info fw-bolder text-decoration-none">Let's fix that.</NuxtLink>
                </small>
              </div>
              <div class="my-4">
                <div class="w-100 px-3 py-4">
                  <client-only>
                    <figure>
                      <blockquote class="blockquote">
                        <p  class="text-light">{{quote.attributes.quote_body}}</p>
                      </blockquote>
                      <figcaption class="blockquote-footer">
                        <a :href="quote.attributes.link ? quote.attributes.link : 'javascript:(0)' " :target="quote.attributes.link ? '_blank' : '_self'">
                          {{ quote.attributes.author }}
                        </a>
                      </figcaption>
                    </figure>
                  </client-only>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
      const quotes = await $axios.$get('https://nsightapi.vip/api/quotes?populate=*')
      return { quotes }
  },
  middleware: 'guest',
  data() {
    return {
      input: {
        email: '',
        password: '',
        nsight_id: '',
        strapi_data: false
      },
      quotes: false,
      quote: false,
      nsight_ids: false,
      error: false
    }
  },
  created() {
    this.pull_quote()
  },
  methods: {
    pull_quote() {
      let random = Math.floor(Math.random() * this.quotes.data.length)
        this.quote = this.quotes.data[random]
    },
    async sign_in({ $axios }) {
      console.log('signing in!!!')

      this.error = null;
      try {
        await this.$auth.loginWith("local", {
          data: {
            identifier: this.input.email,
            password: this.input.password,
          },
        });
        this.$router.push("/dashboard");
      } catch (e) {
        this.error = e
      }

      // const thisObj = this,
      //       postObj = {
      //         identifier: this.input.email,
      //         password: this.input.password
      //       }
      // this.input.strapi_data = await thisObj.$axios.$post('http://localhost:1337/api/auth/local', postObj)
      // this.$axios.setHeader(`Authorization`, `Bearer ${thisObj.input.strapi_data.jwt}`)
      // this.nsight_ids = await this.$axios.$get('http://localhost:1337/api/nsight-ids?populate=*')
    }
  }
}
</script>
<style lang="scss">
  #login_screen {
    height: 100vh !important;
   }
</style> 