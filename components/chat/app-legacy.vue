<template>
  <div class="fixed bottom-4 right-4">
    <ChatCompMessenger v-if="chatStore.chat_open" />
    <ChatCompLauncher v-else />
  </div>
</template>
<script setup lang="ts">

  // Stores:
  const chatStore = useChatStore()
</script>