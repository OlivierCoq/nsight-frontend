<template>
   <div
      class="mt-5 py-3 px-5 ms-2 me-5 shadow-xl bg-zinc-300 dark:bg-zinc-900 min-h-[300px] rounded-md flex flex-col"
    >
    <div class="w-full flex flex-row justify-between items-center mb-3">
      <h2 class="text-neutral-900 dark:text-white font-bold text-xl m-2">
        Payment methods
      </h2>
      <button
        class="nsight-btn-primary py-2 px-3 rounded-md"
        @click="state.dialog = true"
      >
        ADD +

         <!-- new method dialog: -->
         <PrimeDialog
          v-model:visible="state.dialog"
          modal
          header="Add New Payment Method"
          :style="{
            width: '50rem',
            backgroundColor: auth.user.preferences[0].dark_mode ? '#18181a' : '#a1a1aa',
            color: 'white',
            padding: '1rem',
          }"
        >
          <div class="w-full flex flex-col min-h-[25vh] bg-zinc-900 dark:bg-black">
            <PrimeTabView>
              <PrimeTabPanel v-for="(tab, index) in state.tabs" :key="index" :header="tab.name">
                <div v-show="index == 0" class="tab_window">
                  <div class="ctr-card">
                    <!-- <div id="card-element"></div> -->
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
              </PrimeTabPanel>
            </PrimeTabView>
          </div>
        </PrimeDialog>

      </button>
    </div>
    <div class="w-full flex flex-row justify-between items-center">
      <div v-if="auth.user.payment_methods.data.length" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div 
          v-for="(payment_method, a) in auth?.user?.payment_methods?.data" 
          :key="a" 
          class="rounded-md shadow-md px-3 py-4  flex flex-col align-start justify-start"
          :class="auth.user.selected_payment_method && (payment_method.card.id == auth.user.selected_payment_method.card.id) ? 'bg-zinc-400 dark:bg-zinc-800' : 'bg-zinc-400 dark:bg-zinc-700 opacity-50'"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// Medusa
// const medusa_client = useMedusaClient();

// stores
const auth = authStore();

import { v4 as uuidv4 } from "uuid";

const state = reactive({
  user: false,
  dialog: false,
  success: false,
  current_tab: 0,
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

const runtimeConfig = useRuntimeConfig();

const appId = runtimeConfig.public.SQUARE_APPLICATION_ID;
const locationId = runtimeConfig.public.SQUARE_LOCATION_ID;

let square_loaded;

const set_default = (method) => {
  auth.user.selected_payment_method = method;
  nextTick(() => {
    auth.updateUser();
  });
};

const add_new = async () => {
  state.dialog = false;
};

const format_card_brand = (str) => {
  switch (str) {
    case "VISA":
      return "cc-visa";
    case "MASTERCARD":
      return "cc-mastercard";
    case "AMERICAN_EXPRESS":
      return "cc-amex";
    case "DISCOVER":
      return "cc-discover";
    case "DISCOVER_DINERS":
      return "cc-diners-club";
    case "JCB":
      return "cc-jcb";
    default:
      return "credit-card";
  }
};

const delete_method = (method) => {
  auth.user.payment_methods.data = auth.user.payment_methods.data.filter(
    (m) => {
      return m.card.id !== method.card.id;
    }
  );
  nextTick(() => {
    auth.updateUser();
    state.delete_method_dialog = false;
  });
};

watch(
  () => state.dialog,
  async () => {
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

            const newCard = await $fetch("/api/square/create-card", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body,
            });
            console.log("createCardResponse", newCard);

            auth.user.payment_methods.data.push(newCard);
            if (!auth.user.selected_payment_method) {
              auth.user.selected_payment_method = newCard;
            }
            nextTick(() => {
              // add payment method to Medusa
              auth.updateUser();
              state.success = "Payment method added successfully!";
              state.dialog = false;
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
);

const initializeCard = async (payments) => {
  const card = await payments.card();
  await card.attach("#card-container");
  return card;
};
</script>
<style lang="scss">
.tab_window {
  min-height: 300px;
  overflow-y: auto;
}

.ctr-card {
}

.sq-card-wrapper .sq-card-message-no-error {
  color: white !important;

  // before:
  &::before {
    background-color: white !important;
  }
}

.nsight-btn-primary {
  background-color: #f6e232 !important;
  color: rgb(39, 39, 39);

  &:hover {
    background-color: #e4d22e !important;
  }
}

.p-tabview-header {
  color: #8f8f8f !important;
}
.p-tabview-header.p-highlight {
  color: white !important;
}

</style>
