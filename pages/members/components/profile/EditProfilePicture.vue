<template>
  <div class="flex flex-col items-center p-2">
    <ImageDropZone @pictureUploaded="updateProfilePicture" :profile="profile" :post="post"/>
    <div class="w-full pt-2">
      <button 
        class="w-full bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" 
        :class="{'opacity-50': !state.pic}"
        :disabled="!state.pic"
        @click="updateProfile"
      >Save</button>
    </div>
  </div>
</template>

<script setup>
  // Setup
  const config = useRuntimeConfig()
  import qs from 'qs'
  import Editor from 'primevue/editor';

  import ImageDropZone from '../ImageDropzone.vue'

  // props:
  const props = defineProps({
    profile: {
      type: Object,
      required: true
    },
    post: {
      type: Object, 
      required: true
    }
  })

    // Emits
  const emit = defineEmits(['updateProfilePic']);

    // Stores
  const auth = authStore()

    // state
  const state = reactive({
    pic: null || false
  })

  // methods
  const updateProfilePicture = async (data) => {
    state.pic = data[0]
    
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${auth?.user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        profile_picture: state.pic
      })
    }).then((res) => {
        console.log('Profile picture updated:', res)
      })
      .catch(err => console.log(err))
  }
  const updateProfile = () => {
    emit('updateProfilePic', state.pic)
  }
</script>

<style lang="scss" scoped>

</style>q