<template>
  <v-card variant="tonal" class="mb-4">
    <v-card-title class="d-flex flex-row justify-space-between mb-3">
      Payment Methods
      <v-spacer />
      <v-btn
        class="nsight-btn-primary"
        size="small"
        @click="state.dialog = true"
      >
        + Add

        <v-dialog v-model="state.dialog" max-width="700">
          <v-card>
            <v-card-title> Add new Payment Method </v-card-title>
            <v-card-text>
              <v-tabs
                v-model="state.current_tab"
                background-color="transparent"
                show-arrows
              >
                <v-tab v-for="(tab, index) in state.tabs" :key="index">
                  <v-icon>{{ tab.icon }}</v-icon>
                  {{ tab.name }}
                </v-tab>
              </v-tabs>
              <v-window v-model="state.current_tab">
                <div v-show="state.current_tab == 0" class="tab_window">
                  <!-- Credit card form: -->
                  <v-card variant="tonal" class="mt-5">
                    <v-card-title>Card Details</v-card-title>
                    <v-card-text>
                      <v-progress-circular
                        v-if="!square_loaded"
                        indeterminate
                        color="primary"
                      />

                      <div class="ctr-card">
                        <!-- <div id="card-element"></div> -->
                        <form id="payment-form">
                          <div id="card-container"></div>
                          <v-btn
                            id="card-button"
                            type="button"
                            block
                            class="nsight-btn-primary btn"
                          >
                            Add card
                          </v-btn>
                        </form>
                        <div id="payment-status-container"></div>
                        <p v-if="state.success" class="text-success mt-2">
                          {{ state.success }}
                        </p>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
                <div v-if="state.current_tab == 1" class="tab_window"></div>
                <!-- <div v-if="state.current_tab == 0" class="tab_window">
                  
                </div>
                <div v-if="state.current_tab == 0" class="tab_window">
                  
                </div> -->
              </v-window>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                style="color: #9d9021 !important"
                text
                @click="state.dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                style="color: #f6e232 !important"
                text
                @click="add_new"
                :disabled="!state.success"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row v-if="auth.user.payment_methods">
        <v-col
          cols="12"
          md="6"
          v-for="(payment_method, a) in auth.user.payment_methods.data"
          :key="a"
        >
          <v-card
            :variant="
              auth.user.selected_payment_method.card &&
              auth.user.selected_payment_method.card.id ==
                payment_method.card.id
                ? 'tonal'
                : 'plain'
            "
            class="mb-0"
          >
            <v-card-title>
              <font-awesome-icon
                :icon="[
                  'fab',
                  format_card_brand(payment_method.card.cardBrand),
                ]"
              />
              <small
                v-if="
                  auth.user.selected_payment_method &&
                  auth.user.selected_payment_method.card.id ==
                    payment_method.card.id
                "
                class="text-uppercase"
              >
                | Default</small
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <p class="text--white">
                    <span class="text-uppercase">
                      {{ payment_method.card.cardholderName }}
                    </span>
                    |
                    <span class="text-uppercase">
                      {{ payment_method.card.brand }} ...{{
                        payment_method.card.last4
                      }}
                    </span>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="info"
                size="small"
                text
                @click="state.edit_method_dialog = true"
              >
                Edit

                <v-dialog v-model="state.edit_method_dialog" width="500">
                  <v-card>
                    <v-card-title> Edit Payment Method </v-card-title>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-btn
                v-if="
                  auth.user.selected_payment_method.card.id !==
                  payment_method.card.id
                "
                color="primary"
                size="small"
                text
                @click="set_default(payment_method)"
              >
                Set as Default
              </v-btn>
              <v-btn
                color="error"
                size="small"
                text
                :disabled="
                  auth.user.selected_payment_method.card.id ===
                  payment_method.card.id
                "
                @click="state.delete_method_dialog = true"
              >
                Delete

                <v-dialog v-model="state.delete_method_dialog" width="500">
                  <v-card>
                    <v-card-title> Delete Payment Method </v-card-title>
                    <v-card-text>
                      <p class="text--white">
                        Are you sure you want to delete this payment method?
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="primary"
                        text
                        @click="state.delete_method_dialog = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="error"
                        text
                        @click="delete_method(payment_method)"
                      >
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <p class="text--white text-start px-4 pb-6">
          Add a payment method to use for your next order.
        </p>
      </v-row>
    </v-card-text>
  </v-card>
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
              // state.dialog = false;
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
</style>
