export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nsight-vip',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'preconnect', href: "https://app.snipcart.com" },
      { rel: 'preconnect', href: "https://cdn.snipcart.com" },
      { rel: 'stylesheet', href: "https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js'},
      
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/main.scss', lang: 'sass'}
  ],

  script: [
    { src: '~/plugins/bootstrap.js' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      '~assets/scss/mixins.scss',
      '~assets/scss/variables.scss',
      '~assets/scss/main.scss'
    ]
  },

  // Axios
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://localhost:1337/api'
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],

    // Apollo/GraphQL
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:  "http://localhost:1337/graphql"
      }
    }
  },
  env: {
    storeUrl: "http://localhost:1337/api"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
