import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}