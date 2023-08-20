<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>
  import { ofetch } from 'ofetch'

  globalThis.$fetch = ofetch.create({
    headers: { 'Content-Type': 'application/json' }
  })
</script>
