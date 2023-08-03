import { authStore } from "@/stores/auth.js"

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = authStore()
  if (auth.loggedIn) {
    return navigateTo("/dashboard");
  }
})