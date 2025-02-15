<template>
  <div class="flex flex-row rounded-lg bg-zinc-300 shadow-xl min-h-[300px] w-full p-10 my-2">
    <a v-if="!profilePage" :href="`/members/${user.nsight_id.nsight_id}` " class="flex flex-col w-1/6 items-center justify-start cursor-arrow">
      <img class="rounded-full w-16 h-16" :src="user.profile_picture.url" alt="profile picture">
      <p class="text-xs m-0 text-neutral-800">{{ user.first_name }}</p>
    </a>
    <div v-else class="flex-1 flex"></div>
    <div class="flex flex-col w-5/6">
      <p class="text-xs">{{ post.createdAt }}</p>
      <h3 class="text-xl text-neutral-800 font-bold mb-3">{{ post.title }}</h3>
      <p class="text-md text-neutral-800" v-html="post.body"></p>
      
      <div class="w-1/6 flex flex-row justify-between">
        <div class="w-1/2 px-2 flex flex-col justify-center items-center">
          <font-awesome-icon :icon="[in_favorites ? 'fas' : 'far', 'heart']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// Setup
const config = useRuntimeConfig()

// Stores
const auth = authStore()

// props
const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  profilePage: {
    type: Boolean,
    default: false
  }
})

// Methods
const in_favorites = () => {
  
  return auth.user.favorites.posts?.indexOf(props.post.id) > -1
}

onMounted(() => {
  console.log(auth.user.favorites.posts?.indexOf(props.post.id) > -1)
})

</script>

<style lang="scss" scoped>

</style>