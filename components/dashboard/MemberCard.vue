<template>
  <v-card class="member-card w-100 h-100" variant="tonal">
    <v-img
      class="white--text align-end w-100"
      :src="member.profile_picture ? member.profile_picture : 'https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg'"
    >
      <v-card-title class="text-white member_name">{{ member.first_name }}</v-card-title>
    </v-img>
    <v-card-actions class="d-flex flex-row align-center justify-end">

      <v-btn text @click="gift_user">
        <font-awesome-icon :icon="['fas', 'gift']" />
        <v-tooltip bottom open-delay="500">
          <span>Send Gift</span>
        </v-tooltip>
      </v-btn>
      <v-btn text @click="visit_profile">
        <font-awesome-icon :icon="['fas', 'user']" />
        <v-tooltip bottom open-delay="500">
          <span>View Profile</span>
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
  // import { reactive } from 'vue'
  const props = defineProps(['member'])
  const state = reactive({
    member: props.member
  })
  const visit_profile = () => {
    navigateTo(`/members/${state.member.id}`)
  }
  const gift_user = () => {

    console.log('gift user', state.member)
  }
</script>
<style lang="scss">
  .member-card {

    img { height: 100%; }

    // subtle text-shadow
    .member_name {
      text-shadow: 1px 1px 9px rgb(20 1 1 / 56%);
    }

    .w-100 { width: 100% !important; }
    .h-100 { height: 100% !important; }
  }
</style>