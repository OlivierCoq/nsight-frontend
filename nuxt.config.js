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
      { src: '~/assets/js/bootstrap.bundle.min.js', type: 'text/javascript' }
      // { src: '~/plugins/bootstrap.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/main.scss', lang: 'sass'},
    // { src: '~/snipcart/customize.css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/bootstrap.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/snipcart',
    '@nuxtjs/strapi'
  ],

   // Axios
   publicRuntimeConfig: {
    axios: {
      // baseURL: 'https://nsightapi.vip/api'
      baseURL:  process.env.STRAPI_URL || 'http://localhost:1337'
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth'
  ],

  snipcart: {
      // Options available
      key: 'ZjU5ZDBjNmEtYzBlYi00YjVhLWFlNzYtNDE2ZjhlMGI2MjkxNjM3OTcwNzY0NzA1MjM5NTcz', 
      attributes: []
  },

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },
  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'api/users/me',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    }
  },

  styleResources: {
    scss: [
      '~assets/scss/mixins.scss',
      '~assets/scss/variables.scss',
      '~assets/scss/main.scss'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
