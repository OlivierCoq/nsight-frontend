<template>
  <div class="fixed bottom-4 right-4">
    <ChatCompMessenger v-if="chat.chat_open" />
    <ChatCompLauncher v-else />
  </div>
</template>
<script setup lang="ts">

  // Stores:
  const chat = chatStore()
</script>