<template>
  <div id="nsight" class="relative overflow-hidden" :class="settings?.dark_mode ? 'dark' : ''">
    <TemplateNav />
    <slot />
  </div>
</template>
<script setup lang="ts">
// Stores
const settings = settingsStore();
</script>
