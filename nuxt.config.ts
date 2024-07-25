// https://nuxt.com/docs/api/configuration/nuxt-config

// const path = require('path');
import path from "path";

export default defineNuxtConfig({
  ssr: true,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      // CSS:
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" },
      ],
      script: [
        { src: process.env.SQUARE_ENVIRONMENT === 'sandbox' ? "https://sandbox.web.squarecdn.com/v1/square.js" : "https://web.squarecdn.com/v1/square.js" },
        { src: "~/assets/js/uikit.min.js" },
        { src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js", type: "module" },
        { src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js", nomodule: true },
      ],
    },
  },
  ssr: false,
  typescript: { strict: true },
  css: [
    // "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/style/main.scss",
  ],

  plugins: [
    { src: "~/plugins/font-awesome.ts" },
    { src: "~/plugins/toast.js" }
  ],
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-primevue",
    '@nuxtjs/tailwindcss',
    "@zadigetvoltaire/nuxt-well-known",
    "@fedorae/nuxt-uikit"
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: false,
      importPT: {
        from: path.resolve(__dirname, "./presets/nsight_style_presets/"),
      },
      ripple: true,
    },
    importPT: { as: "Tailwind", from: "primevue/passthrough/tailwind" },
    cssLayerOrder: "tailwind-base, primvevue, tailwind-utilities",
    components: {
      prefix: "Prime",
      name: undefined,
      include: [
        "Tooltip", 
        "Dialog", 
        "AutoComplete", 
        "TabView", 
        "TabPanel", 
        "Carousel",
        "ProgressSpinner",
        "InputNumber",
        "Toast",
        "Accordion",
        "AccordionTab",
        "DataTable",
        "Column",
        "Button"
      ],
      exclude: undefined,
    },
    directives: {
      prefix: "",
      name: undefined,
      exclude: undefined,
      include: ["Tooltip"],
    },
    composables: {
      prefix: "",
      name: undefined,
      exclude: undefined,
      include: undefined,
    },
  },
  imports: {
    // import all stores from store directory
    dirs: ["stores"],
    presets: [
      // {
      //   from: '@stripe/stripe-js',
      //   imports: ['loadStripe']
      // },
      {
        from: "moment",
        imports: ["moment"],
      },
    ],
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  nitro: {
    experimental: {
      websocket: true
    }
  },
  // Tailwind:
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_ENV_CHEC_SECRET_API_KEY,
    // stripeSecretKey: process.env.NUXT_ENV_STRIPE_SECRET_KEY,
    // Keys within public are also exposed client-side
    public: {
      NUXT_STRAPI_URL: process.env.STRAPI_URL || "http://localhost:1337",
      // NUXT_ENV_STRIPE_PUBLISHABLE_KEY: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
      // stripePk: process.env.NUXT_ENV_STRIPE_PUBLISHABLE_KEY,
      NUXT_MEDUSA_BACKEND_URL: process.env.MEDUSA_URL,
      // Square
      SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
      SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
      SQUARE_ENVIRONMENT: process.env.SQUARE_ENVIRONMENT,
      // SendGrid
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    },
    square: {
      applicationId: process.env.SQUARE_APPLICATION_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: process.env.SQUARE_ENVIRONMENT,
    },
  },
  wellKnown: {
    contentUris: [
      {
        path: "apple-developer-merchantid-domain-association",
        content: process.env.APPLE_DEVELOPER_MERCHANTID_DOMAIN_ASSOCIATION,
      },
      { path: "content-uri.txt", content: "content-uri" },
    ],
  },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icns",
      "@fortawesome/vue-fontawesome",
      //       process.env.NODE_ENV === "development" ? '' : 'element-plus',
    ],
  },
});
