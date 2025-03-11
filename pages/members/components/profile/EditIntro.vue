<template>
  <div class="w-full flex flex-col p-4">
    <h3 class="text-xl text-neutral-800 px-4">Edit your intro</h3>
    <div class="w-full flex flex-col">
      <Editor v-model="state.intro" class="w-full rounded-md mb-2" :placeholder="state.intro" />
      <div class="w-full mt-10">
        <button 
            class="w-1/2 bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1" 
            @click="update_profile"
          >Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>

  // Setup
  const config = useRuntimeConfig()
  import qs from 'qs'
  import Editor from 'primevue/editor';

  // props:
  const props = defineProps({
    profile: {
      type: Object,
      required: true
    }
  })

    // Emits
  const emit = defineEmits(['updateIntro']);

    // Stores
  const auth = authStore()

    // state
  const state = reactive({
    intro: props.profile.intro
  })

  // methods
  const update_profile = async () => {

    $fetch(`${config.public.NUXT_STRAPI_URL}/api/profiles/${props.profile.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        intro: state.intro
      })
    })
    .then((res) => {
      emit('updateIntro', res?.data?.intro)
    })
    .catch(err => console.log(err))

  }

</script>

<style lang="scss" scoped>

</style>