<template>
  <div class="mb-2 shadow-xl bg-zinc-900 rounded-md px-4 lg:px-10 py-6 lg:py-8 flex flex-col">
    <div class="w-full flex flex-row">
      <a :href="`/members/${post.user.nsight_id.nsight_id}`">
        <div class="rounded-full lg:w-16 lg:h-16 w-10 h-10 overflow-hidden flex flex-col justify-center items-center">
          <img :src="props.post?.user?.profile_picture?.url" :alt="post?.user?.first_name" class="w-[110%]" />
        </div>
      </a>
      <div class="flex flex-col flex-1 h-full ms-6">
        <div class="flex flex-row items-center">
          <a :href="`/members/${post.user.nsight_id.nsight_id}`" class="text-sm font-bold text-white hover:text-amber-400 mb-2">{{ post.user.first_name }} {{ post.user.last_name }}</a>
        </div>
        <p class="text-2xl text-gray-400 mt-2 mb-4">{{ post.title }}</p>
        <div class="text-lg text-gray-400" v-html="post.body"></div>
        <Reactions :post="post" :post-type="'posts'" :user="user" :profilePage="profilePage" />
        <CommentThread :target="post" :user="user" :profilePage="profilePage" />
      </div>
    </div>

  </div>
</template>

<script setup>

  // props
  const props = defineProps({
    post: {
      type: Object,
      required: true
    }
  })

  // components
import CommentThread from '~/components/common/comment_thread.vue'
import Reactions from '~/components/common/reactions.vue'

</script>

<style lang="scss">

</style>