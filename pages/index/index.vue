<template>
  <div class="bg-zinc-100 dark:bg-zinc-900 w-full">
    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-sm mx-auto md:px-10 p-4 w-full">
        <div class="uk-animation-scale-up delay-100 repeat repeat-true">
          <!-- logo -->
          <div class="flex justify-center mb-12 uk-animation-scale-up delay-100">
              <img 
                src="https://res.cloudinary.com/nsight/image/upload/v1721087388/logo_neutral_6e6fab0ffd.png" 
                alt="nSight Logo" 
                class="w-auto h-32 shrink-0 px-3 rounded-2xl p-2.5" >
          </div>
          <!-- form -->
           <form method="#" action="#" class="space-y-3 uk-animation-scale-up delay-100 repeat repeat-true" :class="settings?.dark_mode ? 'dark' : ''">

              <input v-model="state.input.email" class="!w-full" id="email" name="email" type="email" autofocus  placeholder="Email" required> 
              <input v-model="state.input.password" class="!w-full" id="password" name="password" type="password" autofocus  placeholder="Password" required>
            
              <button type="submit" 
                  class="font-medium w-full rounded-lg nsight-btn-primary py-1 px-4 text-neutral-800 h-[34px] active:scale-[0.97] transition-all duration-150"
                  :class="state.loading ? 'opacity-25' : 'opacity-1'"
                  @click="sign_in"
                  :disabled="state.loading"
                > 
                <span class="text-neutral-800 dark:text-neutral-700">let's get it!</span> 
              </button>
           </form>


          <!-- forgot password -->
          <div class="flex justify-center my-10">
            <NuxtLink to="/forgot-password" class="text-blue-300 text-xs fw-bolder decoration-none hover:decoration-none">
              Forgot Password? Let's fix that.
            </NuxtLink>
          </div>

          <!-- quotes -->
          <div class="w-full mt-20 mx-auto my-5">
            <p v-if="state.quote" class="text-neutral-900 dark:text-white text-xl">
                " {{ state.quote.quote_body[0].children[0].text }} "
            </p>
            <small class="text-md ">
            <a :href="state.quote.link ? state.quote.link : 'javascript:(0)'"
                :target="state.quote.link ? '_blank' : '_self'"
                class="text-decoration-none text-blue-200 font-bold text-lg"
              >
                - {{ state.quote.author }}
              </a>
            </small>
          </div>

        </div>
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
const settings = settingsStore();

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
a {
  text-decoration: none !important;

  &:hover {
    text-decoration: none !important;
  }
}
</style>
