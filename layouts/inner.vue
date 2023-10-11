<template>
  <v-app>
    <v-main>
      <CommonAppBar />
      <slot />
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'inner',
}
</script>
