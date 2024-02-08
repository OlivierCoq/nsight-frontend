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
  script: [
    // { src: 'https://js.stripe.com/v3' }
  ],
  plugins: [
    { src: "~/plugins/font-awesome.ts" }
  ],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-medusa'
  ],
  imports: {
    // import all stores from store directory
    dirs: ['stores'],
    presets: [
      // {
      //   from: '@stripe/stripe-js',
      //   imports: ['loadStripe']
      // },
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
  // stripe: {
  //   server: {
  //     key: process.env.NUXT_ENV_STRIPE_SECRET_KEY,
  //   },
  //   client: {
  //     key: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
  //   }
  // },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_ENV_CHEC_SECRET_API_KEY,
    // stripeSecretKey: process.env.NUXT_ENV_STRIPE_SECRET_KEY,
    // Keys within public are also exposed client-side
    public: {
      NUXT_STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
      // NUXT_ENV_STRIPE_PUBLISHABLE_KEY: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
      // stripePk: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
      NUXT_MEDUSA_BACKEND_URL: process.env.MEDUSA_URL,
      // Square
      SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
      SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
      SQUARE_ENVIRONMENT: process.env.SQUARE_ENVIRONMENT
    },
    square: {
      applicationId: process.env.SQUARE_APPLICATION_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: process.env.SQUARE_ENVIRONMENT
    }
  },
  // serverMiddleware: [
  //   { path: '/.well-known/:path*', handler: '~/middleware/wellKnown.js' }
  // ],
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