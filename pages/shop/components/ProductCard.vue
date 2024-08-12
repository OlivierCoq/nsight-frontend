<template>
  <div>
    <div class="group" uk-toggle="target: #product_modal" @click="open_modal">
      <div class="relative overflow-hidden rounded-lg">
        <div
          class="relative w-full md:h-60 h-56 transition-all group-hover:scale-110 duration-300"
        >
          <img
            :src="props.product.images[0]?.url"
            :alt="props.product.item_data?.name"
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
              :alt="props.product.item_data?.name"
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
                class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 dark:bg-zinc-600 uk-modal-close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  :stroke="settings.dark_mode ? 'white' : 'black'"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
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
                  <ion-icon
                    name="close"
                    class="text-xl md hydrated"
                    role="img"
                    aria-label="close"
                  ></ion-icon>
                </button>
              </div>
            </div>

            <div
              class="ctr-item_data w-full flex flex-col items-start justify-start mt-10 px-8"
            >
              <h2
                class="text-2xl font-bold text-neutral-900 dark:text-white mb-5"
              >
                {{ props.product.item_data?.name }}
              </h2>
              <p
                class="text-lg font-thin text-neutral-900 dark:text-white mb-10"
                v-html="props.product.item_data?.description"
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
                <label
                  for="quantity"
                  class="text-neutral-800 dark:text-white text-sm mb-2"
                  >Quantity</label
                >
                <div class="flex flex-col">
                  <input
                    type="number"
                    v-model="state.quantity"
                    class="my-2 bg-transparent border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
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
                    <strong>Style:</strong> &nbsp;
                    <span v-if="state.selected">{{
                      state.selected?.itemVariationData.name
                    }}</span>
                  </p>
                  <ul
                    v-if="
                      state.product.item &&
                      state.product.item.itemData.variations.length
                    "
                    class="-ml-2 uk-slider-items w-[calc(100%+0.875rem)]"
                    uk-scrollspy="target: > li; cls: uk-animation-slide-right-small; delay: 50"
                    uk-lightbox=""
                  >
                    <li
                      v-for="variation in state.product.item.itemData
                        .variations"
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
                            :src="variation.images[0]?.url"
                            :alt="variation.name"
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
        {{ props.product.item_data?.name }}
      </span>
      <span class="text-neutral-900 dark:text-white font-thin text-sm">
        $
        {{
          format_price(
            props.product.item_data.variations[0].item_variation_data
              .price_money.amount,
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
  quantity: 1,
  variations: {
    selected: null,
    options: [],
  },
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
  $fetch("/api/square/retrieve-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props.product.id),
  })
    .then((res) => {
      state.product = res;
      state.product["images"] = [];
      state.product["categories"] = [];

      state.product.related.forEach((obj) => {
        if (obj.type === "IMAGE") {
          obj["modal"] = false;
          state.product["images"].push(obj);
        }
        if (obj.type === "CATEGORY") {
          state.product["categories"].push(obj);
        }
      });

      state.selected = state?.product?.item?.itemData?.variations?.length
        ? state.product.item.itemData.variations[0]
        : state.product.item;
      state.main_img = state.product.images[0].imageData.url;

      // Loop through every variation and loop through each variation's customAttributeValues, and then push the name into state.variations.titles. Make sure to remove duplicates
      state.product.item.itemData.variations?.forEach((variation) => {
        // push variation.customAttributeValues.name into state.variations.titles. Make sure to remove duplicates
        if (
          !state.variations?.titles?.includes(
            Object.entries(variation.customAttributeValues)[0][1],
          ).name
        ) {
          state.variations?.titles?.push(
            Object.entries(variation?.customAttributeValues)[0][1]?.name,
          );
        }
        if (
          !state.variations?.titles?.includes(
            Object.entries(variation.customAttributeValues)[0][1],
          )
        ) {
          state.variations?.options.push(
            Object.entries(variation?.customAttributeValues)[0][1],
          );
        }
      });

      state.loading = false;
    })
    .catch((err) => {
      console.log(err);
    });
};

const select_variation = (variation) => {
  state.selected = variation;
  state.main_img = variation.images[0].url;
};

const add_to_cart = () => {
  // add product to cart
  state.loading = true;

  const line_item_obj = {
    id: state.selected?.id ? state.selected?.id : state.product.item.id,
    quantity: state.quantity,
    name: state.selected?.itemVariationData?.name
      ? state.selected?.itemVariationData?.name
      : state.product.item.itemData.name,
    images: state.selected?.images
      ? state.selected?.images
      : state.product.images,
    appliedTaxes: [],
    appliedDiscounts: [],
    basePriceMoney: {
      amount: state.selected?.itemVariationData?.priceMoney?.amount
        ? state.selected?.itemVariationData?.priceMoney?.amount
        : state.product.item.itemData.variations[0].priceMoney.amount,
      currency: state.selected?.itemVariationData?.priceMoney?.currency
        ? state.selected?.itemVariationData?.priceMoney?.currency
        : state.product.item.itemData.variations[0].priceMoney.currency,
    },
  };

  // Add to cart
  prodStore.add_to_cart(line_item_obj);

  state.toast.show = true;
  state.toast.message = `"${state.selected.itemVariationData.name}" added to cart!`;
  setTimeout(() => {
    state.toast.show = false;
  }, 4000);
};

onMounted(() => {});
</script>
