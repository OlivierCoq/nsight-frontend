<template>
  <div>
    <div class="group" uk-toggle="target: #product_modal" @click="open_modal">
      <div class="relative overflow-hidden rounded-lg">
        <div
          class="relative w-full md:h-60 h-56 transition-all group-hover:scale-110 duration-300"
        >
          <img
            :src="props.product.images[0]?.imageData?.url"
            :alt="props.product.itemData?.name"
            class="object-cover w-full h-full inset-0 hover:cursor-pointer"
          />
        </div>
        <div
          class="absolute right-0 top-0 m-2 bg 100 rounded-full py-0.5 px-2 text-sm font-bold dark:bg-slate-800/60"
        >
          <font-awesome-icon
            :icon="[in_favorites() ? 'fas' : 'far', 'heart']"
            class="text-red-500 hover:text-red-600 hover:cursor-pointer"
            @click="toggle_favorite(props.product)"
          >
          </font-awesome-icon>
        </div>
      </div>
    </div>

    <!-- Product modal -->
    <div
      v-if="state.modal"
      class="lg:p-20 p-10 uk-modal"
      id="product_modal"
      uk-modal=""
      :class="settings.dark_mode ? 'dark' : ''"
    >
      <div
        class="tt relative mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-xl"
        style="min-width: 80vw !important"
      >
        <div class="p-0 rounded-md overflow-hidden flex flex-col md:flex-row">
          <div class="w-full md:w-[66%]">
            <img
              :src="state.main_img"
              :alt="props.product.itemData?.name"
              class="object-cover w-full h-full inset-0 hover:cursor-pointer"
            />
          </div>
          <div
            class="w-full md:w-[33%] flex flex-col justify-start items-start"
          >
            <!-- Close button -->
            <div
              class="ctr-close_btn w-full flex flex-row items-end justify-end"
            >
              <button
                type="button"
                class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 dark:bg-zinc-600 uk-modal-close h-[30px] w-[30px] flex flex-col justify-center items-center"
                @click="close_modal"
              >
                <font-awesome-icon :icon="['fas', 'times']" class="text-white" />
              </button>
            </div>

            <!-- purchase toast -->
            <div
              v-show="state.toast.show"
              class="p-2 border fade-in fade-out bg-green-50 border-green-500/30 rounded-xl dark:bg-zinc-700 fixed top-[15px] right-[30px] z-50 min-w-[26rem]"
            >
              <div class="flex flex-row items-start align-center">
                <!-- icon -->
                <div
                  class="p-1 text-white bg-green-500 shadow rounded-xl shadow-green-300 me-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>

                <!-- text -->
                <div class="font-semibold text-white">
                  <p class="mb-0">
                    {{ state.selected?.itemVariationData?.name }} <br />
                    <span class="font-thin">added to cart!</span>
                  </p>
                </div>

                <!-- icon close -->
                <button
                  type="button"
                  class="flex h-full flex-col opacity-1 top-[8px] justify-start items-start p-1 text-gray-600 rounded-lg ml-auto uk-alert-close"
                  @click="state.toast.show = false"
                >
                  <font-awesome-icon
                    :icon="['fas', 'times']"
                    class="text-gray-600"
                  />
                </button>
              </div>
            </div>

            <div
              class="ctr-item_data w-full flex flex-col items-start justify-start mt-10 px-8"
            >
              <h2
                class="text-2xl font-bold text-neutral-900 dark:text-white mb-5"
              >
                {{ props.product.itemData?.name }}
              </h2>
              <p
                class="text-lg font-thin text-neutral-900 dark:text-white mb-10"
                v-html="props.product.itemData?.description"
              ></p>
              <div class="ctr-price">
                <p
                  class="text-xl mt-4 mb-8 text-neutral-900 dark:text-white font-thin"
                  v-html="
                    format_currency(
                      state.selected?.itemVariationData?.priceMoney?.amount,
                      state.selected?.itemVariationData?.priceMoney?.currency,
                    )
                  "
                ></p>
              </div>
              <div
                class="w-full flex flex-col justify-center place-content-center"
              >
                
                <div class="flex flex-col">
                  
                  <div class="w-full flex flex-col justify-start mb-2">
                    <label for="quantity" class="text-neutral-800 dark:text-white text-sm mb-2">Quantity</label>
                    <input
                      type="number"
                      v-model="state.quantity"
                      class="my-2 bg-transparent border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  
                  <div v-if="state.product.options[0]?.itemOptionData?.name == 'Size'" class="w-full flex flex-col justify-start mb-2">
                    <label
                      for="size"
                      class="text-neutral-800 dark:text-white text-sm mb-2"
                    >
                      Size
                    </label>
                    <!-- Select: -->
                    <select
                      v-model="state.selected"
                      class="my-2 bg-transparent border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option
                        v-for="(variation, a) in state.product?.itemData?.variations"
                        :key="a"
                        :value="variation"
                      >
                        {{ variation.itemVariationData.name }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="w-full flex flex-row">
                    <!-- add to cart button -->
                    <button
                      class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg my-3 w-3/4 me-2"
                      :class="
                        !state.quantity || state.quantity < 1
                          ? 'opacity-[0.5]'
                          : 'opacity-1'
                      "
                      :disabled="!state.quantity || state.quantity < 1"
                      @click="add_to_cart"
                    >
                      Add to cart
                    </button>
                    <!-- heart/like and unlike button: -->
                    <button
                      class="bg-white/10 hover:bg-white/20 text-gray-800 font-bold py-2 px-4 rounded-lg my-3 w-1/4"
                      @click="toggle_favorite(props.product)"
                    >
                      <font-awesome-icon
                        :icon="[in_favorites() ? 'fas' : 'far', 'heart']"
                        class="text-red-500 hover:text-red-600"
                      />
                    </button>
                  </div>
                </div>
                
              </div>

              <!-- Variation details: -->
              <div
                class="relative mt-5"
                tabindex="-1"
                uk-slider="autoplay: true;finite: true"
              >
                <div class="overflow-hidden uk-slider-container py-10">
                  <p
                    class="text-md font-thin text-neutral-900 dark:text-white lowercase"
                  >
                    <strong v-if="state.product.options[0]?.itemOptionData?.name !== 'Size'">Options:</strong> &nbsp;
                    <span v-if="state.selected && state.product.options[0]?.itemOptionData?.name !== 'Size'">{{
                      state.selected?.itemVariationData.name
                    }}</span>
                  </p>

                  <ul
                    v-if="
                      state.selected &&
                      state.product.itemData?.variations?.length &&
                      state.product.options[0]?.itemOptionData?.name !== 'Size'
                    "
                    class="-ml-2 uk-slider-items w-[calc(100%+0.875rem)]"
                    uk-scrollspy="target: > li; cls: uk-animation-slide-right-small; delay: 50"
                    uk-lightbox=""
                  >
                    <li
                      v-for="(variation, a) in state.product?.itemData?.variations" :key="a"
                      class="lg:w-1/2 sm:w-[90%] w-1/2 pr-3.5 max-lg:hidden uk-animation-fade"
                      uk-scrollspy-class="uk-animation-fade"
                    >
                      <div
                        class="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100 hover:cursor-pointer"
                      >
                        <div
                          class="w-full lg:h-64 aspect-[2.5/4] relative"
                          :class="
                            variation.id == state.selected.id
                              ? 'rounded-xl border-4 shadow-xl border-zinc-300'
                              : ''
                          "
                        >
                          <img
                            class="rounded-lg w-full h-full object-cover inset-0"
                            :src="variation.images[0]?.imageData?.url"
                            :alt="variation.itemVariationData?.name"
                            @click="select_variation(variation)"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-2 flex flex-col justify-between">
      <span class="text-neutral-900 dark:text-white font-thin">
        {{ props.product.itemData?.name }}
      </span>
      <span class="text-neutral-900 dark:text-white font-thin text-sm">
        $
        {{
          format_price(
            props.product?.itemData?.variations[0]?.itemVariationData?.priceMoney?.amount

          )
        }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

// Stores
const auth = authStore();
const settings = settingsStore();
const prodStore = productsStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const state = reactive({
  product: props.product,
  modal: false,
  show_options: false,
  toast: {
    show: false,
    message: "",
  },
  selected_option: null,
  selected: null,
  quantity: 1,
  variations: {
    selected: null,
    options: [],
  },
  options: [],
});

const go_to_product = (permalink) => {
  navigateTo(`/shop/products/${permalink}`);
};
const select_option = (variant) => {
  state.product.selected_option =
    variant == state.product.selected_option ? null : variant;
};

const format_price = (amount) => {
  return amount / 100;
};

const in_favorites = () => {
  // Check if a product with the same ID is in the favorites
  return auth?.user?.favorites?.products?.includes(props.product.id);
};

const toggle_favorite = (product) => { 
  if (!auth.user.favorites) {
    auth.user.favorites = { products: [] };
  }
  if (auth?.user?.favorites?.products?.includes(product.id)) {
    auth.user.favorites.products = auth.user.favorites.products.filter(
      (p) => p !== product.id,
    );
  } else {
    auth.user.favorites.products.push(product.id);
  }
  nextTick(() => {
    auth.updateUser();
  });
};

const format_currency = (amount, currency) => {
  if (currency === "USD") {
    return `$${(amount / 100).toFixed(2)}`;
  }
};

const open_modal = () => {
  state.loading = false
  state.product = props.product;
  

  // Set the selected variation to the first one
  state.selected = props.product.itemData.variations[0];
  state.main_img = props.product.itemData.variations[0].images[0]?.imageData?.url;

  nextTick(() => {
    state.modal = true;
  });

};

const close_modal = () => {
  state.loading = true;
  state.product = null;
  state.modal = false;
}

const select_variation = (variation) => {
  state.selected = variation;
  nextTick(() => {
    state.main_img = state.selected?.images[0]?.imageData?.url;
  });
};

const add_to_cart = () => {
  // add product to cart
  state.loading = true;

  const line_item_obj = {
    id: state.selected?.id ? state.selected?.id : state.product.id,
    quantity: state.quantity,
    name: state.selected?.itemVariationData?.name
      ? state.selected?.itemVariationData?.name
      : state.product.itemData.name,
    images: state.selected?.images
      ? state.selected?.images
      : state.product.images,
    appliedTaxes: [],
    appliedDiscounts: [],
    basePriceMoney: {
      amount: state.selected?.itemVariationData?.priceMoney?.amount
        ? state.selected?.itemVariationData?.priceMoney?.amount
        : state.product.itemData.variations[0].priceMoney.amount,
      currency: state.selected?.itemVariationData?.priceMoney?.currency
        ? state.selected?.itemVariationData?.priceMoney?.currency
        : state.product.itemData.variations[0].priceMoney.currency,
    },
  };

  // Add to cart
  prodStore.add_to_cart(line_item_obj);

  state.toast.show = true;
  state.toast.message = `"${state.selected.itemVariationData.name}" added to cart!`;
  setTimeout(() => {
    nextTick(() => {
      state.toast.show = false;
    });
  }, 4000);
};

onMounted(() => {});
</script>
