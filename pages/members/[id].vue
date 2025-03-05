<template>
  <div
      id="profile"
      class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-20 relative"
    >
      <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div class="main__inner">

          <!-- Head -->
          <div id="header_section" class="py-6 relative">
            <div class="flex md:gap-16 gap-4 max-md:flex-col">
              <div class="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
                <div class="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900"> 
                  <img :src="user?.profile_picture ? user?.profile_picture?.url : '/assets/images/mock_data/placeholder_pfp.jpeg'" alt="" class="w-full h-full absolute object-cover">
                </div>
                  <!-- <button type="button" class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden"> <ion-icon name="camera" class="text-2xl md hydrated" role="img" aria-label="camera"></ion-icon></button> -->
              </div>
              <div class="max-w-2x flex-1">
                <h3 class="md:text-xl text-base font-semibold text-black dark:text-white"> {{ user?.first_name }} {{ user?.last_name }}</h3>        
                <p class="sm:text-sm text-blue-600 mt-1 font-normal text-xs">{{ user?.nsight_id?.nsight_id }}</p>                
                <p v-if="profile_data?.intro" class="text-sm lg:text-md mt-2 md:font-normal text-white" v-html="profile_data?.intro"></p>
                <p class="mt-2 space-x-2 text-gray-500 text-sm hidden" style="margin-top: 11px; "><a href="#" class="inline-block">Travel</a> . <a href="#" class="inline-block">Business</a> . <a href="#" class="inline-block">Technolgy</a>  </p>
                
                <div class="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
                  <div class="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36">
                    <div>
                      <p class="text-zinc-100">Posts</p>
                      <h3 v-if="profile_data?.posts" class="sm:text-xl sm:font-bold mt-1 text-neutral-800 dark:text-zinc-100 text-base font-normal">{{ profile_data?.posts?.length }}</h3>
                    </div>
                    <div>
                      <p class="text-zinc-100">Friends</p>
                      <h3 class="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">{{ user?.friends?.length }}</h3>
                    </div>
                    <div v-if="profile_data && (profile_data?.picture_posts?.length)">
                      <p class="text-zinc-100">Pictures</p>
                      <h3 class="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">{{ profile_data?.picture_posts?.length }}</h3>
                    </div>
                    <!-- <div>
                        <p>Followers</p>
                        <h3 class="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">8,542</h3>
                    </div> -->
                  </div>
                    <div class="flex items-center gap-3 text-sm">
                      <button
                        v-if="state.friends"
                        type="button" class="button bg-green-500 text-black border border-green-800"
                        @click="remove_friend"  
                      >
                        <span class="text-zinc-100">Friends</span>
                        <font-awesome-icon :icon="['fas', 'user-check']" class="text-md text-white ms-2" />
                      </button>
                      <button
                        v-else-if="!state.friends && !state.self && !state.pending_request"
                        type="button" class="button bg-amber-500 text-black border border-amber-800"
                        @click="send_friend_request"
                      >
                        <span class="text-zinc-100">Add Friend</span>
                        <font-awesome-icon :icon="['fas', 'user-plus']" class="text-md text-white ms-2" />
                      </button>
                      <button
                        v-else-if="!state.friends && !state.self && state.pending_request"
                        type="button" class="button bg-blue-500 text-black border border-blue-800"
                        @click="cancel_friend_request"  
                      >
                        <span class="text-zinc-100">Friend Request sent</span>
                        <font-awesome-icon :icon="['fas', 'user-check']" class="text-md text-white ms-2" />
                      </button>
                        <!-- <button type="submit" class="button bg-pink-600 text-neutral-500">Message</button> -->
                          <!-- Reporting etc. -->
                      <div id="profile_action_button" v-if="user?.nsight_id?.nsight_id !== auth?.user?.nsight_id?.nsight_id"> 
                        <button type="submit" class="rounded-lg bg-zinc-200/60 flex px-2 py-1.5 dark:bg-zinc-800" aria-haspopup="true" aria-expanded="false"> 
                          <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="text-lg text-white" />
                      </button>
                        <div class="w-[240px] bg-zinc-700 uk-dropdown bg-[#27272a]" style="background: #27272a !important;" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10"> 
                          <nav>
                            <a href="#"> <font-awesome-icon :icon="['fas', 'user-minus']" /> Unfollow </a>  
                            <a href="#"> <font-awesome-icon :icon="['fas', 'bell-slash']" />  Mute story </a>  
                            <a href="#"> <font-awesome-icon :icon="['fas', 'flag']" />  Report </a>  
                            <a href="#"> <font-awesome-icon :icon="['fas', 'share-nodes']" /> Share profile </a>  
                            <hr>
                            <a href="#" class="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> 
                              <font-awesome-icon :icon="['fas', 'ban']" />  Block </a>  
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
              <div v-if="state.active_tab.value === 'posts'" id="tab-posts" :class="[(state.active_tab.value === 'posts' ? 'uk-active' : '')]" class="w-full h-[60vh] fade-in flex flex-col gap-4">
                <div class="w-full h-full overflow-y-scroll flex flex-col relative">
                  <NewPostInterface v-if="route.params.id === auth.user.nsight_id.nsight_id" :profile="profile_data" @newpost="add_new_post" />
                  <div v-if="profile_data.posts" >
                    <ProfilePost v-for="post in profile_data.posts" :key="post.id" :post="post" :user="user" :profile-page="true" />
                  </div>
                </div>
              </div>

              <!-- Friends -->
              <div v-if="state.active_tab.value === 'friends'" id="tab-friends" :class="[(state.active_tab.value === 'friends' ? 'uk-active' : '')]" class="w-full h-[
                60vh] fade-in flex flex-col gap-4">
                <div class="w-full h-full overflow-y-scroll flex flex-col relative">
                  <div class="grid sm:grid-cols-3 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
                    <FriendCard v-show="a <= state.tabs[1].feed_num" v-for="(friend, a) in profile_friends" :key="a" :member="friend" />
                  </div>
                  <div class="flex justify-center my-10">
                    <button
                        v-if="
                        user.friends.length > 14 &&
                        state.tabs[1].feed_num < user.friends.length
                        "
                        type="button"
                        class="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-zinc-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition duration-200 ease-in-out"
                        @click="state.tabs[1].feed_num += 15"
                        >
                      Load more...
                    </button>
                  </div>
                </div>
              </div>  

              <!-- Photos -->
              <div v-if="state.active_tab.value === 'photos'" id="tab-photos" :class="[(state.active_tab.value === 'photos' ? 'uk-active' : '')]" class="w-full h-[60vh] fade-in flex flex-col gap-4">
                <div class="w-full h-full overflow-y-scroll flex flex-col relative">
                  <div v-if="(route.params.id === auth.user.nsight_id.nsight_id) && auth.user" class="w-full flex flex-row p-2 justify-center align-center">
                    <button 
                      class="bg-amber-500 text-white rounded-md p-2 my-[1px] ms-1"
                      uk-toggle="target: #new_picture_post_modal"
                    >
                      New Post <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>

                    <div id="new_picture_post_modal" class="flex flex-col" uk-modal="">
                      <!-- close button uk  large modal-->
                      <div class="uk-modal-dialog uk-modal-body uk-padding-remove new-post-modal">
                        <button id="close_new_picture_post" class="uk-modal-close-default" type="button" uk-close></button>
                        <NewPicturePostInterface :key="state.comp" :user="auth.user" @newpost="update_picture_posts" /> 
                      </div>
                      
                    </div>

                  </div>
                  <!-- -->
                  <div v-if="profile_data.picture_posts" class="grid grid-cols-3 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
                    <PicturePost v-for="(post, a) in profile_data.picture_posts" :key="a" :post="post" :user="user" :profile-page="true" />
                  </div>
                </div>
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

  // components
  import ProfilePost from './components/profile_post.vue'
  import NewPostInterface from './components/new_post_interface.vue'
  import FriendCard from '~/components/common/FriendCard.vue'
  import NewPicturePostInterface from './components/new_picture_post_interface.vue'
  import PicturePost from './components/picture_post.vue'


    // Use asyncData to fetch data from the server
  let  { data, error } = await useAsyncData('profile', () => $fetch(
    `${config.public.NUXT_STRAPI_URL}/api/profiles?${qs.stringify({
      populate: [
        "users_permissions_user",
        "users_permissions_user.nsight_id",
        "users_permissions_user.email",
        "users_permissions_user.first_name",
        "users_permissions_user.last_name",
        "users_permissions_user.profile_picture",
        "users_permissions_user.pictures",
        "users_permissions_user.friends.additional",
        "intro",
        "title",
        "body"

        
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
  
  let profile_data = data.value.data[0]
  let user = data.value.data[0].users_permissions_user
  // console.log('heeeeelp', user.friends)
  



      // FRIENDS

let profile_friends:any = null 
const feedNum = () => {
  let criteria;
  if (user?.friends?.length > 14) {
    criteria = 14;
  } else if (user?.friends?.length < 14) {
    criteria = user?.friends?.length;
  }
  return criteria;
};

  const fetchFriends = () => {
    // console.log('fetching friends', user.friends)
    if(!user?.friends?.length) {
      console.log('no friends. womp womp')
      return
    } else {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users?${qs.stringify({
        populate: [
          "id",
          "username",
          "email",
          "first_name",
          "last_name",
          "favorites",
          "profile_picture",
          "friends",
          "pending_friends",
          "nsight_id"
        ],
        filters: {
          nsight_id: {
            nsight_id: {
              $in: user.friends
            }
          }
        }
      })}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
      }).then(async (result) => {
        profile_friends = result;
      }).catch((error) => {
        console.error('Error fetching friends', error)
      })
    }
  }

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
      { value: "friends", label: "Friends", pinned: false, active: false, icon: 'user-group', feed_num: feedNum(), },
      { value: "photos", label: "Photos", pinned: false, active: false, icon: 'photo-film' },
      // { value: "videos", label: "Videos", pinned: false, active: false, icon: 'video' },
      // { value: "events", label: "Events", pinned: false, active: false },
      // { value: "groups", label: "Groups", pinned: false, active: false },
      // { value: "marketplace", label: "Marketplace", pinned: false, active: false },
      // { value: "more", label: "More", pinned: false, active: false },
    ],
    active_tab:  { value: "posts", label: "Posts", pinned: true, active: true, icon: 'note-sticky' } as Tab,
    comp: 0,
    friends: null,
    pending_request: null,
    self: null
  })

  // Mounted
  onMounted(async () => {
    state.active_tab = state.tabs.find((tab: Tab) => tab.pinned);
    // auto_sort_posts()

    // Follow/Unfollow
    state.friends = friend_check()
    state.self = self()
    state.pending_request = sent_request()
    
    nextTick(async () => {
      // auto_sort_posts()
      if(profile_data) {
        // console.log('profile_data', profile_data)
        fetch_posts()
        if(user) {
          fetchFriends()
        }
        nextTick(() => {
          grab_picture_posts()
        })
      }
    })
  })

  // Methods
  // Format friends


    // POSTS
  const fetch_posts = async () => {
    let { data, error } = await useAsyncData('posts', () => $fetch(
      `${config.public.NUXT_STRAPI_URL}/api/posts?${qs.stringify({
        populate: [
          "user_permissions_user",
          "user_permissions_user.nsight_id",
          "user_permissions_user.profile_picture",
          "title",
          "body",
          "pics",
          "visible",
          "images",
          "tags",
          "reactions",
          "external_links",
          "comments",
          "comments.comments",
          "comments.comments.commenter",
          "comments.comments.commenter.nsight_id",
          "comments.comments.commenter.profile_picture",
          "comments.comments.replies",
          "comments.comments.replies.user",
          "comments.comments.replies.user.nsight_id",
          "comments.comments.replies.user.profile_picture"
        ],
        filters: {
          profile: profile_data.id
        },
        sort: 'createdAt:desc'
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
    profile_data['posts'] = data.value.data
    auto_sort_posts()
    
  }

  const toggle_active_tab = (tab: any) => {
    state.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    state.active_tab = tab;
  }
  const add_new_post = (new_post: any) => {
    profile_data.posts.unshift(new_post)
    // nextTick(() => {
    //   auto_sort_posts()
    // })
  }
  // sort posts by date:
  const auto_sort_posts = () => {
    profile_data.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    nextTick(() => {
      profile_data.posts.forEach((post) => {
        post.comments.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      })
    })
  }

  // Grab Picture posts
  const grab_picture_posts =  () => {

    if(!user) {
      return
    } else {
     $fetch(`${config.public.NUXT_STRAPI_URL}/api/picture-posts?${qs.stringify({
      populate: [
        "users_permissions_user",
        "users_permissions_user.nsight_id",
        "users_permissions_user.profile_picture",
        "title",
        "caption",
        "data",
        "visible",
        "reactions",
        "tags",
        "comments",
        "comments.comments",
        "comments.comments.commenter",
        "comments.comments.commenter.nsight_id",
        "comments.comments.commenter.profile_picture",
        "comments.comments.replies",
        "comments.comments.replies.user",
        "comments.comments.replies.user.nsight_id",
        "comments.comments.replies.user.profile_picture"
      ],
      filters: {
        users_permissions_user: user?.id
      },
      sort: 'createdAt:desc'
    },
    { arrayFormat: 'brackets',
      encodeValuesOnly: true
    },)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ auth.token }`
      }
    }).then(async (result) => {
      profile_data['picture_posts'] = result.data
      // console.log('picture_posts', profile_data.picture_posts)
    })
    }


  }

  const update_picture_posts = () => {
    grab_picture_posts()
    
    nextTick(() => {
      // Find in dom id of '#close_new_picture_post' and click it
      document.getElementById('close_new_picture_post').click()
      nextTick(() => {
        state.comp += 1
        document.getElementById('close_new_picture_post').click()
      })
    })
  }

  // Follow/Unfollow
const friend_check = () => {
    return auth.user?.friends?.find(friend => friend === user.nsight_id?.nsight_id)
  }

  const self = () => {
    return user.email === auth.user.email
  }

  const sent_request = () => {
    return user?.pending_friends?.find((request) => request == auth.user.nsight_id.nsight_id) ? true : false
  }

  const send_friend_request =  () => {
    // 
    //  This is the most insane shit I have ever witnessed. I have no clue why this is happening, and I am too tired to research it:
    // Check to see if user.pending_friends is an array or an object:
    if(Array.isArray(user?.pending_friends)) {
      user.pending_friends = {
        data: []
      }
      nextTick(()=> {
        user?.pending_friends?.data.push(auth.user.nsight_id.nsight_id)
      })
    } else {
      user?.pending_friends?.data.push(auth.user.nsight_id.nsight_id)
    }

    user?.pending_friends?.data.push(auth?.user?.nsight_id?.nsight_id)

    nextTick(() => {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          pending_friends: user.pending_friends.data
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
    user.friends.data = user.friends.data.filter((friend) => friend !== auth.user.nsight_id.nsight_id)
    auth.user.friends.data = auth.user.friends.data.filter((friend) => friend !== user.nsight_id.nsight_id)
    nextTick(() => {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          friends: user.friends
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
    user.pending_friends.data = user.pending_friends.data.filter((request) => request !== auth.user.nsight_id.nsight_id)
    nextTick(() => {
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          pending_friends: user.pending_friends
        })
      }).then(async (result) => {
        // console.log('Friend request cancelled', result)
        state.pending_request = false
      }).catch((error) => {
        console.error('Error cancelling friend request', error)
      })
    })
  }

</script>
<style lang="scss">

  .active-tab {
    border-top: 1px solid #f9f9f9;
  }
  .new-post-modal {
    width: 60vw !important;
  }
</style>