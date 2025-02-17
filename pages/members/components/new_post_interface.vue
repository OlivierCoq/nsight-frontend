<template>
  <div class="flex flex-col justify-between rounded-md shadow-xl my-4 bg-zinc-100  py-10 px-5">
    <h3 class="text-xl text-neutral-800 font-bold px-4">Create a new post</h3>
    <div class="w-full flex flex-col">
      <input v-model="state.new_post.title" class="w-full p-2 mb-2 rounded-md border border-neutral-300" placeholder="Title" />
      <Editor v-model="state.new_post.body" class="w-full rounded-md mb-2" placeholder="Share some wisdom" />
      <div class="w-full flex flex-row justify-between mt-[5rem]">
        <div class="w-1/2 flex">
          <button class="w-1/2 bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" @click="state.adding_link = !state.adding_link">
            Add Link 
            <font-awesome-icon :icon="['fas', 'link']" />
          </button>
          <button class="w-1/2 bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" @click="state.adding_pictures = !state.adding_pictures">
            Add Pics 
            <font-awesome-icon :icon="['fas', 'image']" />
          </button>
          
          
        </div>
      </div>
    
      <div v-if="state.adding_link" class="w-full flex flex-col mt-5 fade-in">
        <input v-model="state.new_external_link.text" class="w-full p-2 mb-2 rounded-md border border-neutral-300" placeholder="Link Text" />
        <input v-model="state.new_external_link.link" class="w-full p-2 mb-2 rounded-md border border-neutral-300" placeholder="Link URL" />
        <button class="w-1/2 bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" @click="addExternalLink">Add Link</button>
      </div>

      <div v-else-if="state.adding_pictures">
        <div class="w-full min-h-[200px] border-thin border-zinc-200 p-4">
          <p class="text-neutral-800 font-thin">Upload images</p>
          <!-- <input type="file" multiple /> -->
          <FileUpload name="files" url="/api/upload/images" @upload="uploadPics($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" ref="fileupload">
            <template #empty>
              <span class="text-neutral-800">Drag and drop files to here, and then click the Upload button.</span>
            </template>
          </FileUpload>
        </div>
      </div>

      <div class="w-full mt-10">
        <button 
            class="w-1/2 bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" 
            :class="{'bg-amber-300 cursor-not-allowed': !state.valid.title || !state.valid.body || state.processing}"
            :disabled="state.processing"
            @click="submitPost" :disabled="!state.valid.title || !state.valid.body"
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
  import FileUpload from 'primevue/fileupload';

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
      pics: [],
      images: {
        data: [],
      },
      external_links: [],
      visible: true,
      comments: [],
      profile: props.profile,
      reactions: {
        upvotes: 0,
        downvotes: 0,
        number_of_votes: 0,
        vote: 0
      },
      user: auth.user
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
    processing: false
  })


  // Methods

const fileupload = ref()
const uploadPics = async (event) => {
  const formData = new FormData();

  event.files.forEach((file) => {
    formData.append('files', file); // Ensure correct property
  });

  console.log('Sending to backend:', [...formData.entries()]); // Debugging log
  state.processing = true;

  try {
    const response = await fetch('/api/upload/images', {
      method: 'POST',
      body: formData
    });

    console.log('Upload success:', response);
    if(response.ok) {
      const data = await response.json();
      console.log('Data:', data);
      state.new_post.images = data.data;
      nextTick(() => {
        state.processing = false;
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
};



  const addExternalLink = () => {
    const cloned_link = JSON.parse(JSON.stringify(state.new_external_link));
    state.new_post.external_links.push(cloned_link);
    state.new_external_link = {
      text: '',
      link: ''
    }
    state.adding_link = false;
  }
  const submitPost = () => {
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(state.new_post)
    }).then((response) => {
      console.log('response', response);


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
        console.log('new comment thread created', res)

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
          console.log('new comment thread added to post', res)
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
            console.log('new post', res)
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
</style>