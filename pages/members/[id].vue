<template>
  <div
      id="profile"
      class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20"
    >
      <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div class="main__inner">

          <!-- Head -->
          <div id="header_section" class="py-6 relative">
            <div class="flex md:gap-16 gap-4 max-md:flex-col">
              <div class="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
                <div class="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900"> 
                  <img :src="user.profile_picture ? user.profile_picture?.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" alt="" class="w-full h-full absolute object-cover">
                </div>
                  <!-- <button type="button" class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden"> <ion-icon name="camera" class="text-2xl md hydrated" role="img" aria-label="camera"></ion-icon></button> -->
              </div>
              <div class="max-w-2x flex-1">
                <h3 class="md:text-xl text-base font-semibold text-black dark:text-white"> {{ user.first_name }} {{ user.last_name }}</h3>        
                <p class="sm:text-sm text-blue-600 mt-1 font-normal text-xs">{{ user.nsight_id.nsight_id }}</p>                
                <p v-if="profile_data.intro" class="text-sm lg:text-md mt-2 md:font-normal text-white" v-html="profile_data.intro"></p>
                <p class="mt-2 space-x-2 text-gray-500 text-sm hidden" style="margin-top: 11px; "><a href="#" class="inline-block">Travel</a> . <a href="#" class="inline-block">Business</a> . <a href="#" class="inline-block">Technolgy</a>  </p>
                
                <div class="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
                  <div class="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36">
                    <div>
                      <p class="text-zinc-100">Posts</p>
                      <h3 class="sm:text-xl sm:font-bold mt-1 text-neutral-800 dark:text-zinc-100 text-base font-normal">{{ profile_data.posts.length }}</h3>
                    </div>
                    <div>
                      <p class="text-zinc-100">Friends</p>
                      <h3 class="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">{{ user.friends.length }}</h3>
                    </div>
                    <!-- <div>
                        <p>Followers</p>
                        <h3 class="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">8,542</h3>
                    </div> -->
                  </div>
                    <div class="flex items-center gap-3 text-sm">
                      <button type="submit" class="button text-gray-600 bg-slate-200 hidden">Follow</button>
                      <button
                        v-if="user.nsight_id.nsight_id !== auth.user.nsight_id.nsight_id"
                        type="button" class="button bg-amber-100 text-black border border-amber-200">
                        <span class="text-zinc-800">Unfollow</span>
                      </button>
                        <!-- <button type="submit" class="button bg-pink-600 text-neutral-500">Message</button> -->
                          <!-- Reporting etc. -->
                      <div id="profile_action_button" v-if="user.nsight_id.nsight_id !== auth.user.nsight_id.nsight_id"> 
                        <button type="submit" class="rounded-lg bg-zinc-200/60 flex px-2 py-1.5 dark:bg-zinc-800" aria-haspopup="true" aria-expanded="false"> <ion-icon class="text-xl md hydrated" name="ellipsis-horizontal" role="img" aria-label="ellipsis horizontal"></ion-icon></button>
                        <div class="w-[240px] bg-zinc-700 uk-dropdown bg-[#27272a]" style="background: #27272a !important;" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10"> 
                          <nav>
                            <a href="#"> <ion-icon class="text-xl md hydrated" name="pricetags-outline" role="img" aria-label="pricetags outline"></ion-icon> Unfollow </a>  
                            <a href="#"> <ion-icon class="text-xl md hydrated" name="time-outline" role="img" aria-label="time outline"></ion-icon>  Mute story </a>  
                            <a href="#"> <ion-icon class="text-xl md hydrated" name="flag-outline" role="img" aria-label="flag outline"></ion-icon>  Report </a>  
                            <a href="#"> <ion-icon class="text-xl md hydrated" name="share-outline" role="img" aria-label="share outline"></ion-icon> Share profile </a>  
                            <hr>
                            <a href="#" class="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon class="text-xl md hydrated" name="stop-circle-outline" role="img" aria-label="stop circle outline"></ion-icon>  Block </a>  
                          </nav>
                        </div>
                      </div>

                    </div>
                </div>
            
              </div>
            </div>

          </div>

          <!-- Body -->
          <div class="mt-10">

              <!-- Tabs -->
            <div uk-sticky="cls-active: bg-slate-100/60 z-30 backdrop-blur-lg px-4 dark:bg-slate-800/60; start: 500; animation: uk-animation-slide-top" class="uk-sticky" style="">
              <nav class="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
                  <ul class="flex gap-2 justify-center border-t dark:border-slate-700" uk-switcher="connect: #story_tab ; animation: uk-animation-fade, uk-animation-slide-left-medium">
                    <li v-for="(tab, a) in state.tabs" :key="a" :class="tab.active ? 'uk-active active-tab' : ''"> 
                      <a href="#" @click="toggle_active_tab(tab)" class="flex items-center p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white" > 
                        <font-awesome-icon :icon="['fa', tab.icon]" class="text-lg me-2 text-white" />
                        <span class="text-white">{{ tab.label }}  </span>
                      </a> 
                    </li>
                  </ul>
              </nav>
            </div>

            <div class="uk-sticky-placeholder" style="height: 46px; width: 895px; margin: 0px;" hidden=""></div>

            <!-- Tab Content -->
             <div  class="uk-switcher" style="touch-action: pan-y pinch-zoom;">

                <!-- Posts -->
              <div id="tab-posts" class="">

              </div>

             </div>

          </div>

        </div>
      </main>
    </div>
  </template>
