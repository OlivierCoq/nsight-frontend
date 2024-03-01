<template>
  <div class="w-full h-[100vh] bg-zinc-800 dark:bg-black">
    <div class="w-1/2 mx-auto h-100 flex flex-col items-center justify-center">
      <img
        src="https://res.cloudinary.com/nsight/image/upload/v1708400678/n_Sight_logo_dark_dd6d0a819c.jpg"
        class="w-100 mt-5 mb-4"
        alt="PS/nSight Logo"
      />
      <div class="w-3/4 mx-auto mb-4">
        <input
          type="email"
          class="w-full shadow-xl border-0 rounded-md h-[40px] my-2 px-4"
          v-model="state.input.email"
          placeholder="Email"
        />
        <input
          type="password"
          class="w-full shadow-xl border-0 rounded-md h-[40px] my-2 px-4"
          v-model="state.input.password"
          placeholder="Password"
        />
        <button
          class="rounded-md shadow-xl w-full flex flex-row text-neutral-800 justify-center nsight-btn-primary my-2 py-2"
          :class="state.loading ? 'opacity-25' : 'opacity-1'"
          @click="sign_in"
          :disabled="state.loading"
        >
          <svg
            v-if="state.loading"
            class="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
          >
            <!-- ... -->
          </svg>
          <span class="text-center"> let's get it </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Meta
definePageMeta({
  middleware: ["guest"],
  layout: "default",
});

// State
const state = reactive({
  input: {
    email: "",
    password: "",
    nsight_id: "",
    strapi_data: false,
  },
  quotes: false,
  quote: false,
  nsight_ids: false,
  errors: [],
  loading: false,
});
const auth = authStore();
const runtimeConfig = useRuntimeConfig();

// Methods
const pull_quote = () => {
  if (state.quotes) {
    let random = Math.floor(Math.random() * state.quotes.data.length);
    state.quote = state.quotes.data[random];
  }
};
const quotes = async () => {
  const res = await $fetch(
    `${runtimeConfig.public.NUXT_STRAPI_URL}/api/quotes?populate=*`,
    { method: "GET" }
  )
    .then((res) => {
      state.quotes = res;
      pull_quote();
    })
    .catch((err) => {
      console.log(err);
    });
};
const sign_in = async () => {
  console.log("Signing in nSight member!");
  state.loading = true;
  await auth
    .login({
      identifier: state.input.email,
      password: state.input.password,
    })
    .catch((err) => {
      console.log("err", err);
      state.errors.push("Incorrect email, username, or password.");
      state.loading = false;
    });
};

// Once created:
quotes();
</script>
<style lang="scss">
.nsight-btn-primary {
  background-color: #f6e232 !important;

  &:hover {
    background-color: #e4d22e !important;
  }
}
</style>
