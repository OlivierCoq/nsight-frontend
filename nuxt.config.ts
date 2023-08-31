// https://nuxt.com/docs/api/configuration/nuxt-config

// const path = require('path');

export default defineNuxtConfig({ 
  devtools: { 
    enabled: true,
    timeline: {
      enabled: true
    } 
  },
  ssr: false,
  typescript: { strict: true }, 
  css: [
    "vuetify/styles",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "vuetify/lib/styles/main.sass",
    "~/assets/style/main.scss"
  ],
  plugins: [
    { src: "~/plugins/font-awesome.ts" }
  ],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      NUXT_STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
      NUXT_ENV_CHEC_PUBLIC_API_KEY: process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY
    }
  },
  build: {
    transpile: [
      'vuetify',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
//       process.env.NODE_ENV === "development" ? '' : 'element-plus',
  ],
},
})