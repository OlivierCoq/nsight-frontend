import { ofetch } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = ofetch.create({
    baseURL: '/api',
    headers: {
      Accept: 'application/json'
    }
  })

  // You can also just do this instead of returning
  // nuxtApp.provide('ofetch', instance)

  // return {
  //   provide: {
  //     ofetch: instance
  //   }
  // }

  nuxtApp.vueApp.use(instance)
})