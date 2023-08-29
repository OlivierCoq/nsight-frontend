<template>
  <div></div>
</template>
<script>
  import { reactive } from 'vue'
  export default {
    name: 'Member',
    setup() {
      definePageMeta({
        middleware: ['auth'],
        layout: 'inner'
      })

      const state = reactive({

      })

      return {
        // meta
        definePageMeta,
        // state
        state,
        // methods
      }
    },
  }
</script>