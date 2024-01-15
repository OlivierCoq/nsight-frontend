<template>
  <v-card variant="tonal" class="mb-4">
    <v-card-title>
      Personal Info
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-form>
              <v-text-field v-model="auth.user.first_name" label="First Name" outlined dense hide-details class="mb-3" />
              <v-text-field v-model="auth.user.last_name" label="Last Name" outlined dense hide-details class="mb-3" />
              <v-text-field v-model="auth.user.email" label="Email" outlined dense hide-details class="mb-3" />
              <v-text-field v-model="auth.user.nsight_id" label="nSight ID" outlined dense hide-details class="mb-3"
                disabled />
              <v-btn color="info" hide-details class="mt-3" @click="auth.updateUser()">
                Update
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template> 
<script>
import { reactive, nextTick } from 'vue'

export default {
  name: 'EditPersonal',
  setup() {
    const state = reactive({
      user: false,
    })
    const auth = authStore()

    return {
      state,
      auth
    }
  }
}
</script>