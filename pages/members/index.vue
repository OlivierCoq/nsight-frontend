<template>
  <div>
      <!-- <NuxtLink to="section/">index</NuxtLink>
      <NuxtLink to="section/out1">out1</NuxtLink>
      <NuxtLink to="section/out2">out2</NuxtLink> -->
      <!-- Basic Layout: -->

        <NuxtPage />

      
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"],
    layout: "inner",
  })
</script>