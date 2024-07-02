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
    <div class="ctr-bubbles w-full h-[26rem] bg-white dark:bg-zinc-800 mt-2 rounded-tr-lg rounted-tl-lg p-4 flex flex-col overflow-y-scroll">
      <div v-if="chat.current_conversation && chat.current_conversation.messages.length" class="w-full">
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
          @keydown="state.send.status.error = false"
          v-model="state.send.body"
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
    send: {
      body: '',
      sender: {
        user: auth.user.id,
      },
      participants: [chat.friends[0]?.id],
      media: null,
      status: {
        delivered: true,
        read: false,
        error: false,
      },
      created: new Date(),
    }
  })

  // Methods
  const sendMessage = () => {
    console.log('Sending message...')
    
    // state.send.body[0].text = ''
    if(state.send.body.length > 0) {
      
      // chat.current_conversation?.messages.push(state.send)
      nextTick(()=> {
        chat.sendMessage(state.send, chat.friends[0])
      })

      // $fetch('/api/chat/actions/send-message', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     send: state.send,
      //     participants: [chat.friends[0].id],
      //     sender: auth?.user
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }, 
      // }).then((res) => {
      //   console.log(res)
      //   //
      // }).catch((err) => {
      //   console.error(err)
      //   state.send.status.error = `Error sending message.`
      // })


    } else {
      state.send.status.error = `Message can't be empty.`
    }
  }
</script>