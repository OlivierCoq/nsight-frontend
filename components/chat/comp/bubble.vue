<template>
  <div class="w-full flex flex-col mt-5" :class="state.self ? 'justify-end items-end' : '' ">
    <div class="body w-5/6 p-3 rounded-lg shadow-md flex flex-col" :class="state.self ? 'bg-sky-400' : 'bg-zinc-300'">
      <p class="text" :class="state.self ? 'text-white' : 'text-neutral-700'" v-html="props.message.body"></p>
      <div v-if="props.message.media" class="w-full flex flex-col">
        <div v-for="(media, b) in props.message.media" :key="b"></div>
      </div>
    </div>
    <div class="time w-5/6 mt-2 flex flex-row">
      <p class="text-neutral-700 dark:text-white text-xs">{{ time() }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

  // Config
  import moment from "moment";

  // Props:
   const props = defineProps({
    message: {
      type: Object,
      required: true,
    },
    loggedInUser: {
      type: Object,
      required: true,
    },
  })

  // Stores:
  const chat = chatStore()
  
  const me = () => {
    return props.loggedInUser.id === props.message.sender.user
  }

  // State:
  const state = reactive({
    self: me() 
  })

  const time = () => {
    // Moment formatted with Day, Month, date, year, time:
    return moment(props.message.created).format('lll')
  }

</script>