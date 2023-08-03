<template>

</template>
<script lang="ts">
import { useAsyncData } from 'nuxt/app';
import { definePageMeta } from 'nuxt/dist/pages/runtime';
import { reactive } from 'vue';

  export default {
    name: 'dashboard',
    setup() {
      definePageMeta({
        middleware: ['auth']
      })
    }
  }
</script>