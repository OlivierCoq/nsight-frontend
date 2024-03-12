<template>
  <div class="w-[90%] h-[360px] mx-auto mb-6 rounded-md shadow-md bg-zinc-200 dark:bg-zinc-400">
    <div 
      class="w-full h-1/2 rounded-t-md bg-cover bg-center"
      :style="{ backgroundImage: `url(${state.member.profile_picture ? state.member.profile_picture.url : 'https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg'})` }"
    ></div>
    <div class="w-full h-1/2 flex flex-col justify-between items-start p-4">
      <h3 class="text-2xl member_name text-neutral-500 dark:text-neutral-200">{{ state.member.first_name }}</h3>
      <div class="w-full flex flex-row my-3 items-end justify-end">
        <button @click="gift_user" class="btn-gift me-3 text-neutral-500 dark:text-neutral-200 hover:text-blue-300">
          <font-awesome-icon :icon="['fas', 'gift']" />
          <!-- <span class="ms-2">Send Gift</span> -->
        </button>
        <button @click="visit_profile" class="btn-profile me-3 text-neutral-500 dark:text-neutral-200 hover:text-green-500">
          <font-awesome-icon :icon="['fas', 'user']" />
          <!-- <span class="ms-2">View Profile</span> -->
        </button>
      </div>
    </div>  
  </div>
</template>
<script setup>
  // import { reactive } from 'vue'
  const props = defineProps(['member'])
  const state = reactive({
    member: props.member
  })
  const visit_profile = () => {
    navigateTo(`/members/${state.member.id}`)
  }
  const gift_user = () => {

    console.log('gift user', state.member)
  }
</script>
<style lang="scss">
  .member-card {

    img { height: 100%; }

    // subtle text-shadow
    .member_name {
      text-shadow: 1px 1px 9px rgb(20 1 1 / 56%);
    }

    .w-100 { width: 100% !important; }
    .h-100 { height: 100% !important; }
  }
</style>