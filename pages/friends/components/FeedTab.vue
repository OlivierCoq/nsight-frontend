<template>
  <div class="w-full flex flex-col p-4 fade-in"></div>
</template>
<script setup lang="ts">
  
  // Props:
 const props = defineProps({
    state: {
      type: Object,
      required: true,
    },
  })

// Stores:
const auth = authStore()
const settings = settingsStore()


</script>
<style scoped></style>