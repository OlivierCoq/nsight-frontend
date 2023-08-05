<template>

</template>
<script>
import { useAsyncData } from 'nuxt/app';
import { reactive } from 'vue';

  export default {
    name: 'dashboard',
    setup() {
      definePageMeta({
        middleware: ['auth']
      })

      return {
        definePageMeta
      }
    }
  }
</script>