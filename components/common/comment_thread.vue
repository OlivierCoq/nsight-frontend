<template>
  <div class="pb-10"> 
    <div class="ctr-new-comment w-full mt-5 flex flex-row">
      <textarea v-model="state.new_comment.body" class="w-full p-2 rounded-md border border-neutral-300" placeholder="Add a comment..."></textarea>
      <button 
        class="w-1/6 bg-amber-500 hover:bg-amber-600 h-[40px] text-white rounded-md p-2 my-[1px] ms-1" 
        :disabled="!state.new_comment.body.length"
        :class="!state.new_comment.body.length ? 'cursor-not-allowed' : 'cursor-pointer'"
        @click="add_new_comment"
      >Post</button>
    </div>
    <div v-show="state.show_comments" class="ctr-comments flex flex-col mt-5 fade-in">
      <ul class="relative space-y-3 uk-accordion" uk-accordion="active: 0">
        <li class="uk-open">
          <a :id="`accordion-handler-${target.id}`" class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-zinc-900 group uk-accordion-title" href="#">
              comment threads ({{ state.comment_thread.comments.length }})
              <!-- <svg class="duration-200 group-aria-expanded:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> -->
          </a>
          <div class="p-2 dark:text-white/80 uk-accordion-content h-[25vh] overflow-y-auto pb-10">
            <ul class="space-y-3 mb-10">
              <li v-for="comment in state.comment_thread.comments" :key="comment.id" class="flex flex-row px-4 pt-4 pb-6 shadow-md bg-zinc-100 dark:bg-neutral-400 rounded-md">
                <a :href="`/members/${comment.commenter?.nsight_id?.nsight_id}`" class="flex flex-col w-1/6 items-center justify-start cursor-arrow">
                  <img 
                    class="rounded-full w-12 h-12"
                    :src="comment.commenter.profile_picture ? comment.commenter.profile_picture.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" alt="profile picture"
                  >
                  <p class="text-xs m-0 text-neutral-800">{{ comment.commenter.first_name }}</p>
                </a>
                <div class="flex-1 flex flex-col justify-start items-start align-start ps-4">
                  <p class="text-xs">{{ comment.createdAt }}</p>
                  <p class="text-md text-neutral-800 m-0" v-html="comment.body"></p>
                  <!-- thin divider: -->
                  <div class="w-3/5 h-[1px] bg-zinc-800 opacity-[0.2] mt-5"></div>
                  <!-- Replies -->
                   <div class="w-full flex flex-row">
                    <p class="text-xs mx-0 my-1 text-neutral-800">replies ({{ comment.replies?.length }})</p>
                  </div>
                  <div class="w-full flex flex-col">
                    <div v-for="reply in comment.replies" :key="`${reply.id}-${comment.id}`" class="flex flex-row my-4">
                      <a :href="`/members/${reply.user?.nsight_id?.nsight_id}`" class="flex flex-col w-[40px] items-center justify-start cursor-arrow me-3">
                        <img 
                          class="rounded-full w-8 h-8"
                          :src="reply?.user?.profile_picture ? reply?.user?.profile_picture.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" alt="profile picture"
                        >
                        <p class="text-xs m-0 text-neutral-800">{{ reply?.user?.first_name }}</p>
                      </a>
                      <div class="flex-1 flex flex-col justify-start items-start align-start">
                        <p class="text-xs">{{ reply.createdAt }}</p>
                        <p class="text-md text-neutral-800 m-0" v-html="reply.body"></p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="ctr-reply mt-2 flex flex-row w-full">
                    <textarea v-if="comment.new_reply" class="w-full p-2 rounded-md border border-neutral-300 bg-transparent" placeholder="Add a reply..." v-model="comment.new_reply.body"></textarea>
                    <button class="bg-amber-500 hover:bg-amber-600 h-[40px] text-white rounded-md p-2 my-[1px] ms-1" @click="add_new_reply(comment)">Reply</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script setup>

// setup 
const config = useRuntimeConfig()

// Props
const props = defineProps({
  target: {
    type: Object, // Post, Video, Picture, etc.
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  profilePage: {
    type: Boolean,
    default: false
  },
  postType: {
    type: String,
    required: false
  }
})

// Stores
const auth = authStore()

// State
const state = reactive({
  comment_thread: props.target.comments,
  show_comments: false,
  new_comment: {
    body: '',
    post: props.target.id,
    visible: true,
    commenter: auth.user?.id
  }
})

// Methods
const add_new_comment = async () => {

  const postObj = {
    id: props.target.comments.id,
    
    comments: [
      ...props.target.comments.comments,
      {
        body: state.new_comment.body,
        commenter: auth.user
      }
    ]
    
  }
  if(props.postType === 'picture-post') {
    postObj['picture-post'] = props.target.id
  } else {
    postObj['post'] = props.target.id
  }
  
  // PUT REQUEST:
  if(state.new_comment.body.length) {
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/comment-threads/${postObj.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(postObj)
    }).then((res) => {
      // console.log('new comment added', res)

      // update the local state
      state.comment_thread.comments.push({
          body: state.new_comment.body,
          commenter: auth.user
        })

        state.comment_thread.comments.forEach((comment) => {

            comment['new_reply'] = {
              body: '',
              user: auth.user
            }
          
        })

      nextTick(()=> {
        state.show_comments = true
        state.new_comment.body = ''

        const accordion_handler = document.getElementById(`accordion-handler-${props.target.id}`)
          // automatically click the accordion handler
          nextTick(() => {
            accordion_handler.click()
            state.show_comments = true
          })

      })

    }).catch((err) => {
      console.log('error adding new comment', err)
    })
  }
}

const add_new_reply = async (comment) => {

  
  

  if(comment.new_reply.body.length) {
    comment?.replies?.push(comment.new_reply)

    // console.log('comment', comment)
    // console.log('comment.new_reply', comment.new_reply)



    nextTick(() => {

      const postObj = {
        id: props.target.comments.id,
        post: props.target.id,
        comments: state.comment_thread.comments
      }

      // console.log('postObj', postObj)

      // PUT REQUEST:
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/comment-threads/${postObj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(postObj)
      }).then((res) => {
        // console.log('new reply added', res)
        // update the local state
        comment.new_reply = {
          body: '',
          user: auth.user
        }
      }).catch((err) => {
        console.log('error adding new reply', err)
      })


    })
  }
}


// Lifecycle
onMounted(() => {


  props.target.comments.comments.forEach((comment) => {

      comment['new_reply'] = {
        body: '',
        user: auth.user
      }
    
  })
 
  const accordion_handler = document?.getElementById(`accordion-handler-${props.target.id}`)
  // automatically click the accordion handler
  state.show_comments = true
  nextTick(() => {
    // accordion_handler.click()
  })

  

})


</script>

<style lang="scss" scoped>

</style>