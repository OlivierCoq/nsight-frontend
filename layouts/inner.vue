<template>
  <div id="nsight" class="relative" :class="settings?.dark_mode ? 'dark' : ''">
    <CommonAppBar />
    <slot />
  </div>
</template>
<script setup lang="ts">
// Stores
const settings = settingsStore();
</script>
