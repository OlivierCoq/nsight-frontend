<template>
  <v-app>
    <v-main>
      <AppBar />
      <slot />
    </v-main>
  </v-app>
</template>
<script>
import AppBar from '~/components/common/AppBar.vue'
export default {
  name: 'inner',
  components: {
    AppBar
  }
}
</script>
