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
    '@pinia-plugin-persistedstate/nuxt',
    '@unlok-co/nuxt-stripe'
  ],
  imports: {
    // import all stores from store directory
    dirs: ['stores'],
    presets: [
      {
        from: '@stripe/stripe-js',
        imports: ['loadStripe']
      },
      {
        from: 'moment',
        imports: ['moment']
      }
    ]
  },
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  },
  stripe: {
    server: {
      key: process.env.NUXT_ENV_STRIPE_SECRET_KEY,
    },
    client: {
      key: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
    }
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_ENV_CHEC_SECRET_API_KEY,
    stripeSecretKey: process.env.NUXT_ENV_STRIPE_SECRET_KEY,
    // Keys within public are also exposed client-side
    public: {
      NUXT_STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
      NUXT_ENV_CHEC_PUBLIC_API_KEY: process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY,
      NUXT_ENV_STRIPE_PUBLISHABLE_KEY: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
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