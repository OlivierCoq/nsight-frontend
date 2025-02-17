<template>
  <div class="flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-xl border1 bg-zinc-100 dark:bg-zinc-900">
    <a :href="`/members/${props.member.nsight_id?.nsight_id}`">
      <div class="rounded-full lg:w-16 lg:h-16 w-10 h-10 overflow-hidden flex flex-col justify-center items-center">
        <img :src="props.member.profile_picture?.url ? props.member.profile_picture.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" :alt="props.member.first_name" class="w-[110%]">
      </div>
    </a>
    <div class="flex-1">
      <a :href="`/members/${props.member.nsight_id.nsight_id}`">
        <h4 class="font-semibold text-sm text-neutral-900 dark:text-white">{{ props.member.first_name }} {{ props.member.last_name }}</h4>
      </a>
      <div v-if="props.member.friends" class="mt-0.5">{{ props.member.friends.length }} following</div>
      <div v-else class="mt-0.5">Invited</div>
    </div>
  </div>
</template>

<script setup>

  // props
  const props = defineProps({
    member: {
      type: Object,
      required: true
    }
  })

  // state

  // store
  const auth = authStore()
  const chat = chatStore()
  const settings = settingsStore()

  // methods

  // lifecycle hooks
</script>

<style lang="scss" scoped>

</style>