<template>
  <v-card variant="tonal">
    <v-card-title class="d-flex flex-row justify-space-between">
      Addresses
      <v-spacer />
      <v-btn color="info" size="small" @click="state.address.add_address = true">
        + Add

        <v-dialog v-model="state.address.add_address" max-width="500">
        <v-card>
          <v-card-title>
            Add Address
          </v-card-title>
          <v-card-text>
            <v-col>
              <v-form>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field
                      v-model="state.address.new_address.name"
                      label="Name"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field
                      v-model="state.address.new_address.street"
                      label="Street"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field
                      v-model="state.address.new_address.town_city"
                      label="City"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field
                      v-model="state.address.new_address.county_state"
                      label="State"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field
                      v-model="state.address.new_address.postal_zip_code"
                      label="Zip"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mt-3" @click="state.address.add_address = false">
              Cancel
            </v-btn>
            <v-btn color="info" class="mt-3 ms-3" :disabled="!state.address.validate" @click="add_address()">
              Add Address
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-if="!auth.user.addresses.data.length">
            <p class="text-center">No Addresses found. Please add a default address for your products.</p>
          </v-col>
          <v-col v-else v-for="(address, a) in auth.user.addresses.data" :key="a" cols="12" sm="12" md="5" lg="5" xl="5">
            <div class="ctr-address px-3 w-100 py-4 me-3 d-flex flex-column align-start justify-start" 
              :class="address.street === auth.user.selected_address.street ? 'selected' : ''"
            >
              <h3 v-if="address.street === auth.user.selected_address.street" class="fw-bold mb-3">
                Default
              </h3>
              <div class="info">
                <p class="fw-bold"><strong>Name:</strong> {{ address.name }} </p>
                <p class="fw-bold"><strong>Street:</strong> {{ address.street }} </p>
                <p class="fw-bold"><strong>City:</strong> {{ address.town_city }} </p>
                <p class="fw-bold"><strong>State:</strong> {{ address.county_state }} </p>
                <p class="fw-bold"><strong>Zip:</strong> {{ address.postal_zip_code }} </p>
              </div>
              <div class="w-100 d-flex flex-row justify-start align-start">
                <v-btn color="info" size="x-small" text class="mt-3" @click="state.address.edit_address = address; state.edit_modal = true">
                  Edit 

                  <v-dialog v-model="state.edit_modal" max-width="500">
                    <v-card>
                      <v-card-title>
                        Edit Address
                      </v-card-title>
                      <v-card-text>
                        <v-col>
                          <v-form>
                            <v-row>
                              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                  v-model="state.address.edit_address.name"
                                  label="Name"
                                  outlined
                                  dense
                                  hide-details
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                  v-model="state.address.edit_address.street"
                                  label="Street"
                                  outlined
                                  dense
                                  hide-details
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                  v-model="state.address.edit_address.town_city"
                                  label="City"
                                  outlined
                                  dense
                                  hide-details
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                  v-model="state.address.edit_address.county_state"
                                  label="State"
                                  outlined
                                  dense
                                  hide-details 
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                  v-model="state.address.edit_addressaddstal_zip_code"
                                  label="Zip"
                                  outlined
                                  dense
                                  hide-details
                                />
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-col>
                      </v-card-text>
                      <v-card-actions>
                        <v-col>
                          <v-btn class="mt-3" @click="state.address.edit_address = false">
                            Cancel
                          </v-btn>
                          <v-btn color="info" class="mt-3 ms-3" @click="edit_address(address)">
                            Save
                          </v-btn>
                        </v-col>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-btn>
                <v-btn color="error" size="x-small" class="mt-3 ms-3" text @click="state.address.delete_address = true">
                  Delete

                  <v-dialog v-model="state.address.delete_address" max-width="500">
                    <v-card>
                      <v-card-title>
                        Delete Address
                      </v-card-title>
                      <v-card-text>
                        <p>Are you sure you want to delete this address?</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn class="mt-3" @click="state.address.delete_address = false">
                          Cancel
                        </v-btn>
                        <v-btn color="error" class="mt-3 ms-3" @click="delete_address(address)">
                          Delete Address
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-btn>
                <v-btn v-if="address.street !== auth.user.selected_address.street" color="primary" size="x-small" class="mt-3 ms-3" text @click="set_address_default(address)">
                  Default
                </v-btn>
              </div>
            </div>
            
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card> 
</template>
<script>
  import { reactive, nextTick } from 'vue'
  import { authStore } from '@/stores/auth'
  import { v4 as uuidv4 } from 'uuid'
  const runtimeConfig = useRuntimeConfig()

  export default {
    name: 'EditAddress',
    setup() {
      const state = reactive({
        address: {
          add_address: false,
          new_address: {
            name: '',
            street: '',
            town_city: '',
            county_state: '',
            postal_zip_code: '',
          },
          validate: false,
          edit_address: false,
          edit_modal: false,
          delete_address: false,
          set_default: false
        }
      })
      const auth = authStore()
      const runtimeConfig = useRuntimeConfig()

      // methods:
      const edit_address = async (address) => {
        
        auth.user.addresses.data.forEach((a, i) => {
          if (a.id === address.id) {
            auth.user.addresses.data[i] = address
          }
        })
        await auth.updateUser()
        state.address.edit_address = false
      }
      const delete_address = async (address) => {

        auth.user.addresses.data.forEach((a, i) => {
          if (a.id === address.id) {
            auth.user.addresses.data.splice(i, 1)
          }
        })
        await auth.updateUser()
        state.address.delete_address = false
      }
      const set_address_default = async (address) => {

        auth.user.selected_address = address
        await auth.updateUser() 
      }
      const add_address = async () => {
        const address = {
          id: uuidv4(),
          name: state.address.new_address.name,
          street: state.address.new_address.street,
          town_city: state.address.new_address.town_city,
          county_state: state.address.new_address.county_state,
          postal_zip_code: state.address.new_address.postal_zip_code,
        }
        auth.user.addresses.data.push(address)
        nextTick(() => {
          auth.updateUser()
        })
        state.address.add_address = false
      }

        // Add address validation:

      const validate_new_address = () => {
        let sugar
        // console.log('validating', Object.values(state.address.new_address))
        Object.values(state.address.new_address).forEach((value) => {
          sugar = value.length
        })
        return sugar
      }

      watch(() => state.address.new_address.name, (value) => { state.address.validate = validate_new_address() })
      watch(() => state.address.new_address.street, (value) => { state.address.validate = validate_new_address() })
      watch(() => state.address.new_address.town_city, (value) => { state.address.validate = validate_new_address() })
      watch(() => state.address.new_address.county_state, (value) => { state.address.validate = validate_new_address() })
      watch(() => state.address.new_address.postal_zip_code, (value) => { state.address.validate = validate_new_address() })

      return {
        state,
        auth,
        runtimeConfig,
        // methods
        edit_address,
        delete_address,
        set_address_default,
        add_address,
        validate_new_address
      }
    }
  }
</script>