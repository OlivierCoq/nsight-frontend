<template>
  <div
    class="py-3 px-5 mx-5 shadow-xl bg-zinc-300 dark:bg-zinc-900 min-h-[300px] rounded-md flex flex-col"
  >
    <h2 class="text-neutral-900 dark:text-white font-bold text-xl m-2">
      Edit personal info
    </h2>
    <div class="input_group w-full my-3 flex flex-row">
      <div class="w-full md:w-1/2 pe-3">
        <input
          class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
          :class="
            auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'
          "
          type="text"
          placeholder="First name"
          v-model="auth.user.first_name"
        />
        <label class="text-neutral-900 dark:text-white opacity-75"
          >first name</label
        >
      </div>
      <div class="w-full md:w-1/2">
        <input
          class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
          :class="
            auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'
          "
          type="text"
          placeholder="Last name"
          v-model="auth.user.last_name"
        />
        <label class="text-neutral-900 dark:text-white opacity-75"
          >last name</label
        >
      </div>
    </div>
    <div class="input_group w-full my-3">
      <input
        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
        :class="
          auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'
        "
        type="text"
        placeholder="Email"
        v-model="auth.user.email"
      />
      <label class="text-neutral-900 dark:text-white opacity-75">email</label>
    </div>
    <div class="input_group w-full my-3">
      <p class="font-bold text-neutral-900 dark:text-white opacity-50">
        {{ auth.user.nsight_id.nsight_id }}
      </p>
      <label class="text-neutral-900 dark:text-white opacity-75"
        >nSight ID</label
      >
    </div>
    <div class="input_group w-full my-3">
      <button
        class="nsight-btn-primary w-full text-neutral-900 dark:text-white p-2 rounded uppercase"
        @click="auth.updateUser()"
      >
        Update
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, nextTick } from "vue";

const state = reactive({
  user: false,
});
const auth = authStore();
</script>
<style lang="scss">
.border-dark {
  border: 1px solid #ffffff2e;
}
.border-light {
  border: 1px solid #0000002e;
}
.nsight-btn-primary {
  background-color: #f6e232 !important;
  color: rgb(39, 39, 39);

  &:hover {
    background-color: #e4d22e !important;
  }
}
</style>
