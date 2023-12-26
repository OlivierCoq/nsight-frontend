const opts = {
  async onRequest({ request, options }: any) {
    const runtimeConfig = useRuntimeConfig()
    options.headers = { 'X-Authorization': runtimeConfig.apiSecret }
  },
}

export const customFetch = () => $fetch.create(opts)