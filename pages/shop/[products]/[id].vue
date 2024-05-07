<template>
  <div v-if="state.product" class="h-[100vh] w-full bg-zinc-200 dark:bg-zinc-900 flex flex-col px-3 py-4">
    <div class="container mx-auto p-3 flex flex-col md:flex-row">
      <div v-if="!state.product" class="flex flex-row justify-start items-start">
      <PrimeProgressSpinner style="width: 50px; height: 50px; " strokeWidth="8" fill="var(--surface-ground)"
          animationDuration=".5s" aria-label="Custom ProgressSpinner" />
      </div>
      <div v-else class="w-full md:w-1/2 p-3 flex flex-col">
        <img class="w-full shadow-xl rounded-md" :src="state?.selected?.images[0]?.url" />
        <div class="py-2">
          <PrimeCarousel v-if="state?.product?.images?.length" :value="state?.product?.images" :numVisible="3" circular :numScroll="3" :autoplayInterval="3000">
           <template #item="slotProps">
              <div class="w-[190px] h-[135px] mx-2 bg-cover bg-center rounded-md shadow-lg hover:cursor-pointer" @click="slotProps.data.modal = true" :style="{backgroundImage: `url(${slotProps.data.imageData.url})`}">
                
                <PrimeDialog v-model:visible="slotProps.data.modal"  :style="{ width: '50rem' }">
                  <div class="w-full bg-center bg-cover h-[50rem]" :style="{ backgroundImage: `url(${slotProps.data.imageData.url})` }">

                  </div>
                </PrimeDialog>
              </div>
            </template>
          </PrimeCarousel>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-6 bg-zinc-300 dark:bg-zinc-800 rounded-md shadow-xl mx-3">
        <div class="w-3/4 flex flex-row justify-between">
          <h1 class="text-3xl text-neutral-900 dark:text-neutral-200  font-thin pb-3">{{ state.product?.item?.itemData?.name }}</h1>
          <h2 class="text-xl text-neutral-900 dark:text-neutral-200 font-thin" v-html="format_currency(state.selected?.itemVariationData?.priceMoney?.amount, state.selected?.itemVariationData?.priceMoney?.currency)"></h2>
        </div>
        <!-- <h2 class="text-2xl text-neutral-900 dark:text-neutral-200 uppercase font-thin">$ {{ state.product.variations[0].price_money.amount }}</h2> -->
        <p class="text-lg text-neutral-900 dark:text-neutral-200 opacity-85">{{ state.product?.item?.itemData?.description }}</p>

        <!-- <input v-model="state.quantity" type="number"  /> -->
        <div class="w-full md:w-1/4 mt-5">
          <label for="quantity" class="text-md text-neutral-900 dark:text-neutral-200 font-thin">Quantity</label>
          <input type="number" v-model="state.quantity" class="my-2 bg-transparent border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        </div>
        <div class="w-full flex flex-row justify-start pb-5 items-center">
          <PrimeToast />
          <button v-if="state.product?.item" class="btn-add_to_cart nsight-btn-primary my-1 py-1 w-full md:w-1/2 px-5 text-white shadow-xl rounded-md" @click="add_to_cart">Add to cart</button>
           <font-awesome-icon
            :icon="[ in_favorites() ? 'fas' : 'far', 'heart']"
            class="text-red-500 hover:text-red-600 text-3xl ml-3 hover:cursor-pointer drop-shadow-xl "
            @click="toggle_favorite(state?.product?.item)"
          />
        </div>

        <div class="w-full mt-5 mb-10 flex flex-row items-start">
          <h2 class="text-md text-neutral-900 dark:text-neutral-200 font-thin">Categories: </h2>
          <div class="flex flex-row items-center">
            <p v-for="category in state.product?.categories" :key="category.id" 
              class="mx-2 font-normal hover:cursor-pointer text-neutral-900 dark:text-white opacity-75 hover:opacity-1"
            >
              {{ category.categoryData.name }}
            </p>
          </div>
        </div>

        <div v-if="state.product?.item?.itemData?.variations?.length" class="w-full mb-8 flex flex-col items-start justify-start">
          <h2 class="text-md text-neutral-900 dark:text-neutral-200 font-thin">Styles : <strong>{{ state.selected?.itemVariationData?.name }}</strong></h2>
          <div class="w-full grid grid-cols-6">
            <div 
              v-for="(variation, a) in state.product?.item?.itemData?.variations" :key="a" 
              class="w-[75px] h-[75px] my-4 bg-cover bg-center rounded-md shadow-lg hover:cursor-pointer"
              :class="[(state.selected?.id === variation.id) ? 'border-4 border-yellow-400' : '']"
              :style="{backgroundImage: `url(${variation.images[0]?.url})`}"
              @click="select_variation(variation)"
            ></div>
          </div>
        </div>


        <!-- <div class="w-full flex flex-col"> -->

          <!-- <div v-for="(variation_block, a) in state.variations.titles" :key="a" class="w-full flex flex-col"> -->
            <!-- <h2 class="text-lg text-neutral-900 dark:text-neutral-200 font-thin">{{ variation_block }}:</h2> -->
            <!-- <div v-for="(option, b) in state.variations.options" :key="b" class=""> -->
              <!-- <div v-if="option.name == variation_block" class="w-full"> -->
                <!-- <div class="w-full flex flex-col"> -->
                 <!-- <p class="text-neutral-900 dark:text-white hover:cursor-pointer" @click="select_variation(option)">{{ option.stringValue }}</p>  -->
                  <!-- <div class="grid grid-cols-6"> -->
                    <!-- <div v-for="(variation, c) in state.product?.item?.itemData?.variations" :key="c"> -->
                      <!-- {{ Object.entries(variation.customAttributeValues)[0][1]?.customAttributeDefinitionId }} -->
                      <!-- <p class="text-neutral-900 dark:text-white hover:cursor-pointer" v-html="Object.entries(Object.entries(Object.entries(variation)[5][1]))[0]"></p> -->
                      <!-- <p class="text-neutral-900 dark:text-white hover:cursor-pointer" v-html=""></p> -->
                      <!-- <div  -->
                        <!-- v-if="Object.values(Object.values(variation.customAttributeValues)[0])[2] == option?.customAttributeDefinitionId"  -->
                        <!-- class="w-[75px] h-[75px] my-4 bg-cover bg-center rounded-md shadow-lg hover:cursor-pointer" -->
                        <!-- :style="{backgroundImage: `url(${variation.images[0]?.url})`}" -->
                        <!-- @click="select_variation(variation)" -->
                      <!-- ></div> -->
                      <!-- <div class="w-[75px] h-[75px] my-4 bg-cover bg-center rounded-md shadow-lg hover:cursor-pointer"></div> -->
                    <!-- </div> -->
                  <!-- </div> -->
                <!-- </div> -->
              <!-- </div> -->
            <!-- </div> -->
          <!-- </div> -->
          
        <!-- </div> -->

      </div>
    </div>
  </div>
