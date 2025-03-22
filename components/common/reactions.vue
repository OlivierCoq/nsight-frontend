<template>
  <div class="w-1/6 flex flex-row justify-between text-zinc-800 dark:text-zinc-200">
    <div class="w-1/2 px-2 flex flex-col justify-center items-center text-xl">
      <font-awesome-icon :icon="[in_favorites(postType) ? 'fas' : 'far', 'heart']" class="cursor-pointer text-lg" @click="toggle_favorite(postType)" />
      <p class="text-xs m-0">{{ post.reactions.upvotes }}</p>
    </div>
    <div class="w-1/2 px-2 flex flex-col justify-center items-center text-xl">
      <font-awesome-icon :icon="['far', 'comment']" class="cursor-pointer text-lg" />
      <p class="text-xs m-0">{{ post.comments?.comments?.length }}</p>
    </div>
  </div>
</template>

<script setup>

// setup
const config = useRuntimeConfig()

  // Props:
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
      required: true
    },
    postType: {
      type: String,
      required: true
    }
  })

  // stores
  const auth = authStore()

  // Methods:
  const in_favorites = (type) => {

    switch(type) {
      case 'picture-posts':
        return auth?.user?.favorites?.picture_posts?.indexOf(props.post.id) > -1
      case 'video-posts':
        return auth?.user?.favorites?.video_posts?.indexOf(props.post.id) > -1
      case 'posts':
        return auth?.user?.favorites?.posts?.indexOf(props.post.id) > -1
      default:
        return auth?.user?.favorites?.posts?.indexOf(props.post.id) > -1
    }
}

const toggle_favorite = (postType) => {

  if(auth.user)  {
    switch(postType) {
      case 'picture-posts':
        if(in_favorites(postType)) {
          auth.user.favorites.picture_posts = auth.user?.favorites?.picture_posts?.filter(fav => fav !== props.post.id)
          props.post.reactions.upvotes -= 1
        } else {
          auth.user?.favorites?.picture_posts?.push(props.post.id)
          props.post.reactions.upvotes += 1
        }
        break
      case 'video-posts':
        if(in_favorites(postType)) {
          auth.user.favorites.video_posts = auth.user?.favorites?.video_posts?.filter(fav => fav !== props.post.id)
          props.post.reactions.upvotes -= 1
        } else {
          auth.user?.favorites?.video_posts?.push(props.post.id)
          props.post.reactions.upvotes += 1
        }
        break
      case 'posts':
        if(in_favorites(postType)) {
          auth.user.favorites.posts = auth.user?.favorites?.posts?.filter(fav => fav !== props.post.id)
          props.post.reactions.upvotes -= 1
        } else {
          auth.user?.favorites?.posts?.push(props.post.id)
          props.post.reactions.upvotes += 1
        }
        break
      default:
        break
    }
  }
  
  nextTick(() => { 
    auth.updateUser() 
    
    // Update post in databse:
    let post_type 
    switch(props.postType) {
      case 'picture-posts':
        post_type = 'picture-posts'
        break
      case 'video-posts':
        post_type = 'video-posts'
        break
      case 'posts':
        post_type = 'posts'
        break
      default:
        post_type = 'posts'
        break
    }

    
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/${post_type}/${props.post.id}`, {
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

onMounted(()=> {
  // auto run favorites check
  in_favorites(props.postType)
  // console.log(in_favorites(props.postType))
})

</script>

<style lang="scss" scoped>

</style>