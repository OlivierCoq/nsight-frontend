import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["piniaPersistedstate"]?: typeof import("@pinia-plugin-persistedstate/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["medusa"]?: typeof import("nuxt-medusa").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["wellKnown"]?: typeof import("@zadigetvoltaire/nuxt-well-known").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@pinia-plugin-persistedstate/nuxt", Exclude<NuxtConfig["piniaPersistedstate"], boolean>] | ["nuxt-medusa", Exclude<NuxtConfig["medusa"], boolean>] | ["@zadigetvoltaire/nuxt-well-known", Exclude<NuxtConfig["wellKnown"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
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

   private: {
      apiKey: any,
   },
  }
  interface PublicRuntimeConfig {
   NUXT_STRAPI_URL: string,

   NUXT_MEDUSA_BACKEND_URL: string,

   SQUARE_APPLICATION_ID: string,

   SQUARE_LOCATION_ID: string,

   SQUARE_ACCESS_TOKEN: string,

   SQUARE_ENVIRONMENT: string,

   persistedState: {
      storage: string,

      debug: boolean,

      cookieOptions: any,
   },

   medusa: {
      baseUrl: string,

      maxRetries: number,

      publishableApiKey: any,

      global: boolean,
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