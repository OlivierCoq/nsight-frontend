import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["piniaPersistedstate"]?: typeof import("@pinia-plugin-persistedstate/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["primevue"]?: typeof import("nuxt-primevue").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["wellKnown"]?: typeof import("@zadigetvoltaire/nuxt-well-known").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["uikit"]?: typeof import("@fedorae/nuxt-uikit").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@pinia-plugin-persistedstate/nuxt", Exclude<NuxtConfig["piniaPersistedstate"], boolean>] | ["nuxt-primevue", Exclude<NuxtConfig["primevue"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@zadigetvoltaire/nuxt-well-known", Exclude<NuxtConfig["wellKnown"], boolean>] | ["@fedorae/nuxt-uikit", Exclude<NuxtConfig["uikit"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   apiSecret: string,

   square: {
      applicationId: string,

      locationId: string,

      accessToken: string,

      environment: string,
   },
  }
  interface PublicRuntimeConfig {
   NUXT_STRAPI_URL: string,

   NUXT_MEDUSA_BACKEND_URL: string,

   SQUARE_APPLICATION_ID: string,

   SQUARE_LOCATION_ID: string,

   SQUARE_ACCESS_TOKEN: string,

   SQUARE_ENVIRONMENT: string,

   SENDGRID_API_KEY: string,

   persistedState: {
      storage: string,

      debug: boolean,

      cookieOptions: any,
   },

   primevue: {
      usePrimeVue: boolean,

      resolvePath: any,

      cssLayerOrder: string,

      importPT: {
         as: string,

         from: string,
      },

      options: {
         unstyled: boolean,

         importPT: {
            from: string,
         },

         ripple: boolean,
      },

      components: Array<{

      }>,

      directives: Array<{

      }>,

      composables: Array<{

      }>,

      config: Array<{

      }>,

      services: Array<{

      }>,

      styles: Array<{

      }>,

      injectStylesAsString: Array<any>,

      injectStylesAsStringToTop: Array<string>,
   },

   wellKnown: {
      devtools: boolean,

      contentUris: Array<{

      }>,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }