<template>
  <div class="flex flex-col lg:flex-row justify-between rounded-md shadow-xl my-4 bg-zinc-100 py-2 px-5 min-h-[700px]">
    <!--  -->
    <div class="w-full lg:w-2/3 h-full flex flex-col">
      <ImageDropZone :post="state.new_post" @pictureUploaded="receive_pictures_upload" :expand="true" />
    </div>
    <div class="w-full lg:w-1/3 h-full flex flex-col p-4 justify-between">
      <h3 class="text-xl text-neutral-800 mb-4">New pictures post</h3>
      <div class="w-full flex flex-col">
        <input v-model="state.new_post.title" class="w-full p-2 mb-2 rounded-md border border-neutral-300" @change="validate()" placeholder="Title" />
        <!-- <small class="text-red-500">Required</small> -->
      </div>
      <div class="w-full flex flex-col">
        <Editor v-model="state.new_post.caption" class="w-full rounded-md mb-2" placeholder="Add a caption.." @change="validate()" />
        <!-- <small class="text-red-500">Required</small> -->
        
      </div>
      <div class="flex-1"></div>
      <div>
        <button 
          class="w-full mt-3  text-white rounded-md p-2 fade-in "
          :class="!state.new_post.title.length || !state.new_post.caption.length || state.processing || !state.new_post.data.images.length ? 'bg-amber-300 cursor-not-allowed opacity-[0.2]' : 'opacity-1 cursor-pointer bg-amber-500'"
          :disabled="!state.new_post.title.length || !state.new_post.caption.length || state.processing || !state.new_post.data.images.length"
          @click="submitPost"
        >Post</button>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script setup>

  // Setup
  const config = useRuntimeConfig()
  import qs from 'qs'
  import Editor from 'primevue/editor';


  // Imports
  import ImageDropZone from './ImageDropzone.vue'

    // props:
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
 
  // Emits
  const emit = defineEmits(['newpost']);

  // Stores
  const auth = authStore()

  // state
  const state = reactive({
    new_post:{
      title: '',
      caption: '',
      data: {
        images: [],
        videos: [],
        links: [],
        location: [],
        tags: [],
        mentions: [],
        hashtags: [],
      },
      visible: true,
      users_permissions_user: props?.user?.id,
      comments: null
    },
    processing: false
  })

  // methods
 const disable = () => {
    return !state.new_post.title || !state.new_post.caption || state.processing || !state.new_post.data.images.length;
  }

 const validate = () => {
    return disable()
  }

  const receive_pictures_upload = (data) => {
    console.log('Received pictures upload:', data);
    state.new_post.data.images = data;
  }

  const submitPost = async () => {
    state.processing = true

    console.log('Submitting new post:', state.new_post);

    await $fetch(`${config.public.NUXT_STRAPI_URL}/api/picture-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(state.new_post)
    }).then(async (response_data) => {
      console.log(response_data)

      // create a new comment thread for the post:
      await $fetch(`${config.public.NUXT_STRAPI_URL}/api/comment-threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          picture_post: response_data.data,
          comments: []
        })
      }).then(async (res) => {
        console.log('new comment thread created', res)

        // update new post with comment thread in databse:
        await $fetch(`${config.public.NUXT_STRAPI_URL}/api/picture-posts/${response_data.data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          },
          body: JSON.stringify({
            comments: res.data
          })
        }).then(async (res) => {
          console.log('new comment thread added to post', res)
          // emit

          // yoink from db:
          await $fetch(`${config.public.NUXT_STRAPI_URL}/api/picture-posts/${response_data.data.id}?${qs.stringify({
           populate: [
            "user_permissions_user",
            "user_permissions_user.nsight_id",
            "user_permissions_user.profile_picture",
            "title",
            "body",
            "pics",
            "images",
            "external_links",
            "reactions",
            "visible",
            "tags",
            "comments",
            "comments.post",
            "comments.comments",
            "comments.comments.body",
            "comments.comments.commenter",
            "comments.comments.commenter.nsight_id",
            "comments.comments.commenter.profile_picture",
            "comments.comments.visible",
            "comments.comments.replies",
            "comments.comments.replies.body",
            "comments.comments.replies.user",
            "comments.comments.replies.user.nsight_id",
            "comments.comments.replies.user.profile_picture"
           ]
          })}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.token}`
            }
          }).then((rez) => {
            // console.log('new post', rez)
            emit('newpost', rez.data)
          }).catch((err) => {
            console.log('error getting new post', err)
          })
          
          
        }).catch((err) => {
          console.log('error adding new comment thread to post', err)
        })



      }).catch((err) => {
        console.log('error creating new comment thread', err)
      })

    }).catch((error) => {
      console.error('Error submitting post:', error);
    }).finally(() => {
      state.processing = false;
    })
  }
</script>

<style lang="scss">
  .ql-editor {
    background: white !important;
  }
</style>