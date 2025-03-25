<template>
  <div 
    v-if="post.visible"
    class="picture-post w-full h-[380px] bg-cover bg-center rounded-lg shadow-xl relative" 
    :style="{ backgroundImage: `url(${post.data.images[0]?.url})` }"
  >
    <div class="absolute inset-0 hover:bg-black/50 bg-opacity-50 rounded-lg cursor-pointer flex flex-col justify-center align-center items-center" :uk-toggle="`target: #picture-post-${post.id}`">

      <div class="w-full flex flex-row p-2 justify-center items-center">
        <div class="flex flex-col mx-2">
          <font-awesome-icon :icon="['fas', 'heart']" class="text-3xl text-zinc-100"></font-awesome-icon>
          <p class="text-sm text-zinc-100 m-0 text-center">{{ post.reactions.upvotes }}</p>
        </div>
        <div class="flex flex-col mx-2">
          <font-awesome-icon :icon="['fas', 'comment']" class="text-3xl text-zinc-100"></font-awesome-icon>
          <p class="text-sm text-zinc-100 m-0 text-center">{{ post.comments.comments.length }}</p>
        </div>
      </div>

      <div :id="`picture-post-${post.id}`" class="flex flex-col" :class="settings.dark_mode ? 'dark' : ''" uk-modal="">
        <div class="uk-modal-body uk-padding-remove post-modal-body bg-white dark:bg-zinc-800 rounded-lg min-h-[40rem]">
          
          <div class="w-full h-full flex flex-col lg:flex-row ">
            <div 
              v-if="post"
              class="w-full lg:w-2/3 flex flex-col justify-center p-4 relative z-10 bg-cover bg-center rounded-lg"
              :style="{ backgroundImage: `url(${state.post.main_img})` }"
            >
              <div v-if="post.data?.images?.length > 1" class="min-h-[40px] absolute z-20 bottom-[1rem] right-[1rem] flex flex-row">
                <div 
                  v-for="(image, a) in post.data?.images" :key="a" 
                  class="w-[110px] h-[140px] bg-zinc-400 bg-cover bg-center rounded-lg me-2 shadow-xl cursor-pointer transition-all duration-300 opacity-70 hover:opacity-100"
                  @click="state.post.main_img = image.url"
                  :style="{ backgroundImage: `url(${image.url})` }"
                ></div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 p-4 flex flex-col justify-start pt-20 relative">
              <button class="absolute top-[1rem] right-[1rem] uk-modal-close-default" type="button" uk-close></button>
              <h3 class="text-2xl text-neutral-800 dark:text-zinc-200 mb-4">{{ post.title }}</h3>
              <div class="text-lg text-neutral-700 dark:text-zinc-200 mb-10" v-html="post.caption"></div>
              <div class=" ">
                <Reactions :post="post" :user="user" :profilePage="profilePage" :post-type="'picture-posts'" />

                <div v-if="post.tags?.length" class="w-full flex flex-wrap">
                  <a v-for="tag in post.tags" :key="tag.id" class="m-2" :href="`/home?tag=${tag.tag_name}`">
                    <p class="text-neutral-900 dark:text-amber-400 hover:text-amber-500 cursor-pointer hover:font-bold">#{{ tag.tag_name }}</p>
                  </a>
                </div>

                <CommentThread :target="post" :post-type="'picture-post'" :user="user" :profilePage="profilePage" />
              </div>
            </div>
          
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

  const settings = settingsStore()

  // Props
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
    }
  })

  const state = reactive({
    post: props.post
  })

  // Imports
  import CommentThread from '~/components/common/comment_thread.vue'
  import Reactions from '~/components/common/reactions.vue'

  onMounted(() => {
    state.post['main_img'] = state.post.data.images[0]?.url
  })

</script>

<style lang="scss">
  .post-modal-body {
    width: 70vw !important;
  }
</style>