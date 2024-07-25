import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    conversations: [],
    currentConversation: null,
    chat_open: false
  }),
  actions: {
    async fetchConversations() {
      // Fetch conversations from Strapi
      const { data } = await useFetch('/api/conversations')
      this.conversations = data
    },
    async sendMessage(conversationId, message) {
      // Send message via WebSocket
      const ws = useNuxtApp().$ws
      ws.send(JSON.stringify({ conversationId, message }))

      // Save message to Strapi
      await useFetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: { message }
      })
    },
    addMessage(message) {
      const conversation = this.conversations.find(
        (conv) => conv.id === message.conversationId
      )
      if (conversation) {
        conversation.messages.push(message)
      }
    }
  }
})