</template>
<script setup>

  definePageMeta({
    middleware: ['auth'],
    layout: 'inner'
  })

  const product = ref()
  import { useToast } from "primevue/usetoast";
  const toast = useToast();
  const auth = authStore()

      // Data
const prodStore = productsStore(),
  route = useRoute(),
  state = reactive({ 
    product: null,
    max_quantity: 30,
    quantity: 1,
    main_img: null,
    loading: true,
    selected: null,
    variations: {
      titles: [],
      options: []
    }
  })

  onMounted(() => {
     $fetch('/api/square/retrieve-item',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(route.params.id)
  })
  .then((res) => { 
    state.product = res 
    state.product['images'] = []
    state.product['categories'] = []

    state.product.related.forEach((obj) => {
      if(obj.type === 'IMAGE') {
        obj['modal'] = false
        state.product['images'].push(obj)
      }
      if(obj.type === 'CATEGORY') {
        state.product['categories'].push(obj)
      }
    })

    state.selected = state.product.item.itemData.variations?.length ? state.product.item.itemData.variations[0] : state.product.item
    state.main_img = state.product.images[0].imageData.url

    // Loop through every variation and loop through each variation's customAttributeValues, and then push the name into state.variations.titles. Make sure to remove duplicates
    state.product.item.itemData.variations?.forEach((variation) => {
      // push variation.customAttributeValues.name into state.variations.titles. Make sure to remove duplicates
      if(!state.variations.titles.includes(Object.entries(variation.customAttributeValues)[0][1]).name)  { 
        state.variations.titles.push(Object.entries(variation?.customAttributeValues)[0][1]?.name) 
      }
      if(!state.variations.titles.includes(Object.entries(variation.customAttributeValues)[0][1]))  { 
        state.variations.options.push(Object.entries(variation?.customAttributeValues)[0][1]) 
      }
    })
    
    state.loading = false
  })
  .catch((err) => {
    console.log(err)
  })
  })

  // Methods

  const format_currency = (amount, currency) => {
    if(currency === 'USD') {
      return `$${(amount/100).toFixed(2)}`
    }
  }

  const add_to_cart = () => {
    // add product to cart
    state.loading = true
    
    const line_item_obj = {
      id: state.selected?.id ? state.selected?.id : state.product.item.id,
      quantity: state.quantity,
      name: state.selected?.itemVariationData?.name ? state.selected?.itemVariationData?.name : state.product.item.itemData.name,
      images: state.selected?.images ? state.selected?.images : state.product.images,
      appliedTaxes: [],
      appliedDiscounts: [],
      basePriceMoney: {
        amount: state.selected?.itemVariationData?.priceMoney?.amount ? state.selected?.itemVariationData?.priceMoney?.amount : state.product.item.itemData.variations[0].priceMoney.amount,
        currency: state.selected?.itemVariationData?.priceMoney?.currency ? state.selected?.itemVariationData?.priceMoney?.currency : state.product.item.itemData.variations[0].priceMoney.currency
      },
    }

    // Add to cart
    prodStore.add_to_cart(line_item_obj)

    // state.snackbar_text = `"${state.selected.itemVariationData.name}" added to cart!`
    // state.snackbar = true
    // state.loading = false
    toast.add({  detail: `${line_item_obj.name} added to cart!`, life: 30000 }) 
  }

  const select_variation = (variation) => {
    state.selected = variation
  }

  const in_favorites = () => {
    // Check if a product with the same ID is in the favorites
    return auth?.user?.favorites?.products?.includes(state.product?.item?.id);
  }

  const toggle_favorite = (product) => {
      if (auth?.user?.favorites?.products?.includes(state.product?.item?.id)) {
        auth.user.favorites.products = auth.user.favorites.products.filter(p => p !== product.id)
      } else {
        auth.user.favorites.products.push(product.id)
      }
      nextTick(()=> {
        auth.updateUser()
      })
    }

</script>
<style lang="scss">
  .p-progress-spinner {

    .p-progress-spinner-circle {
      color: #f6e232 !important;
    }
  }
  .p-toast {
    background-color: #f6e232 !important;
    color: #000 !important;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0 2rem 0 2rem;
    border-radius: 5px;
  }
  // .p-toast-message-content {
  //   background-color: #f6e232 !important;
  //   color: #000 !important;
  // }
</style>