<script setup lang="ts">

definePageMeta({
    middleware: ["auth"],
    layout: "inner",
  })


  // Setup
  import qs from 'qs'
  const route = useRoute(), config = useRuntimeConfig()

  // stores
  const auth = authStore()  

    // Use asyncData to fetch data from the server
  const  { data, error } = await useAsyncData('profile', () => $fetch(
    `${config.public.NUXT_STRAPI_URL}/api/profiles?${qs.stringify({
      populate: [
        "users_permissions_user", 
        "users_permissions_user.nsight_id",
        "users_permissions_user.email",
        "users_permissions_user.first_name",
        "users_permissions_user.last_name",
        "users_permissions_user.profile_picture",
        "users_permissions_user.pictures",
        "users_permissions_user.friends",
        "users_permissions_user.users",
        "intro",
        "title",
        "body",
        "posts",
        "posts.title",
        "posts.body",
        "posts.pics",
        "posts.visible",
        "posts.createdAt",
        "posts.updatedAt",
        "posts.profile",
        "posts.tags",
        "posts.reactions",
        "posts.external_links"
      ],
      filters: {
        nsight_id: {
          nsight_id: route.params.id
        }
      }
    },
    { arrayFormat: 'brackets',
      encodeValuesOnly: true
     },)}`
  , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ auth.token }` 
    }
  }))
  
  const profile_data = data.value.data[0]
  const user = data.value.data[0].users_permissions_user
  // console.log(user)

  // Interfaces
  interface Tab {
    value: string;
    label: string;
    pinned: boolean;
    active: boolean;
    icon: string;
  }
  
  // State
  const state = reactive({
    tabs: [
      { value: "posts", label: "Posts", pinned: true, active: true, icon: 'note-sticky' },
      { value: "friends", label: "Friends", pinned: false, active: false, icon: 'user-group' },
      { value: "photos", label: "Photos", pinned: false, active: false, icon: 'photo-film' },
      { value: "videos", label: "Videos", pinned: false, active: false, icon: 'video' },
      // { value: "events", label: "Events", pinned: false, active: false },
      // { value: "groups", label: "Groups", pinned: false, active: false },
      // { value: "marketplace", label: "Marketplace", pinned: false, active: false },
      // { value: "more", label: "More", pinned: false, active: false },
    ],
    active_tab:  { value: "posts", label: "Posts", pinned: true, active: true, icon: 'note-sticky' } as Tab
  })

  // Mounted
  onMounted(() => {
    state.active_tab = state.tabs.find((tab: Tab) => tab.pinned);
  })

  // Methods
  const toggle_active_tab = (tab: any) => {
    state.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;

  }

</script>
<style lang="scss">

  .active-tab {
    border-top: 1px solid #f9f9f9;
  }
</style>