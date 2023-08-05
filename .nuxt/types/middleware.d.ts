import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "guest"
declare module "/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}