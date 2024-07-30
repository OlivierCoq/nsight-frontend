<template>
  <div
    v-if="auth?.user"
    id="dashboard"
    class="min-h-[100vh] w-full bg-zinc-200 dark:bg-zinc-800 flex flex-col pt-10"
  >
    <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div class="max-w-4xl p-6 mx-auto">
        <!-- heading title -->
        <div class="page__heading flex flex-row justify-between">
          <h1 class="lowercase">friends</h1>
          <button
            @click="state.invite_modal = true"
            uk-toggle="target: #invite_modal"
            class="text-neutral-100 dark:text-white px-4 py-0 bg-amber-400 h-10 rounded-lg shadow-md"
          >
            invite
          </button>

          <!-- invite modal -->
          <div
            v-if="state.invite_modal"
            class="fade-in w-[90vw] md:w-[50vw] h-[90vh] md:h-[22vh] p-0 bg-zinc-200 dark:bg-zinc-900 shadow-xl mx-auto mt-20"
            id="invite_modal"
            uk-modal
            style="padding: 0 !important"
          >
            <div
              class="uk-modal-dialog tt relative mx-auto rounded-lg shadow-xl overflow-hidden w-full"
              style="width: 100% !important; height: 100% !important"
            >
              <div class="w-full bg-zinc-200 dark:bg-zinc-900 h-[10%]">
                <button
                  class="absolute top-[10px] right-[8px] p-4"
                  type="button"
                  uk-close
                  @click="state.invite_modal = false"
                ></button>
              </div>
              <InviteForm @post_new_member="post_member" />
            </div>
          </div>
        </div>

        <!-- tabs -->
        <nav
          v-if="settings"
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
              <a
                href="#"
                class="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white text-neutral-900 dark:text-white aria-expanded:dark:border-white"
              >
                friends - {{ auth.user.friends.length }}
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
            <div
              class="grid sm:grid-cols-3 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100"
            >
              <div
                class="fade-in"
                v-for="(friend, a) in auth.user.friends"
                :key="a"
              >
                <div
                  v-show="a <= state.feed_num"
                  :class="[
                    settings.dark_mode ? 'dark' : '#',
                    friend.nsight_id ? 'opacity-1' : 'opacity-50',
                  ]"
                  class="flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-sm border1 bg-zinc-100 dark:bg-zinc-900"
                  :disabled="!friend.nsight_id"
                >
                  <a
                    :href="
                      friend.nsight_id
                        ? `/members/${friend.nsight_id?.nsight_id}`
                        : ''
                    "
                  >
                    <div
                      class="rounded-full lg:w-16 lg:h-16 w-10 h-10 overflow-hidden flex flex-col justify-center items-center"
                    >
                      <img
                        :src="
                          friend.profile_picture?.url
                            ? friend.profile_picture.url
                            : '/assets/images/mock_data/placeholder_pfp.jpeg'
                        "
                        :alt="friend.first_name"
                        class="w-[110%]"
                      />
                    </div>
                  </a>
                  <div class="flex-1">
                    <a
                      :href="
                        friend.nsight_id
                          ? `/members/${friend.nsight_id.nsight_id}`
                          : '#'
                      "
                      :disabled="!friend.nsight_id"
                    >
                      <h4
                        class="font-semibold text-sm text-neutral-900 dark:text-white"
                      >
                        {{ friend.first_name }} {{ friend.last_name }}
                      </h4>
                    </a>
                    <div v-if="friend.friends" class="mt-0.5">
                      {{ friend.friends.length }} following
                    </div>
                    <div v-else class="mt-0.5">Invited</div>
                  </div>
                  <!-- <button type="button" class="button bg-amber-500 rounded-full py-1.5 font-semibold">Fallow</button> -->
                </div>
              </div>
            </div>

            <div class="flex justify-center my-10">
              <button
                v-if="
                  auth.user.friends.length > 14 &&
                  state.feed_num < auth.user.friends.length
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

// Components
import InviteForm from "./components/Invite.vue";

// Stores
const auth = authStore();
const prodStore = productsStore();
const settings = settingsStore();
const chat = chatStore();

const feedNum = () => {
  let criteria;
  if (auth.user.friends.length > 14) {
    criteria = 14;
  } else if (auth.user.friends.length < 14) {
    criteria = auth.user.friends.length;
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
    { value: "friends", label: "Friends", pinned: false, active: true },
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
</script>
<style lang="scss">
.active-tab {
  border-bottom: 1px solid #cecfc4 !important;
  /* smooth transiton: */
  transition: border-bottom 0.5s;
}
</style>
