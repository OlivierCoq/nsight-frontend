<template>
  <div class="mb-4 shadow-xl bg-zinc-300 dark:bg-zinc-900 rounded-md px-4 lg:px-6 py-6 lg:py-8 flex flex-col fade-in me-4">
    <div class="w-full flex flex-col">
      <a :href="`/members/${user?.nsight_id?.nsight_id}`">
        <div class="flex flex-row">
          <div class="rounded-full lg:w-16 lg:h-16 w-10 h-10 overflow-hidden flex flex-col justify-center items-center">
            <img :src="user?.profile_picture?.url" :alt="user?.first_name" class="w-[110%]" />
          </div>
          <div class="flex flex-col p-4 flex-1 justify-start align-end items-start">
            <p class="text-sm text-zinc-800 dark:text-white m-0">{{ user?.first_name }} {{ user?.last_name }}</p>
            <p class="text-sm text-zinc-800 dark:text-gray-400 m-0">{{ formatDate(post.createdAt) }}</p>
          </div>
        </div>
      </a>
      <div class="flex flex-col flex-1 h-full ms-6">
        <div class="flex flex-row items-center">
          <a :href="`/members/${post.user?.nsight_id?.nsight_id}`" class="text-sm font-bold text-white hover:text-amber-400 mb-2">{{ post.user?.first_name }} {{ post.user?.last_name }}</a>
        </div>
        <p class="text-lg text-neutral-800 dark:text-gray-400 mt-2 mb-4">{{ post.title }}</p>
        <!-- Pictures -->
        <div v-if="post.type === 'picture-post'" class="w-full flex flex-col justify-center align-center items-center mb-4">
          <div v-if="post.data && post?.data?.images && post?.data?.images?.length">
            <div class="relative uk-slider uk-slider-container" tabindex="0" uk-slider="finite: true; autoplay: true">
            
                <ul class="-ml-2 uk-slider-items grid-small" style="transform: translate3d(0px, 0px, 0px);">
                    <li v-for="image in post.data?.images" :key="image.asset_id" class="w-1/4 uk-active" tabindex="-1">
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
        </div>


        <div v-if="post.type === 'post'" class="w-full flex flex-col justify-center align-center items-center mb-4">
          <div v-if="post.images && post?.images?.length">
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
        </div>

        <!--  Body -->
        <div class="text-md text-neutral-800 dark:text-gray-400" v-html="post.body"></div>
        <Reactions :post="post" :post-type="'posts'" :user="user" :profilePage="profilePage" />
        
        <div v-if="post.tags?.length" class="w-full flex flex-wrap">
          <a v-for="tag in post.tags" :key="tag.id" class="m-2" :href="`/home?tag=${tag.tag_name}`">
            <p class="text-amber-500 cursor-pointer hover:font-bold">#{{ tag.tag_name }}</p>
          </a>
        </div>
        <CommentThread :target="post" :user="user" :profilePage="profilePage" :post-type="post.type" />
      </div>
    </div>

  </div>
</template>

<script setup>

  import { format } from 'date-fns';

  // props
  const props = defineProps({
    post: {
      type: Object,
      required: true
    },
    profilePage: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    }
  })

  // components
import CommentThread from '~/components/common/comment_thread.vue'
import Reactions from '~/components/common/reactions.vue'

const formatDate = (dateString) => {
  return format(new Date(dateString), "PPpp");
}

</script>

<style lang="scss">

</style>