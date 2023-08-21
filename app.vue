<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
  import { ofetch } from 'ofetch'
  const runtimeConfig = useRuntimeConfig()

  globalThis.$fetch = ofetch.create({
    headers: { 'Content-Type': 'application/json' }
  })
</script>
