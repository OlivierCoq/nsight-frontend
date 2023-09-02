// common/commerce
import CommerceSDK from "@chec/commerce.js";

const runtimeConfig = useRuntimeConfig()
const commerce = new CommerceSDK(runtimeConfig.public.NUXT_ENV_CHEC_PUBLIC_API_KEY);

export default (_, inject: any) => {
  inject('commerce', commerce)
}

// export default defineNuxtPlugin(({vueApp}) => {
//   vueApp.component('commerce', commerce)
// })