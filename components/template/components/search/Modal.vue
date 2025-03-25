<template>
  <div id="search_interface" class="h-full w-full rounded-lg bg-black/70 flex flex-col pt-20 pb-5 px-5 lg:px-10">
    <div class="w-full flex flex-row justify-start mb-5">
      <div class="w-full md:w-3/4 text-lg flex flex-row justify-between items-center">
        <input
          v-model="state.search.query"
          @input="doSearch"
          type="text"
          class="search_input w-full bg-transparent rounded-lg text-lg me-4" 
          placeholder="Search"
        />
        <font-awesome-icon :icon="['fa', 'magnifying-glass']" class="text-lg lg:text-4xl cursor-pointer text-zinc-300 hover:text-white" @click="doSearch" />
      </div>
    </div>
    <div class="w-full flex-1 flex flex-row">

      <div v-if="state.search?.results?.products?.length" class="full lg:w-1/2 p-4 m-4 fade-in">
        <h3 class="text-3xl text-white font-thin mb-4">Products</h3>
        <div
          class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 mt-2 w-full dark"
          uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100"
        >
          <ProductCard
            v-for="(product, a) in state.search.results.products"
            :key="a"
            :product="product"
          />
        </div>
      </div>

      <div v-if="state.search?.results?.posts?.length" class="full lg:w-1/2 p-4 m-4 fade-in">
        <h3 class="text-3xl text-white font-thin mb-4">Posts</h3>
        <div class="full lg:w-1/2 fade-in">
          <div v-for="(post, b) in state.search.results.posts" :key="b" class="w-full flex flex-col p-4 bg-zinc-800 rounded-lg mb-2 shadow-xl">
            <a :href="`/members/${post.nsight_id}`" class="w-full flex flex-col">
              <h4 class="text-lg text-white">{{ post.title }}</h4>
             
              <div class="text-md text-zinc-200 font-thin" v-html="post.body.substring(0, 80)"></div>
            </a>
          </div>
        </div>
      </div>

      <div v-if="state?.search?.results?.people?.length" class="full lg:w-1/2 p-4 m-4 fade-in">
        <h3 class="text-3xl text-white font-thin mb-4">People</h3>
        <div class="full lg:w-1/2 fade-in">
          <div class="grid sm:grid-cols-2 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80 uk-animation-scale-up delay-100">
            <FriendCard v-for="(friend, c) in state.search.results.people" :key="c" :member="friend" @close="close_modal" />
          </div>
        </div>
      </div>

      <div v-else-if="state.search.searching && state.search.no_results">
        <!-- shrug emoji: -->
        <h3 class="text-3xl text-white font-thin mb-4">No results found </h3>
      </div>

    </div>  

  </div>
</template>

<script setup>

  // Setup
  const config = useRuntimeConfig();
  import qs from "qs";
  // Stores
  const prodStore = productsStore()
  const auth = authStore()  

  // Components
  import ProductCard from '../../../../pages/shop/components/ProductCard.vue'
  import FriendCard from './SearchMemberResult.vue'


  // State:
  const state = reactive({
    search: {
      query: "",
      results: {
        products: [],
        posts: [],
        people: [],
      },
      searching: false,
      no_results: false,
      loading: false,
    },
  })


  // Methods:

  // emits
  const emit = defineEmits(["close"])

  const doSearch = async () => {

    // Products:
    const search_products = async () => {
      state.search.searching = true
      state.search.loading = true
      state.search.results.products = prodStore?.products?.filter(product => product?.itemData?.name?.toLowerCase().includes(state.search.query.toLowerCase()))
    }
    if(state.search.query.length > 0) { await search_products() } 
    else { state.search.results.products = [] }

    // People
    const search_people = async () => {
      state.search.searching = true
      state.search.loading = true

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
          $or: [
            { first_name: { $containsi: state.search.query } },
            { last_name: { $containsi: state.search.query } },
            { username: { $containsi: state.search.query } }
          ]
        }
      })}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        // console.log('people:', result)
        state.search.results.people = result
      })
      .catch((error) => {
        console.log('error:', error)
      })
    }
    if(state.search.query.length > 3) { await search_people() } 
    else { state.search.results.people = [] }

    // Posts
    const search_posts = async () => {
      state.search.searching = true
      state.search.loading = true

      $fetch(`${config.public.NUXT_STRAPI_URL}/api/posts?${qs.stringify({
        populate: [
          "id",
          "users_permissions_user",
          "users_permissions_user.nsight_id",
          "title",
          "body",
          "profile",
          "reactions",
          "nsight_id",
          "created_at",
          "updated_at"
        ],
        filters: {
          $or: [
            { title: { $containsi: state.search.query } },
            { body: { $containsi: state.search.query } }
          ]
        }
      })}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        // console.log('posts:', result)
        state.search.results.posts = result?.data
      })
      .catch((error) => {
        console.log('error:', error)
      })

    }
    if(state.search.query.length > 4) { await search_posts() } 
    else { state.search.results.posts = [] }
    
  }

  const close_modal = () => {
    emit("close")
  }
</script>

<style lang="scss" scoped>
  #search_interface {
    .search_input {
      background: transparent !important;
      border-bottom: 1px solid white;
      font-size: 2.5rem;
      color: white !important;
    }
  }
</style>