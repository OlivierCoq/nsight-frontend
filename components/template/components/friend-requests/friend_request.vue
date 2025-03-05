<template>
  <div class="m-1 shadow-xl w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl p-2 flex flex-col fade-in">
    <div class="flex flex-row w-full">
      <div class="w-1/4">
        <div class="h-[50px] w-[50px] rounded-full overflow-hidden flex flex-col justify-center">
            <a :href="`/members/${user.nsight_id.nsight_id}`">
            <img
              :src="user.profile_picture ? user.profile_picture.url : '/assets/images/mock_data/placeholder_pfp.jpeg'"
              :alt="`${user.first_name} ${user.last_name}`"
              class="w-[110%]"
            />
            </a>
        </div>
      </div>
      <div class="w-3/4 flex flex-col flex-wrap">
        <div class="text-sm text-neutral-900 dark:text-white mt-2 p-0 flex flex-wrap">
          <a :href="`/members/${user.nsight_id.nsight_id}`" class="text-amber-500">
            <strong>{{ user.first_name }} {{ user.last_name }}</strong>
          </a> sent you a friend request!
        </div>
        <div class="flex flex-row justify-between items-center align-center mt-4 mb-2 me-2">
          <button
            @click="acceptFriendRequest(user.nsight_id.nsight_id)"
            class="button text-white bg-amber-400 hover:bg-amber-500 mx-1"
          >
            Accept
          </button>
          <button
            @click="declineFriendRequest(user.nsight_id.nsight_id)"
            class="button text-white mx-1"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  // Setup
  const config = useRuntimeConfig();
  import qs from "qs";

// Stores
const auth = authStore()
const prodStore = productsStore();
const settings = settingsStore();

  // Props
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  // state
  const state = reactive({
  })

  // methods
const acceptFriendRequest = (nsight_id: string) => {
  console.log('accepting friend request', nsight_id);

  props.user.friends.push(auth?.user?.nsight_id.nsight_id);
  props.user.pending_friends = props.user.pending_friends.filter((request: string) => request !== auth?.user?.nsight_id.nsight_id);

  // update database:
  if(props?.user?.friends?.data?.includes(auth?.user?.nsight_id.nsight_id)){
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${props.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        friends: props.user.friends,
      })
    }).then(async (friend_request_result) => {
      console.log('friend_request_result', friend_request_result);
    }).catch((err) => {
      console.error('error accepting friend request', err);
    });
  }

  // Add props.user to auth.user.friends
  auth.user?.friends?.data?.push(props.user.nsight_id.nsight_id);
  auth.user.pending_friends = auth.user?.pending_friends?.filter((request: string) => request !== props.user.nsight_id.nsight_id);
  nextTick(async ()=> {
    if(auth.user?.friends?.data?.includes(props.user?.nsight_id.nsight_id) && !auth.user.pending_friends.includes(props.user.nsight_id.nsight_id)){ 
      auth.updateUser();

      const toast_obj = {
        title: 'Friend Request Accepted!',
        message: `You are now friends with ${props.user.first_name} ${props.user.last_name}.`,
        type: 'success'
      }
      emit('update', toast_obj);
    }

  })
};

  const declineFriendRequest = async (nsight_id: string) => {
    console.log('declining friend request', nsight_id)
    auth.user.pending_friends = auth.user.pending_friends.filter((request: string) => request !== props.user.nsight_id.nsight_id);
    auth.updateUser();

    emit('update', false)
  }

  // Emits
  const emit = defineEmits(['update']);

  // lifecycles

</script>

<style lang="scss" scoped>
.p-toast {
  background-color: #f6e232 !important;
  color: #6a6464 !important;
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 2rem 0 2rem;
  border-radius: 5px;
}
</style>