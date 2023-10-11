<template>
  <div>
      <!-- <NuxtLink to="section/">index</NuxtLink>
      <NuxtLink to="section/out1">out1</NuxtLink>
      <NuxtLink to="section/out2">out2</NuxtLink> -->
      <NuxtPage />
  </div>
</template>
<script>

export default {
    name: 'Members',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const state = reactive({

      })

      return {
        // meta
        definePageMeta,
        // state
        state,
        // methods
      }
    },
  }
</script>