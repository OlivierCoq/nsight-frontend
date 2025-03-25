<template>
  <div v-if="post.visible" class="flex flex-row rounded-lg bg-white dark:bg-zinc-900 shadow-xl  w-full p-10 my-2 fade-in justify-center">
    <a v-if="!profilePage" :href="`/members/${user.nsight_id.nsight_id}` " class="flex flex-col w-1/6 items-center justify-start cursor-arrow">
      <img class="rounded-full w-16 h-16" :src="user.profile_picture.url" alt="profile picture">
      <p class="text-xs m-0 text-neutral-800">{{ user.first_name }}</p>
    </a>
    <!-- <div v-else class="flex-1 flex"></div> -->
    <div class="flex flex-col flex-1">
      <p class="text-xs">{{ post.createdAt }}</p>
      <h3 class="text-xl text-neutral-800 dark:text-zinc-200 font-bold mb-3">{{ post.title }}</h3>


      <div v-if="post.images && post.images.length">
        <div class="relative uk-slider uk-slider-container" tabindex="0" uk-slider="finite: true; autoplay: true">
        
            <ul class="-ml-2 uk-slider-items grid-small" style="transform: translate3d(0px, 0px, 0px);">
                <li v-for="image in post.images" :key="image.asset_id" class="w-1/4 uk-active" tabindex="-1">
                    <img :src="image.secure_url" class="rounded-md w-full h-full object-cover cursor-pointer" :alt="`${image.original_filename}`" :uk-toggle="`target: #modal-${image.asset_id}`">

                    <div class="lg:p-20 p-10 uk-modal" :id="`modal-${image.asset_id}`" uk-modal="">

                      <div class="uk-modal-dialog tt relative mx-auto bg-white rounded-lg shadow-xl w-[400px]">
                        <button class="absolute top-2 right-2 uk-modal-close" type="button" uk-modal-close>
                          <font-awesome-icon :icon="['fas', 'times']" />
                        </button>
                        <img :src="image.secure_url" class="rounded-md w-full h-full object-cover cursor-pointer" :alt="`${image.original_filename}`">
                      </div>
                    </div>

                </li> 
            </ul>
          
            <!-- dotnav -->
            <ul class="flex justify-center my-5 uk-dotnav uk-slider-nav gap-2.5" hidden=""><li uk-slider-item="0" hidden="" class="uk-active"><a href=""></a></li><li uk-slider-item="1" hidden=""><a href=""></a></li><li uk-slider-item="2" hidden=""><a href=""></a></li><li uk-slider-item="3" hidden=""><a href=""></a></li><li uk-slider-item="4" hidden=""><a href=""></a></li></ul>
        
            <!-- navigation -->
            <a class="absolute -translate-y-1/2 bg-white rounded-full top-1/2 left-2 grid w-9 h-9 place-items-center shadow dark:bg-dark3 uk-invisible" href="#" uk-slider-item="previous" hidden="">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <a class="absolute right-2 -translate-y-1/2 bg-white rounded-full top-1/2 grid w-9 h-9 place-items-center shadow dark:bg-dark3 uk-invisible" href="#" uk-slider-item="next" hidden="">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </a>
        
        
        </div>

      </div>

      <p class="text-md text-neutral-800 dark:text-zinc-200" v-html="post.body"></p>

      <div class="w-1/2">
        <Reactions :post="post" :post-type="'posts'" :user="user" :profilePage="profilePage" />
      </div>

      <div v-if="post.tags?.length" class="w-full flex flex-wrap">
        <a v-for="tag in post.tags" :key="tag.id" class="m-2" :href="`/home?tag=${tag.tag_name}`">
          <p class="text-neutral-900 dark:text-amber-400 cursor-pointer hover:font-bold">#{{ tag.tag_name }}</p>
        </a>
      </div>

      <CommentThread :target="post" :user="user" :profilePage="profilePage" />

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


// components
import CommentThread from '~/components/common/comment_thread.vue'
import Reactions from '~/components/common/reactions.vue'

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