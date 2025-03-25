<template>
  <div class="flex flex-col lg:flex-row justify-between rounded-md shadow-xl bg-zinc-100 dark:bg-zinc-800 py-2 px-5 min-h-[700px]">
    <!--  -->
    <div class="w-full lg:w-2/3 h-full flex flex-col">
      <ImageDropZone :post="state.new_post" @pictureUploaded="receive_pictures_upload" :expand="true" />
    </div>
    <div class="w-full lg:w-1/3 h-full flex flex-col p-4 justify-between">
      <h3 class="text-xl text-neutral-800 dark:text-zinc-200 mb-4">New pictures post</h3>
      <div class="w-full flex flex-col">
        <input v-model="state.new_post.title" class="w-full p-2 mb-2 rounded-md border border-neutral-300" @change="validate()" placeholder="Title" />
        <!-- <small class="text-red-500">Required</small> -->
      </div>
      <div class="w-full flex flex-col">
        <Editor v-model="state.new_post.caption" class="w-full rounded-md mb-2" placeholder="Add a caption.." @change="validate()" />
        <!-- <small class="text-red-500">Required</small> -->
        <div class="w-full flex flex-col p-2">
          <p class="text-zinc-500 text-md mb-2">Tags</p>
          <div class="w-full flex flex-wrap">
            <div 
              class="tag_pill new_tag rounded-full flex flex-row items-center bg-amber-500 px-4 py-2 min-w-[100px] m-1 shadow-lg"
              :class="state.new_post.tags[0]?.tag_name.length ? 'opacity-1' : 'opacity-[0.7]'"
            >
              <span class="text-white">#</span>
              <input type="text" v-model="state.new_post.tags[0].tag_name" class="bg-transparent text-white w-full rounded-full" placeholder="Add a tag" @keydown.enter="add_tag(state.new_post.tags[0])" />
              <button @click="add_tag(state.new_post.tags[0])" :disabled="!state.new_post.tags[0].tag_name.length">
                <font-awesome-icon :icon="['fa', 'plus']" class="text-white ms-3 mt-1"  />
              </button>
            </div>
              <div v-for="(tag, a) in state.new_post.tags" :key="a" >
                <div v-if="a > 0" class="tag_pill rounded-full flex flex-row items-center bg-amber-500 px-4 py-2 min-w-[100px] m-1 shadow-lg">
                  <div class="flex-1">
                    <p class="text-white m-0">#{{ tag.tag_name }}</p>
                  </div>
                  <font-awesome-icon :icon="['fa', 'times']" class="text-white ms-3 mt-1 cursor-pointer" @click="remove_tag(a)" />
                </div>
              </div>
            </div>
          </div>
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
      tags: [
        {
          tag_name: ''
        }
      ],
      visible: true,
      users_permissions_user: props?.user?.id,
      nsight_id: props?.user?.nsight_id?.nsight_id,
      comments: null,
      reactions: {
        upvotes: 0,
        downvotes: 0
      }
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


  const add_tag = (tag) => {
    // add to beginning of array:
    state.new_post.tags.unshift({
      tag_name: tag.tag_name
    })
    nextTick(() => {
      state.new_post.tags[0].tag_name = ''
    })
  }

  const remove_tag = (index) => {
    state.new_post.tags.splice(index, 1)
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

      // clear out state.new_post:
      state.new_post = {
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
        tags: [
          {
            tag_name: ''
          }
        ],
        visible: true,
        users_permissions_user: props?.user?.id,
        nsight_id: props?.user?.nsight_id?.nsight_id,
        comments: null,
        reactions: {
          upvotes: 0,
          downvotes: 0
        }
      }

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