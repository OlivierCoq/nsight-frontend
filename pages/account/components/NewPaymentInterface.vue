<template>
  <div class="w-[90%] h-[87%] mx-auto mt-4 rounded-md bg-zinc-700 flex flex-col justify-start items-center">
    
    <div class="relative -mb-px px-2 mt-10 w-full" tabindex="-1" uk-slider="finite: true">

      <h3 class="text-lg font-semibold text-gray-500 dark:text-white text-start ms-3">New Credit Card</h3>

      <nav class="overflow-hidden rounded-xl uk-slider-container pt-2" style="display: none;">
        <ul class="uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-gray-500 text-sm dark:text-white" uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"> 
            
            <li class="w-auto pr-2.5 mx-auto"> 
              <a v-for="(tab, a) in state.tabs" :key="a" href="#" @click="toggle_tab(tab)" 
                class="inline-block p-4 pt-2 border-b-2 border-transparent aria-expanded:text-zinc-500 aria-expanded:border-zinc-500"
                :class="state.open_tab === tab ? 'text-neutral-900 border-black dark:text-white dark:border-white' : 'text-gray-500 dark:text-white/80'"
              > 
                {{ tab.name }} 
              </a> 
            </li>
              
        </ul>
      </nav>
                
    </div>

    <div class="mt-6 mb-20 text-sm font-medium text-gray-600 dark:text-white/80 shadow-xl rounded-md w-[90%] mx-auto h-full">
      <div class="uk-switcher bg-zinc-100 border rounded-xl shadow-sm md:py-12 md:px-20 p-6 overflow-hidden dark:border-zinc-700 dark:bg-zinc-800 w-full h-full"> 
        
       
        <div class="w-[90%] h-full mx-auto" :class="state.open_tab.name === 'Credit Card' ? 'uk-active' : ''">
          <div v-show="state.open_tab.name === 'Credit Card' " id="tab-credit_card" class="min-h-[30rem] mx-10 p-8 pb-20 fade-in">
            
            <form id="payment-form">
              <div id="card-container"></div>
              <button
                id="card-button"
                type="button"
                block
                class="nsight-btn-primary w-full rounded-md py-2 px-4"
              >
                Add card
            </button>
            </form>
            <div id="payment-status-container"></div>
            <p v-if="state.success" class="text-success mt-2 text-green-300">
              {{ state.success }}
            </p>

          </div>
        </div>




      </div>
    </div>

  </div>
</template>

<script setup>


  // Props:

  // Stores:
  const auth = authStore()

  // Emits:
  const emits = defineEmits(['close'])
  

  // Setup
  const runtimeConfig = useRuntimeConfig();
  import { v4 as uuidv4 } from "uuid";

    // Square:
  const appId = runtimeConfig.public.SQUARE_APPLICATION_ID;
  const locationId = runtimeConfig.public.SQUARE_LOCATION_ID;
  let square_loaded;


  // State:
  const state = reactive({
    user: false,
    dialog: false,
    success: false,
    open_tab: false,
    tabs: [
      {
        name: "Credit Card",
        icon: "mdi-credit-card-outline",
        component: "CreditCard",
      },
      {
        name: "PayPal",
        icon: "mdi-paypal",
        component: "PayPal",
      },
      {
        name: "Apple Pay",
        icon: "mdi-apple",
        component: "ApplePay",
      },
      // {
      //   name: 'Google Pay',
      //   icon: 'mdi-google-wallet',
      //   component: 'GooglePay'
      // }
    ],
    edit_method_dialog: false,
    delete_method_dialog: false,
    new_card: {
      name: "",
      address: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postal_code: "",
        state: "",
      },
    },
  });
  

  // Methods
  const toggle_tab = (tab) => {
    state.open_tab = tab

    if(tab.name === 'Credit Card') {
      state.dialog = true
    }

  }

  // Square Methods
  const initializeCard = async (payments) => {
    const card = await payments.card();
    await card.attach("#card-container");
    return card;
  }

  // Lifecycle Hooks
onMounted(() => {

  // Don't fucking question it.
  state.open_tab = state.tabs[0]
  state.dialog = true
})

