<template>
  <div class="flex flex-col justify-between rounded-md shadow-xl dark:bg-zinc-800 py-10 px-5">
    <h3 class="text-xl text-neutral-800 dark:text-white px-4">Create a new post</h3>
    <div class="w-full flex flex-col justify-between">
      <input v-model="state.new_post.title" class="w-full p-2 mb-2 rounded-md border border-neutral-300" placeholder="Title" />
      <div class="mb-2">
        <Editor v-model="state.new_post.body" class="w-full rounded-md mb-2" placeholder="Share some wisdom" />
      </div>
      <div class="w-full flex flex-col justify-between overflow-y-scroll">
        <ImageDropZone :post="state.new_post" @pictureUploaded="receive_pictures_upload" />
      </div>
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
      <div class="w-full mt-10">
        <button 
            class="w-full bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" 
            :class="{'bg-amber-300 cursor-not-allowed': !state.valid.title || !state.valid.body || state.processing}"
            
            @click="submitPost" :disabled="!state.valid.title || !state.valid.body || state.processing"
          >Post</button>
      </div>

    
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
    profile: {
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
    new_post: {
      title: '',
      body: '',
      images: {
        data: [],
      },
      external_links: [],
      visible: true, 
      comments: [],
      profile: props.profile,
      tags: [
        {
          tag_name: ''
        }
      ],
      reactions: {
        upvotes: 0,
        downvotes: 0,
        number_of_votes: 0,
        vote: 0
      },
      users_permissions_user: auth.user?.id,
      nsight_id: auth.user?.nsight_id?.nsight_id
    },
    new_comment_thread: {
      post: null,
      comments: []
    },
    new_external_link: {
      text: '',
      link: ''
    },
    adding_link: false,
    adding_pictures: false,
    valid: {
      title: false,
      body: false
    },
    error: null,
    mounted: false,
  })


  // Methods
  const receive_pictures_upload = (data) => {
    state.new_post.images.data = data;
  }
  const addExternalLink = () => {
    const cloned_link = JSON.parse(JSON.stringify(state.new_external_link));
    state.new_post.external_links.push(cloned_link);
    state.new_external_link = {
      text: '',
      link: ''
    }
    state.adding_link = false;
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

  const submitPost = () => {

    // Remove first tag from state.new_psot.tags:
    state.new_post.tags.shift()


    $fetch(`${config.public.NUXT_STRAPI_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(state.new_post)
    }).then((response) => {
      // console.log('response', response);


      // create a new comment_thread for the post:
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/comment-threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          post: response.data,
          comments: []
        })
      }).then((res) => {
        // console.log('new comment thread created', res)

        // update new post with comment thread in databse:
        $fetch(`${config.public.NUXT_STRAPI_URL}/api/posts/${response.data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          },
          body: JSON.stringify({
            comments: res.data
          })
        }).then((res) => {
          // console.log('new comment thread added to post', res)
          // emit

          // yoink from db:
          $fetch(`${config.public.NUXT_STRAPI_URL}/api/posts/${response.data.id}?${qs.stringify({
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
          }).then((res) => {
            // console.log('new post', res)
            // clear out state.new_post:
            state.new_post = {
              title: '',
              body: '',
              pics: [],
              external_links: [],
              visible: true,
              comments: [],
              tags: [{
                tag_name: ''
              }],
              reactions: {
                upvotes: 0,
                downvotes: 0,
                number_of_votes: 0,
                vote: 0
              },
              user_permissions_user: auth.user,
              profile: props.profile.id
            }
            emit('newpost', res.data)
          }).catch((err) => {
            console.log('error getting new post', err)
          })
          
          
        }).catch((err) => {
          console.log('error adding new comment thread to post', err)
        })



      }).catch((err) => {
        console.log('error creating new comment thread', err)
      })

      // emit// export response with emit:
      
      

      nextTick((() => {
        // Reset the form:
      state.new_post = {
        title: '',
        body: '',
        pics: [],
        external_links: [],
        visible: true,
        comments: [],
        reactions: {
          upvotes: 0,
          downvotes: 0,
          number_of_votes: 0,
          vote: 0
        },
        user_permissions_user: auth.user,
        profile: props.profile.id
      }
      }))
    }).catch((error) => {
      console.log(error); 
    })
  }

  
  const validate_title = (title) => {
    return title.length > 0
  }

  // Watchers for title AND body:
  watch([() => state.new_post.title, () => state.new_post.body], ([title, body]) => {
    state.valid.title = validate_title(title);
    state.valid.body = body.length > 0;
  });

</script>

<style lang="scss">

// File input
input[type="file"] {
  display: none;
}

.p-fileupload-file,
.p-fileupload-file-name  {
  color: rgb(37, 36, 36) !important;
}
.p-badge {
  padding: 2px 10px !important;
}
.ql-editor {
  min-height: 14rem;
}
.new_tag {
  input {
    background: transparent !important;
    border-bottom: white 1px solid !important;
    padding: 0 5px !important;

    // Remove annoying border on focus: 
    

    &:focus,
    &:active,
    &:focus-within,
    &:focus-visible {
      border-left: none !important;
      border-right: none !important;
      border-top: none !important;
      outline: none !important;
    }
  }
  input:focus {
    outline: none !important;
  }
}
</style>