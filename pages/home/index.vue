<template>
  <div
    v-if="auth?.user"
    id="home_feed"
    class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-10 relative"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small] min-h-[100vh]">
      <div class="max-w-[1400px] mx-auto">
        <div class="max-w-4xl p-6 mx-auto">
                    <!-- heading title -->
          <div class="page__heading flex flex-row justify-between">
            <h1 class="lowercase">home</h1>
            <button
              uk-toggle="target: #invite_modal"
              class="text-neutral-100 dark:text-white px-4 py-0 bg-amber-400 hover:bg-amber-500 h-10 rounded-lg shadow-md"
              >
            invite
            </button>
            
          </div>
        </div>
      

        <!-- invite modal -->
        <div class="lg:p-20 p-10 uk-modal" id="invite_modal" uk-modal="">  
          <div class="uk-modal-dialog tt relative mx-auto shadow-xl w-[400px] rounded-lg overflow-hidden">
            <InviteForm @post_new_member="post_member" />
            <button type="button" class="rounded-full p-2 absolute right-0 top-0 m-3  uk-modal-close">
              <font-awesome-icon :icon="['fas', 'times']" class="text-zinc-600" />
            </button>
          </div>
          
        </div>

         <div class="max-w-[85%] mx-auto flex flex-col lg:flex-row w-full h-[90vh]">
          <!-- feed -->
          <div class="w-full lg:w-2/3 flex flex-col h-full m-2 ">

              <!-- New posts -->
            <div class="w-full backdrop-blux-xl bg-white dark:bg-black/20 rounded-lg shadow-xl p-4 flex flex-row mb-4 align-center justify-center items-center">
              <p class="text-md text-zinc-900 dark:text-zinc-200 dark:font-thin flex-1">what's new today?</p>
              <div class="ctr-new_posts">
                <button 
                  class="bg-amber-400 hover:bg-amber-500 text-center text-neutral-100 dark:text-white px-4 py-2 rounded-lg shadow-md mx-1"
                  uk-toggle="target: #new_post_modal" 
                >
                  <font-awesome-icon :icon="['fas', 'note-sticky']" class="mx-auto" />
                </button>

                <div class="lg:p-20 p-10 uk-modal" id="new_post_modal" uk-modal="">  
                  <div class="uk-modal-dialog tt relative mx-auto shadow-xl w-[400px] rounded-lg overflow-hidden">
                    <NewPostInterface :profile="profile_data" @newpost="add_new_post" />
                    <button type="button" id="close_new_post_modal" class="rounded-full p-2 absolute right-0 top-0 m-3  uk-modal-close">
                      <font-awesome-icon :icon="['fas', 'times']" class="text-zinc-600" />
                    </button>
                  </div>
                </div>

              </div>
              <div class="ctr-new_picture_posts">
                <button 
                  id="close_new_picture_post"
                  class="bg-amber-400 hover:bg-amber-500 text-center text-neutral-100 dark:text-white px-4 py-2 rounded-lg shadow-md mx-1"
                  uk-toggle="target: #new_picture_post_modal"
                >
                  <font-awesome-icon :icon="['fas', 'image']" class="mx-auto" />
                </button>


                <div class="lg:p-20 p-10 uk-modal" id="new_picture_post_modal" uk-modal="">  
                  <div class="uk-modal-dialog new_picture_post_modal_dialog tt relative mx-auto shadow-xl w-[800px] rounded-lg overflow-hidden">
                    <NewPicturePostInterface :key="state.comp" :user="auth?.user" @newpost="update_picture_posts" /> 
                    <button type="button" class="rounded-full p-2 absolute right-0 top-0 m-3  uk-modal-close">
                      <font-awesome-icon :icon="['fas', 'times']" class="text-zinc-600" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
            <!-- Feed body -->
            <div v-if="state.tag" class="w-full mt-3 mb-1 rounded-xl pt-4 px-4 flex flex-col align-start justify-start ">
              <h3 class="text-3xl text-white"><span class="text-lg">tagged: </span><span class="text-amber-400">#{{ state.tag }}</span></h3>
              <a href="/home" class="text-xs text-amber-400 hover:text-amber-500 text-start mb-3">clear tag</a>
            </div>
            <div class="w-full overflow-y-scroll  pb-20 flex flex-col flex-1 mb-10">
              <FeedCard v-for="(post, a) in state.feed" :key="a" :post="post" :profile-page="false" :user="post?.users_permissions_user" />
            </div>
          </div>
          <div class="w-full lg:w-1/3 flex flex-col h-full m-2">
            <!-- Friends -->
            <div class="flex flex-col items-start align-start justify-start h-1/3 w-full backdrop-blur-xl bg-zinc-300 dark:bg-black/20 rounded-lg px-6 pt-8 pb-8">
              <h3 class="text-neutral-900 dark:text-white text-xl mb-0">friends 
                <span class="text-xs text-gray-500 dark:text-white/80 mb-2">({{ state.friends.length }})</span>
              </h3>
              <NuxtLink to="/friends" class="text-xs text-neutral-800 dark:text-amber-400 hover:text-amber-500 mb-2">view all</NuxtLink>
              <div class="flex flex-1 flex-col w-full" :class="state.friends?.length > 2 ? 'overflow-y-scroll' : ''">
                <div class="grid gap-2 pe-4 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
                  <FriendCard v-for="(friend, a) in state.friends" :key="a" :member="friend" />
                </div>
              </div>
            </div>
            <!-- People you may know -->
            <div class="flex flex-col items-start align-start justify-start h-1/3 w-full mt-4 backdrop-blur-xl bg-zinc-300 dark:bg-black/20 rounded-lg px-6 pt-8 pb-8">
              <h3 class="text-neutral-900 dark:text-white text-xl">people you may know 
                <span class="text-xs text-gray-500 dark:text-white/80">({{ state.potential_friends.length }})</span>
              </h3>
              <div class="flex flex-1 flex-col w-full" :class="state.potential_friends?.length > 2 ? 'overflow-y-scroll' : ''">
                <div v-if="state.potential_friends.length" class="grid pe-4 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
                  <FriendCard v-for="(friend, a) in state.potential_friends" :key="a" :member="friend" />
                </div>
                <p v-else class=""></p>
              </div>
            </div>

            <!-- Popular tags: -->
            <div class="flex flex-col items-start align-start justify-start min-h-[10rem] w-full mt-4 backdrop-blur-xl bg-zinc-300 dark:bg-black/20 rounded-lg px-6 pt-8 pb-8">
              <h3 class="text-neutral-900 dark:text-white text-xl">popular tags</h3>
              <div class="flex flex-wrap" :class="state.popular_tags?.length > 16 ? 'overflow-y-scroll h-[10rem]' : ''">
                <div v-for="(tag, b) in state.popular_tags" :key="b" class="tag_pill rounded-full flex flex-row items-center bg-amber-500 px-4 min-w-[60px] m-1 h-[28px] shadow-lg">
                  <a :href="`/home?tag=${tag.tag_name}`" class="text-white hover:text-zinc-800 m-0">#{{ tag?.tag_name }}</a>
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

  // Page meta
  definePageMeta({
    title: "Home",
    description: "Home",
    url: "/home",
    middleware: ["auth"],
    layout: "inner",
  });


  // Setup
  const config = useRuntimeConfig();
  import qs from "qs";

  const route = useRoute();
  
  // Components
  import InviteForm from "./components/Invite.vue";
  import FriendCard from "~/components/common/FriendCard.vue";
  import NewPostInterface from '../members/components/new_post_interface.vue'
  import NewPicturePostInterface from '../members/components/new_picture_post_interface.vue'
  import FeedCard from './components/FeedCard.vue'
  
  // Stores
  const auth = authStore();
  const prodStore = productsStore();
  const settings = settingsStore();
  const chat = chatStore();
  
  const feedNum = () => {
    let criteria;
    if (auth?.user?.data?.friends.length > 14) {
      criteria = 14;
    } else if (auth?.user?.data?.friends.length < 14) {
      criteria = auth?.user?.data?.friends.length;
    }
    return criteria;
  };

  // State
  const state = reactive({
    friends: [],
    potential_friends: [],
    feed: [],
    comp: 0,
    tag: route.query.tag,
    popular_tags: [
    ]
  })


  // Lifecycle
  onMounted(() => {
    fetchFriends()

    const tag = route.query.tag
    if(tag) {fetchFeed(auth, tag)}
    else { fetchFeed(auth, false) }

  })

  // methods

    // Adding new member:
  const post_member = () => {
    state.comp++;
    auth?.updateUser();
  }
    /// Fetching Friends
  const fetchFriends = () => {
    if(!auth?.user?.friends?.length) {
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
              $in: auth?.user?.friends
            }
          }
        }
      })}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${auth?.token}`
        }
      }).then(async (result) => {
        // console.log('result', result);
        state.friends = result;
        await fetchPotentialFriends()
      }).catch((error) => {
        console.error('Error fetching friends', error)
      })
    }


    
  }
  const fetchPotentialFriends = async () => {
      console.log('fetching potential friends...');

      let suggested_friends: string[] = []

      if(!state.friends?.length) {
        return
      } else {
        state.friends?.forEach((friend) => {
          friend?.friends.forEach((f)=> {
            if(!auth?.user?.friends.includes(f) && (f !== auth?.user?.nsight_id.nsight_id)) {
              suggested_friends.push(f)
            }
          })
        })

        nextTick(() => {
          // console.log('suggested_friends', suggested_friends);
          if(suggested_friends.length) {

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
                    $in: suggested_friends
                  }
                }
              }
            })}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application',
                'Authorization': `Bearer ${auth?.token}`
              }
            }).then(async (result) => {
              // console.log('result', result);
              state.potential_friends = result;
            }).catch((error) => {
              console.error('Error fetching friends', error)
            })


          }
        })
      }
  }
    // Fetching Profile
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
          nsight_id: auth?.user?.nsight_id.nsight_id
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


  const fetchFeed = async (auth:any, tag:any) => {
    console.log('tag', tag);
    $fetch('/api/feed/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          user: auth?.user,
          token: auth?.token,
          tag
        })
      }).then(async (result) => {
        console.log('feed result', result);
        state.feed = result?.data;
        state.popular_tags = [...result?.popular_tags];
      }).catch((error) => {
        console.error('Error fetching feed', error)
      })
  }

  const add_new_post = (new_post: any) => {
    
    new_post['users_permissions_user'] = auth?.user
    new_post['type'] = 'post'
    if(!state.feed?.length) {
      console.log(new_post)
      state?.feed?.push(new_post)
    } else {
      console.log(new_post)
      state?.feed?.unshift(new_post)
    }
    nextTick(() => {
      // auto_sort_posts()
      // get element with id of close_new_post_modal and click it
      state.comp += 1
      document.getElementById('close_new_post_modal').click()

    })
  }
  const update_picture_posts = (new_post: any) => {
    // grab_picture_posts()
    new_post['users_permissions_user'] = auth?.user
    new_post['type'] = 'picture-post'
    new_post['type'] = 'post'
    if(!state.feed?.length) {
      console.log(new_post)
      state?.feed?.push(new_post)
    } else {
      console.log(new_post)
      state?.feed?.unshift(new_post)
    }
    nextTick(() => {
      // Find in dom id of '#close_new_picture_post' and click it
      document.getElementById('close_new_picture_post').click()
      nextTick(() => {
        state.comp += 1
        document.getElementById('close_new_picture_post').click()
      })
    })
  }


</script>
<style lang="scss">

  // .ctr-invite_modal {
  //   margin-top: 15rem !important;
  //   min-height: 17vh !important;
  //   max-height: 30vh !important;
  // }
  .new_picture_post_modal_dialog {
    // Large screens:
    @media (min-width: 1024px) {
      width: 800px !important;
    }
  }
</style>