<template>
  <div class="flex flex-row rounded-lg bg-zinc-300 shadow-xl  w-full p-10 my-2">
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
          <font-awesome-icon :icon="[in_favorites() ? 'fas' : 'far', 'heart']" class="cursor-pointer" @click="toggle_favorite" />
          <p class="text-xs m-0">{{ post.reactions.upvotes }}</p>
        </div>
        <div class="w-1/2 px-2 flex flex-col justify-center items-center">
          <font-awesome-icon :icon="['far', 'comment']" class="cursor-pointer" />
          <p v-if="post.comments" class="text-xs m-0">{{ post.comments?.comments?.length }}</p>
        </div>
      </div>



      <CommentThread v-if="post.comments" :target="post" :user="user" :profilePage="profilePage" />

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

// State
// const state = reactive({
//   show_comments: false,
//   new_comment: {
//     body: '',
//     post: props.post.id,
//     visible: true,
//     commenter: auth.user?.id
//   }
// })

// components
import CommentThread from '~/components/common/comment_thread.vue'

// Methods
const in_favorites = () => {
  return auth?.user?.favorites?.posts?.indexOf(props.post.id) > -1
}

const toggle_favorite = () => {
  if (auth.user) {
    if (in_favorites()) {
      auth.user.favorites.posts = auth.user?.favorites?.posts?.filter(fav => fav !== props.post.id)
      props.post.reactions.upvotes -= 1
    } else {
      auth.user?.favorites?.posts?.push(props.post.id)
      props.post.reactions.upvotes += 1
    }
  }
  nextTick(() => { 
    auth.updateUser() 
    
    // Update post in databse:
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/posts/${props.post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        reactions: {
          upvotes: props.post.reactions.upvotes
        }
      })
    })
  })
}



// Lifecycle
// onMounted(() => {
 
//   const accorion_handler = document.getElementById(`accordion-handler-${props.post.id}`)
//   // automatically click the accordion handler
//   accorion_handler.click()
//   nextTick(() => {
//     state.show_comments = true
//   })

// })



</script>

<style lang="scss" scoped>

</style>