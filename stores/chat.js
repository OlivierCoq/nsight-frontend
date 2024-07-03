import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ofetch } from "ofetch";
import qs from "qs";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const runtimeConfig = useRuntimeConfig();

// Import auth store:
import { authStore } from "./auth";



export const chatStore = defineStore({
  id: "chatStore",
  state: () => {
    return {
      conversations: [],
      chat_open: false,
      current_conversation: null,
      friends: [],
    };
  },
  actions: {
    async chat_with_user(user) {
      console.log('opening new chat.', user.chats.data.length)

      const auth = authStore();

      const conversation = {
        id: Math.floor(Math.random() * 1000),
        participants: [user.id, auth.user.id],
        messages: [],
      }

      if(!this.friends.length) { this.friends.push(user); }
      if(!user.chats?.data.length) {
        // user.chats.data.push()
        console.log("User has no chats");
        // initiate()
        this.current_conversation = conversation
        user.chats.data.push(conversation)
        this.update_participants(conversation)
      } else {
        
        this.current_conversation = user.chats.data.find((chat) => {
          return chat.participants.includes(auth.user.id) && chat.participants.includes(user.id)
        })
        this.update_participants(conversation)
        console.log('User has chats!') 
      }

      this.chat_open = true;
    },
    update_user(user) {
      const auth = authStore();
      $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(user)
      }).then((response) => {
        console.log("User updated: ", response);
      }).catch((error) => {
        console.error('Error updating user: ', error);
      });
    },
    async update_participants(conversation) {

      const auth = authStore();

      this.current_conversation.participants.forEach(async (participant_id) => {
          
      await $fetch(`${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${participant_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }).then(async (friend) => {
          console.log("Member: ", friend.username);

          const existing_conversation = friend.chats.data.find(conv => conv.id == this.current_conversation.id)
          if(existing_conversation) {
            
            friend.chats.data.splice(friend.chats.data.indexOf(existing_conversation), 1, this.current_conversation)
            console.log('conversations exists. Replacing: ', friend.chats.data)
            nextTick(()=> {
              this.update_user(friend)
            })
          } else {
            friend.chats.data.push(this.current_conversation)
            this.update_user(friend)
          }
          
        }).catch((error) => {
          console.error('Error updating user: ', error);
        })
          
      })  
    },
    async sendMessage(message, user) {

      const auth = authStore();
      // const conversation = 
      // check user.chats.data for conversation whose particupants include the current user and the selected user:
      const conversation = user.chats.data.find((chat) => {
        // return chat.participants.includes(auth.user.id) && chat.participants.includes(user.id)
        return chat.id == this.current_conversation.id
      })

      
      // await conversation.messages.push(message)
      $fetch('/api/chat/hooks/relay', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
        body: JSON.stringify(message)
      }).then(async(res)=>{
        console.log('from relay', res)
        await conversation.messages.push(res.data)
      }).then(async()=> {
        await this.update_participants(conversation)
        await $fetch(`/api/messaging/update-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${auth.token}`,
          },
          body: JSON.stringify(conversation)
        })
      })
    },
    async refresh() {
      const auth = authStore();
      const headers_obj = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${auth.token}`,
      }

      const custom_data = await $fetch(
          `${runtimeConfig.public.NUXT_STRAPI_URL}/api/users/${auth.user.id}?${qs.stringify({
            populate: [
              'username',
              'email',
              'first_name',
              'last_name',
              'favorites',
              'cart',
              'addresses',
              'selected_addresses',
              'selected_payment_method',
              'payment_methods',
              'chats',
              'preferences',
              'nsight_id',
              'friends',
              'friends.nsight_id',
              'friends.friends',
              'friends.chats',
              'friends.profile_picture',
              'users.friends',
              'phone_number',
              'square_id',
              'orders',
              'returns',
              'cancelled_orders',
              'profile_picture',
              'pictures',
              'cart_obj'
            ]
          })}`,
          {
            method: "GET",
            headers: headers_obj
          }
        ).then((full_user_data) => {        
          
          console.log('Full user data: ', full_user_data);
        }).catch((error) => {
          console.error('Error getting messages: ', error);
        })

     
    }
  },
  getters: {},
  persist: {
    enabled: true,
  },
});
