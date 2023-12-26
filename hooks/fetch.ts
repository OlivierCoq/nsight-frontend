
const runtimeConfig = useRuntimeConfig()

import { NuxtApp } from '@nuxt/types';

export default function ({ app }: { app: NuxtApp }) {
  app.mixin({
    async fetch(url: string, options: any) {
      const headers = options?.headers || {};
      headers['Your-Custom-Header'] = 'Your-Custom-Value';

      return (this as any).$fetch(url, { ...options, headers });
    },
  });
}