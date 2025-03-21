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

      <div :id="`picture-post-${post.id}`" class="flex flex-col" uk-modal="">
        <div class="uk-modal-dialog uk-modal-body uk-padding-remove post-modal-body bg-zinc-200 rounded-lg min-h-[40rem]">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="w-full h-full flex flex-col lg:flex-row ">
            <div class="w-full lg:w-2/3 flex flex-col justify-center p-4">

              <div class="img-slider relative uk-visible-toggle uk-slideshow" tabindex="-1" uk-slideshow="finite: true; autoplay: false">
                <ul class="uk-slideshow-items min-h-[120%]"> 
                  <li v-for="(image, a) in post.data.images" :key="a" class="w-full h-full overflow-hidden rounded-md uk-active uk-transition-active" tabindex="-1" style="transform: translate3d(0px, 0px, 0px);">
                      <img :src="image.url" alt="" uk-cover="" style="width: auto !important;">
                  </li>
                </ul>
                  <!-- Dots -->
                <ul class="flex justify-center my-5 uk-dotnav uk-slideshow-nav gap-2.5"><li uk-slideshow-item="0" class="uk-active"><a href=""></a></li><li uk-slideshow-item="1"><a href=""></a></li><li uk-slideshow-item="2"><a href=""></a></li></ul>
                  <!-- navigation -->
                <a class="absolute -translate-y-1/2 bg-white rounded-full top-1/2 left-2 grid w-9 h-9 place-items-center shadow dark:bg-dark3 uk-invisible" href="#" uk-slideshow-item="previous"> 
                  <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-2xl"></font-awesome-icon>
                </a>
                <a class="absolute right-2 -translate-y-1/2 bg-white rounded-full top-1/2 grid w-9 h-9 place-items-center shadow dark:bg-dark3" href="#" uk-slideshow-item="next"> 
                  <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-2xl"></font-awesome-icon>
                </a>
              </div>

            </div>
            <div class="w-full lg:w-1/3 p-4 flex flex-col justify-start pt-20">
              <h3 class="text-2xl text-neutral-800 mb-4">{{ post.title }}</h3>
              <div class="text-lg text-neutral-700 mb-10" v-html="post.caption"></div>
              <div class=" ">
                <Reactions :post="post" :user="user" :profilePage="profilePage" :post-type="'picture-posts'" />

                <div v-if="post.tags?.length" class="w-full flex flex-wrap">
                  <a v-for="tag in post.tags" :key="tag.id" class="m-2" :href="`/home?tag=${tag.tag_name}`">
                    <p class="text-neutral-900 cursor-pointer hover:font-bold">#{{ tag.tag_name }}</p>
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

  // Imports
  import CommentThread from '~/components/common/comment_thread.vue'
  import Reactions from '~/components/common/reactions.vue'

  // methods:
  const in_favorites = () => {
  return auth?.user?.favorites?.posts?.indexOf(props.post.id) > -1
}



</script>

<style lang="scss">
  .post-modal-body {
    width: 80vw !important;
  }
</style>