<template>
  <div
    v-if="auth?.user"
    id="dashboard"
    class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col pt-10"
  >
    <div class="h-full w-full flex flex-row relative">

      <div class="h-full w-1/5 invisible md:visible px-3 pt-10 pb-4">
        <!-- shadow-xl rounded-md bg-zinc-300 dark:bg-zinc-900 -->
        <div class="h-full w-full flex flex-col">
          <div v-for="(tab, a) in state.tabs" :key="a" 
            class="w-full py-4 px-8 hover:shadow-xl mb-2 hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg flex flex-row justify-between relative z-0"
            :class="tab == state.current_tab ? 'bg-zinc-300 dark:bg-zinc-800 shadow-xl' : ''"
            @click="state.current_tab = tab"
          >
            <span class=" text-neutral-700 dark:text-white">
              {{ tab.name }}
            </span>
            <font-awesome-icon
              :icon="['fas', 'thumbtack']"
              class="me-6 btn-cart cursor-pointer hover:text-blue-300 dark:hover:text-blue-300 hover:opacity-1 absolute z-10 right-[1rem] top-[1.3rem]"
              :class="tab.pinned ? 'text-blue-300 opacity-1' : 'text-neutral-700 dark:text-white opacity-[0.2]'"
              @click="pinTab(tab)"
            />
          </div>
        </div>
      </div>

      <div class="min-h-[95%] my-auto me-4 rounded-lg w-full md:w-4/5 px-3 pb-4 bg-zinc-300 dark:bg-zinc-800 shadow-xl pt-10">
        <FriendsTab v-if="state?.current_tab?.value == 'my_friends'" />
        <MyProfileTab v-if="state?.current_tab?.value == 'my_profile'"   />
        <FeedTab v-if="state?.current_tab?.value == 'current'"   />
      </div>

      <!-- Chat  -->
      <ChatApp />

    </div>
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


// Components
  // Tabs
import FriendsTab from './components/MyFriendsTab.vue'
import MyProfileTab from './components/MyProfileTab.vue'
import FeedTab from './components/FeedTab.vue'



// Stores
const auth = authStore();
const prodStore = productsStore();
const settings = settingsStore();
const chat = chatStore();

// State
const state = reactive({
  current_user: authStore.user,
  current_tab: null,
  dark_mode: false,
  error: false,
  tabs: [
    {
      name: "My Friends",
      data: {
        adding_new: false,
        posting_new: false,
        post: null,
      },
      value: "my_friends",
      pinned: false
    },
    {
      name: "My Profile",
      value: "my_profile",
      data: {},
      pinned: false
    },
    {
      name: "Current",
      data: {},
      value: "current",
      pinned: false
    },
  ],
  validate: false
});


// Mounted
onMounted(() => {
  state.tabs.forEach((tab) => {
    tab.pinned = tab.value === auth.user.preferences[0].default_dashboard_tab
  })
  nextTick(() => {
    state.current_tab = state.tabs.find((tab) => tab.pinned)
  })
});

// Methods
const pinTab = (tab) => {
  state.tabs.forEach((tab) => { tab.pinned = false })
  tab.pinned = true
  settings.pinDashboardTab(tab)
}

</script>

