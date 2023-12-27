import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["piniaPersistedstate"]?: typeof import("@pinia-plugin-persistedstate/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["stripe"]?: typeof import("@unlok-co/nuxt-stripe").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["medusa"]?: typeof import("nuxt-medusa").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@pinia-plugin-persistedstate/nuxt", Exclude<NuxtConfig["piniaPersistedstate"], boolean>] | ["@unlok-co/nuxt-stripe", Exclude<NuxtConfig["stripe"], boolean>] | ["nuxt-medusa", Exclude<NuxtConfig["medusa"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   apiSecret: string,

   stripeSecretKey: string,

   stripe: {
      key: string,

      options: {
         apiVersion: string,
      },
   },

   private: {
      apiKey: any,
   },
  }
  interface PublicRuntimeConfig {
   NUXT_STRAPI_URL: string,

   NUXT_ENV_STRIPE_PUBLISHABLE_KEY: string,

   NUXT_MEDUSA_BACKEND_URL: string,

   persistedState: {
      storage: string,

      debug: boolean,

      cookieOptions: any,
   },

   stripe: {
      key: string,

      options: any,
   },

   medusa: {
      baseUrl: string,

      maxRetries: number,

      publishableApiKey: any,

      global: boolean,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }