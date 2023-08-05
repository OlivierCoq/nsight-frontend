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