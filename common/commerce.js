// common/commerce
import CommerceSDK from "@chec/commerce.js";

const runtimeConfig = useRuntimeConfig()
const client = new CommerceSDK(runtimeConfig.public.NUXT_ENV_CHEC_PUBLIC_API_KEY);

export default client;