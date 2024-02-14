// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/square/create-customer': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/square/create-customer.post').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/.well-known/security.txt': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@zadigetvoltaire/nuxt-well-known/dist/runtime/server/middleware/security-txt').default>>>>
    }
    '/.well-known/change-password': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@zadigetvoltaire/nuxt-well-known/dist/runtime/server/middleware/change-password').default>>>>
    }
    '/.well-known/apple-developer-merchantid-domain-association': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@zadigetvoltaire/nuxt-well-known/dist/runtime/server/middleware/content-uri').default>>>>
    }
    '/.well-known/content-uri.txt': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@zadigetvoltaire/nuxt-well-known/dist/runtime/server/middleware/content-uri').default>>>>
    }
  }
}
export {}