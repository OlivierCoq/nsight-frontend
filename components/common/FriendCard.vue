<template>
  <div class="flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-xl border1 bg-zinc-100 dark:bg-zinc-900">
    <a :href="`/members/${props.member.nsight_id?.nsight_id}`">
      <div class="rounded-full lg:w-16 lg:h-16 w-10 h-10 overflow-hidden flex flex-col justify-center items-center">
        <img :src="props.member.profile_picture?.url ? props.member.profile_picture.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" :alt="props.member.first_name" class="w-[110%]">
      </div>
    </a>
    <div class="flex-1 flex flex-col gap-1 justify-start items-start">
      <a :href="`/members/${props.member?.nsight_id?.nsight_id}`">
        <h4 class="font-semibold text-sm text-neutral-900 dark:text-white">{{ props.member.first_name }} {{ props.member.last_name }}</h4>
      </a>
      <div class="w-full flex flex-row justify-between items-center align-center">
        <font-awesome-icon v-if="state.friends" :icon="['fas', 'user-check']" class="text-green-300 text-md me-2" />
        <font-awesome-icon v-else-if="!state.friends && !state.self && !state.pending_request" :icon="['fas', 'user-plus']" class="text-amber-300 text-md cursor-pointer me-2" @click="send_friend_request" />
        <font-awesome-icon v-else-if="!state.friends && !state.self && state.pending_request" :icon="['fas', 'user-plus']" class="text-blue-300 text-md cursor-pointer me-2" @click="cancel_friend_request" />
      </div>
    </div>
  </div>
</template>

<script setup>


 // setup
 const config = useRuntimeConfig()

  // props
  const props = defineProps({
    member: {
      type: Object,
      required: true
    }
  })

  // state
 const state = reactive({
  friends: null,
  pending_request: null,
  self: null
 })

  // store
  const auth = authStore()
  const chat = chatStore()
  const settings = settingsStore()

  // methods
  const friend_check = () => {
    return auth.user?.friends?.find(friend => friend === props?.member?.nsight_id?.nsight_id)
  }

  const self = () => {
    return props.member.email === auth.user.email
  }

  const sent_request = () => {
    return props.member?.pending_friends?.find((request) => request == auth.user.nsight_id.nsight_id) ? true : false
  }

  const send_friend_request =  () => {
    // 
    //  This is the most insane shit I have ever witnessed. I have no clue why this is happening, and I am too tired to research it:
    // Check to see if props.member.pending_friends is an array or an object:
    // if(Array.isArray(props.member?.pending_friends)) {
    //   props.member.pending_friends = {
    //     data: []
    //   }
    //   nextTick(()=> {
    //     props.member?.pending_friends?.data.push(auth.user.nsight_id.nsight_id)
    //   })
    // } else {
    //   props.member?.pending_friends?.data.push(auth.user.nsight_id.nsight_id)
    // }

    props.member?.pending_friends?.data.push(auth?.user?.nsight_id?.nsight_id)

    nextTick(() => {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${props.member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          pending_friends: {
            data: props.member.pending_friends
          }
        })
      }).then(async (result) => {
        // console.log('Friend request sent', result)
        state.pending_request = true
      }).catch((error) => {
        console.error('Error sending friend request', error)
      })
    })
  }

  const remove_friend = () => {
    // console.log('removing friend')
    const friend_index = auth.user.friends.findIndex(friend => friend === props.member.nsight_id.nsight_id)
    auth.user.friends.splice(friend_index, 1)
    nextTick(() => {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${auth.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          friends: {
            data: auth.user.friends
          }
        })
      }).then(async (result) => {
        // console.log('Friend removed', result)
        state.friends = false
      }).catch((error) => {
        console.error('Error removing friend', error)
      })
    })
  }

  const cancel_friend_request = () => {
    // console.log('cancelling friend request')
    const request_index = props.member.pending_friends.findIndex(request => request === auth.user.nsight_id.nsight_id)
    props.member.pending_friends.splice(request_index, 1)
    nextTick(() => {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${props.member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          pending_friends: {
            data: props.member.pending_friends
          }
        })
      }).then(async (result) => {
        // console.log('Friend request cancelled', result)
        state.pending_request = false
      }).catch((error) => {
        console.error('Error cancelling friend request', error)
      })
    })
  }

  // lifecycle hooks
  onMounted(() => {
    // console.log('mounted')
    state.friends = friend_check()
    state.self = self()
    state.pending_request = sent_request()
  })
</script>

<style lang="scss" scoped>

</style>