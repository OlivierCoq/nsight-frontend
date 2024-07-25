<template>
  <div
    class="messenger fade-in fixed bottom-4 right-4 bg-zinc-300 dark:bg-zinc-800 rounded-lg shadow-xl p-2 cursor-pointer min-h-[30rem] w-[30rem] flex flex-col"
  >
    <div class="top-bar w-full h-[2rem] bg-zinc-100 dark:bg-zinc-900 flex flex-row justify-between items-center p-2 rounded-lg">
      <span v-if="chat.chat_open && chat.current_conversation?.messages.length" class="text-neutral-700 dark:text-white">Chat with <strong>{{ chat.friends[0]?.first_name }}</strong></span>
      <span v-if="chat.chat_open && !chat.current_conversation?.messages.length" class="text-neutral-700 dark:text-white">Start a conversation with <strong>{{  chat.friends[0]?.first_name }}</strong> </span>
      <font-awesome-icon
        :icon="['fas', 'times']"
        class="text-neutral-700 dark:text-white text-2xl cursor-pointer"
        @click="chat.chat_open = false"
      />
    </div>
    <div id="ctr-bubbles" class="w-full h-[26rem] bg-white dark:bg-zinc-800 mt-2 rounded-tr-lg rounted-tl-lg p-4 flex flex-col overflow-y-scroll">
      <div v-if="chat.current_conversation && chat.current_conversation.messages.length" id="bubbles" class="w-full">
        <ChatCompBubble
          v-for="(message, i) in chat.current_conversation?.messages"
          :key="i"
          :message="message"
          :logged-in-user="auth.user"
        />
      </div>
    </div>
    <div class="w-full min-h-[3rem] bg-zinc-400 dark:bg-zinc-900 flex flex-col p-4 rounded-lg mb-3">
      <div class="w-full flex flex-row justify-between items-center">
        <textarea
          class="w-[90%] min-h-[1rem] px-3 py-2 me-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent text-neutral-900 dark:text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Type a message..."
          @keydown="commit"
          v-model="state.staging.body"
        />
        <font-awesome-icon
          :icon="['fas', 'paper-plane']"
          class="text-neutral-700 dark:text-white text-xl cursor-pointer mx-2"
          @click="sendMessage"
        />
        <font-awesome-icon
          :icon="['fas', 'arrows-rotate']"
          class="text-neutral-700 dark:text-white text-sm cursor-pointer mx-2"
          @click="chat.refresh"
        />
      </div>
      <p v-if="state.send.status.error" class="text-xs text-red-500 mt-2">{{ state.send.status.error }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

  // Stores:
  const chat = chatStore()
  const auth = authStore()

  const state = reactive({
    receiver: chat.current_conversation?.receiver,
    staging: {
      body: '',
      media: null
    },
    send: {
      body: '',
      sender: {
        user: auth.user.id,
      },
      participants: [chat.friends[0]?.id, auth.user.id],
      media: null,
      status: {
        delivered: true,
        read: false,
        error: false,
      },
      created: new Date(),
    },
    comp: 0
  })

  // Methods
  const commit = () => {
    state.send.status.error = false
  }
  const clear = () => {
    state.send.body = ''
    state.send.media = null
    state.staging.body = ''
    state.staging.media = null
  }
  const sendMessage = () => {
    console.log('Sending message...')
    state.send.body = state.staging.body 
    state.send.media = state.staging.media
    
    // state.send.body[0].text = ''
    if(state.send.body.length > 0) {
      
      // chat.current_conversation?.messages.push(state.send)
      nextTick(async ()=> {
        await chat.sendMessage(state.send, chat.friends[0])
        state.comp++
        clear()
        await nextTick(()=>{
          setTimeout(()=> {
            scroll()
          }, 100)
        })
        
      })

    } else {
      state.send.status.error = `Message can't be empty.`
    }
  }

  const scroll = () => {
    const parent = document.getElementById('ctr-bubbles')
    parent.scrollTop = parent.scrollHeight
  }

  const bubbles = () => {

    const parent = document.getElementById('ctr-bubbles')
    const child = document.getElementById('bubbles')

    // console.log('before nextTick: ', parent, child)
    // nextTick(()=> {
    //   console.log('after nextTick: ', parent, child)
    // })

    scroll()
    const observer = new MutationObserver((mutations)=>{
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const isScrolledToBottom = parent.scrollHeight - parent?.clientHeight <= parent.scrollTop + 1
          if(isScrolledToBottom) {
            scroll()
          }
        }
      })
    })

    const config = { childList: true, subtree: true }
    observer.observe(child, config)

    // Initial scroll
    scroll()
  }

  onMounted(()=> {
    nextTick(()=> {
      bubbles()
    })
  })
</script>