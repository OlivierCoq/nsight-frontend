<template>
  <div
    class="launcher fade-in bg-zinc-300 dark:bg-zinc-800 rounded-full hover:shadow-lg p-2 cursor-pointer h-[4rem] w-[4rem] flex justify-center items-center z-50"
    @click="chat.chat_open = true"
  >
    <font-awesome-icon
      :icon="['fas', 'comment-dots']"
      class="text-neutral-700 dark:text-white text-4xl"
    />
  </div>
</template>
<script setup lang="ts">

  // Stores:
  const chat = chatStore()
</script> 