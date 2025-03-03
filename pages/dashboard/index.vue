<template>
  <div
    v-if="auth?.user"
    id="dashboard"
    class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-10 relative"
    >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="max-w-4xl p-6 mx-auto">
        <!-- heading title -->
        <div class="page__heading flex flex-row justify-between">
          <h1 class="lowercase">friends</h1>
          <button
            uk-toggle="target: #invite_modal"
            class="text-neutral-100 dark:text-white px-4 py-0 bg-amber-400 h-10 rounded-lg shadow-md"
            >
          invite
          </button>
          <!-- invite modal -->
          <div
            class="fade-in w-[90vw] md:w-[50vw] h-[90vh] md:h-[22vh] p-0 bg-zinc-200 dark:bg-zinc-900 shadow-xl mx-auto mt-20 rounded-lg overflow-hidden"
            id="invite_modal"
            uk-modal
            style="padding: 0 !important"
            >
            <div
              class="uk-modal-dialog uk-modal-body uk-padding-remove  relative mx-auto rounded-lg shadow-xl overflow-hidden w-full"
              style="width: 100% !important; height: 100% !important"
            >
              <button id="close_invite" class="uk-modal-close-default" type="button" uk-close></button>
              <InviteForm @post_new_member="post_member" />
            </div>
          </div>
        </div>
        <!-- tabs -->
        <nav v-if="settings"
          class="border-b dark:border-zinc-700 uk-animation-slide-top cls-active:bg-zinc-100/60 z-30 px-4 animation: uk-animation-slide-top"
          >
          <ul
            :class="settings.dark_mode ? 'dark' : ''"
            class="flex gap-5 text-sm text-center text-gray-600 capitalize font-semibold -mb-px dark:text-white/80 connect: animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
            >
            <li
              :class="state.active_tab == 0 ? 'active-tab' : ''"
              @click="state.active_tab = 0"
              >
              <a href="#" class="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white text-neutral-900 dark:text-white aria-expanded:dark:border-white">
               friends - {{ auth?.user?.data?.friends.length }}
              </a>
            </li>
            <li
              :class="state.active_tab == 1 ? 'active-tab' : ''"
              @click="state.active_tab = 1"
              >
              <a
                href="#"
                class="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white text-neutral-900 dark:text-white aria-expanded:dark:border-white"
                >
              people you may know
              </a>
            </li>
          </ul>
        </nav>
        <div :key="state.comp" class="uk-switcher uk-active mt-10" id="ttabs">
          <!-- Friends -->
          <div
            v-show="state.active_tab == 0"
            :class="state.active_tab == 0 ? 'uk-active' : ''"
            >
            <div class="grid sm:grid-cols-3 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
              <FriendCard v-for="(friend, a) in state.tabs[0].data" :key="a" :member="friend" />
            </div>
            <div class="flex justify-center my-10">
              <button
                v-if="
                auth?.user?.friends.data.length > 14 &&
                state.feed_num < auth?.user?.friends.data.length
                "
                type="button"
                class="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-zinc-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition duration-200 ease-in-out"
                @click="state.feed_num += 15"
                >
              Load more...
              </button>
            </div>
          </div>
          <!-- Suggested members: -->
          <div
            v-show="state.active_tab == 1"
            :class="state.active_tab == 1 ? 'uk-active' : ''"
            >
            <div class="w-full h-full px-2 py-4 flex flex-col">
              <p
                v-if="!auth.suggested_friends.length"
                class="text-neutral-900 dark:text-white text-md my-5 text-start"
                >
                No suggested friends at the moment. Reach out to more people!
              </p>
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
    title: "Dashboard",
    description: "Dashboard",
    url: "/dashboard",
    middleware: ["auth"],
    layout: "inner",
  });

  // Setup
  const config = useRuntimeConfig();
  import qs from "qs";
  
  // Components
  import InviteForm from "./components/Invite.vue";
  import FriendCard from "~/components/common/FriendCard.vue";
  
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
    current_user: authStore.user,
    current_tab: null,
    dark_mode: false,
    error: false,
    invite_modal: false,
    comp: 0,
    feed_num: feedNum(),
    active_tab: 0,
    tabs: [
      { value: "friends", label: "Friends", pinned: false, active: true, data: [] },
      {
        value: "people_you_may_know",
        label: "People You May Know",
        pinned: false,
        active: false,
      },
    ],
    validate: false,
  });
  
  const post_member = () => {
    state.comp++;
    auth.updateUser();
  };
  
  // Mounted
  onMounted(() => {
    fetchFriends();
    state.tabs.forEach((tab) => {
      tab.pinned = tab.value === auth.user.preferences[0].default_dashboard_tab;
    });
    nextTick(() => {
      state.current_tab = state.tabs.find((tab) => tab.pinned);
    });
  });
  
  // Methods
  const pinTab = (tab) => {
    state.tabs.forEach((tab) => {
      tab.pinned = false;
    });
    tab.pinned = true;
    settings.pinDashboardTab(tab);
  };

  const fetchFriends = () => {
    if(!auth?.user?.friends?.data?.length) {
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
              $in: auth?.user?.friends?.data
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
        console.log('result', result);
        state.tabs[0].data = result;
      }).catch((error) => {
        console.error('Error fetching friends', error)
      })
    }


    
  }

</script>
<style lang="scss">
  .active-tab {
  border-bottom: 1px solid #cecfc4 !important;
  /* smooth transiton: */
  transition: border-bottom 0.5s;
  }
</style>