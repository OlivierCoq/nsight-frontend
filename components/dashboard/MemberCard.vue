<template>
  <v-card class="member-card w-100 h-100" variant="tonal">
    <v-img
      class="white--text align-end w-100"
      :src="`https://xsgames.co/randomusers/assets/avatars/male/${Math.floor(Math.random() * 90 + 10)}.jpg`"
    >
      <v-card-title class="text-white">{{ member.first_name }}</v-card-title>
    </v-img>
    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text @click="visit_profile">profile</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
  import { defineProps, reactive } from 'vue'
  const props = defineProps(['member'])
  const state = reactive({
    member: props.member
  })
  const visit_profile = () => {
    navigateTo(`/members/${state.member.id}`)
  }
</script>
<style lang="scss">
  .member-card {

    img { height: 100%; }

    .w-100 { width: 100% !important; }
    .h-100 { height: 100% !important; }
  }
</style>