watch(
  () => state.dialog,
  async () => {
      // Square
    if (!window.Square) {
      throw new Error("Square.js failed to load properly");
    } else {
      // console.log("Square.js loaded", window.Square);

      const payments = window.Square.payments(appId, locationId);
      square_loaded = payments;
      let card;
      try {
        card = await initializeCard(payments);

        // console.log("card", card);
        // Credit Cards: 
        const createPayment = async (token) => {
          const body = JSON.stringify({
            locationId,
            sourceId: token,
            customerId: auth.user.square_id,
            idempotencyKey: uuidv4(),
            amountMoney: {
              amount: 1,
              currency: "USD",
            },
            appFeeMoney: {
              amount: 0,
              currency: "USD",
            },
          });

          const paymentResponse = await $fetch("/api/square/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });
          console.log("paymentResponse", paymentResponse);
          if (paymentResponse.status == "COMPLETED") {
            return paymentResponse;
          }
          // const errorBody = await paymentResponse.text();
          // throw new Error(errorBody);
        };

        const tokenize = async (paymentMethod) => {
          const tokenResult = await paymentMethod.tokenize();
          if (tokenResult.status === "OK") {
            return tokenResult.token;
          } else {
            let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
            if (tokenResult.errors) {
              errorMessage += ` and errors: ${JSON.stringify(
                tokenResult.errors
              )}`;
            }
            throw new Error(errorMessage);
          }
        };

        const displayPaymentResults = (status) => {
          const statusContainer = document.getElementById(
            "payment-status-container"
          );
          if (status === "SUCCESS") {
            statusContainer.classList.remove("is-failure");
            statusContainer.classList.add("is-success");
          } else {
            statusContainer.classList.remove("is-success");
            statusContainer.classList.add("is-failure");
          }

          statusContainer.style.visibility = "visible";
        };

        const handlePaymentMethodSubmission = async (event, paymentMethod) => {
          event.preventDefault();

          try {
            // disable the submit button as we await tokenization and make a
            // payment request.
            cardButton.disabled = true;
            const token = await tokenize(paymentMethod);

            /*
              Use card to get the token, then use token to add card to user's payment methods
            */

            const address = {
              addressLin1: auth?.user?.addresses?.street,
              addressLin2: auth?.user?.addresses?.street2 ?? "",
              locality: auth?.user?.addresses?.town_city,
              administrativeDistrictLevel1: auth?.user?.addresses?.state,
              postalCode: auth?.user?.addresses?.postal_zip_code,
              country: auth?.user?.addresses?.country,
            };

            const body = JSON.stringify({
              idempotencyKey: uuidv4(),
              sourceId: token,
              card: {
                cardholderName: `${auth.user.first_name} ${auth.user.last_name}`,

                customerId: auth.user.square_id,
              },
            });

            // billingAddress: address,

            const newCard = await $fetch("/api/square/customers/create-card", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body,
            });
            // console.log("createCardResponse", newCard);

            auth.user.payment_methods.push(JSON.parse(newCard?.body?.card));
            if (!auth.user.selected_payment_method) {
              auth.user.selected_payment_method = JSON.parse(newCard?.body?.card)
            }
            nextTick(() => {

              auth.updateUser();
              state.success = "Payment method added successfully!";
              state.dialog = false;

              emits('close')
            });

            // const paymentResults = await createPayment(token);
            // displayPaymentResults("SUCCESS");

            // console.debug("Payment Success", paymentResults);
          } catch (e) {
            cardButton.disabled = false;
            displayPaymentResults("FAILURE");
            console.error(e.message);
          }
        };

        const cardButton = document.getElementById("card-button");
        cardButton.addEventListener("click", async function (event) {
          await handlePaymentMethodSubmission(event, card);
        });
      
      
      

      
      
      } catch (e) {
        console.error("Initializing Card failed", e);
        return;
      }
    }
  }
)

</script>

<style lang="scss">

// Square Credit Cards
.sq-card-wrapper .sq-card-message-no-error {
  color: white !important;

  // before:
  &::before {
    background-color: white !important;
  }
}

</style>