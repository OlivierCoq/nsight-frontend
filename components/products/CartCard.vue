<template>
  <v-row class="h-100">
    <v-col cols="6" md="3" lg="3" xl="3" class="h-100">
      <v-img :src="state.product.image.url"  />
    </v-col>
    <v-col cols="6" md="9" lg="9" xl="9" class="h-100">
      <v-row class="h-100">
        <v-col cols="12" md="6" lg="6" xl="6" class="h-100">
          <div class="d-flex flex-column justify-space-between align-start w-100 h-100">
            <h3 class="fw-bold">{{ state.product.name }}</h3>
            <span v-if="state.product.selected_options.length">
              <span v-for="(option, index) in state.product.selected_options" :key="index">
                {{ option.group_name }} - {{ option.option_name }}
              </span>
            </span>
            <span class="my-2">{{ state.product.price.formatted_with_symbol }}</span>
            <v-spacer />
            <v-row>
              <v-col cols="6">
                <div class="d-flex flex-row w-100">
                  <v-text-field v-model="state.num_select" label="Qty" density="compact" type="number" />
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6" class="h-100">
          <div class="d-flex flex-row align-end justify-center">
            <font-awesome-icon :icon="['fas', 'x']" cursor="pointer" @click="remove_from_cart" /> 
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template> 
<script setup>
  import commerce from '~/common/commerce.js'
  import { reactive } from 'vue'
  import { productsStore } from '@/stores/products'


// Lord have mercy upon my soul for this:
import { ofetch } from 'ofetch'
  const runtimeConfig = useRuntimeConfig()
  globalThis.$fetch = ofetch.create({ 
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': runtimeConfig.apiSecret
    }
  })

  const props = defineProps(['product'])
  const state = reactive({
    product: props.product,
    snackbar: false,
    snackbar_text: '',
    num_select: 1
  })
  const prodStore = productsStore()
  const remove_from_cart = () => {
    let target_cart 
    // remove from cart:
    commerce.cart.remove(state.product.id).then((resp) => {
      console.log(resp)
      // prodStore.getCart()
    }).catch((err) => {
      console.log(err)
    })


    // commerce.js wasn't cooperating with me here, so I had to do this
    // $fetch(`https://api.chec.io/v1/carts/${prodStore.cart.id}/items/${state.product.id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     "X-Authorization": "sk_53949a5c411dc56df0ca99f9244ee7dda728fb43df7b9",
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    //   }
    // })
    
  } 
</script>