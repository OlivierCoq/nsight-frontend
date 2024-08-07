<template>
  <div>
    <div class="group" uk-toggle="target: #product_modal">
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
          class="absolute right-0 top-0 m-2 bg-slate-100 rounded-full py-0.5 px-2 text-sm font-bold dark:bg-slate-800/60"
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
              :src="props.product.images[0]?.url"
              :alt="props.product.item_data?.name"
              class="object-cover w-full h-full inset-0 hover:cursor-pointer"
            />
          </div>
          <div
            class="w-full md:w-[33%] flex flex-col justify-start items-start"
          >
            <div class="w-full flex flex-row items-end justify-end">
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
            <div
              class="w-full flex flex-col items-start justify-start mt-10 px-8"
            >
              <h2
                class="text-2xl font-bold text-neutral-900 dark:text-white mb-5"
              >
                {{ props.product.item_data?.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-2 flex flex-row justify-between">
      <span class="text-neutral-900 dark:text-white font-thin">
        {{ props.product.item_data?.name }}
      </span>
      <span class="text-neutral-900 dark:text-white font-thin"
        >$
        {{
          format_price(
            props.product.item_data.variations[0].item_variation_data
              .price_money.amount,
          )
        }}</span
      >
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const auth = authStore();
const settings = settingsStore();

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
  snackbar: false,
  snackbar_text: "",
  selected_option: null,
});
const prodStore = productsStore();

const go_to_product = (permalink) => {
  navigateTo(`/shop/products/${permalink}`);
};
const select_option = (variant) => {
  state.product.selected_option =
    variant == state.product.selected_option ? null : variant;
};
const add_to_cart = () => {
  // add product to cart
  // state.loading = true

  // state.snackbar_text = `"${state.product.name}" - (${state.product.selected_option.description}) added to cart!`
  // state.snackbar = true
  // state.loading = false

  navigateTo(`/shop/products/${state.product.id}`);
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
</script>
