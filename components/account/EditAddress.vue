<template>
  <v-card variant="tonal">
    <v-card-title class="d-flex flex-row justify-space-between">
      Addresses
      <v-spacer />
      <v-btn
        class="nsight-btn-primary"
        size="small"
        @click="state.address.add_address = true"
      >
        + Add

        <v-dialog v-model="state.address.add_address" max-width="500">
          <v-card>
            <v-card-title> Add Address </v-card-title>
            <v-card-text>
              <v-col>
                <v-form>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                      <v-text-field
                        v-model="state.address.new_address.first_name"
                        label="First Name"
                        outlined
                        dense
                        hide-details
                        @keydown="validate($event, 'text')"
                      />
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                      <v-text-field
                        v-model="state.address.new_address.last_name"
                        label="Last Name"
                        outlined
                        dense
                        hide-details
                        @keydown="validate($event, 'text')"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                      <v-text-field
                        v-model="state.address.new_address.street"
                        label="Street"
                        outlined
                        dense
                        @keydown="validate($event, 'text')"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                      <v-text-field
                        v-model="state.address.new_address.street_2"
                        label="Street 2 (Optional)"
                        outlined
                        @keydown="validate($event, 'text')"
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
                        @keydown="validate($event, 'text')"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                      <v-text-field
                        v-model="state.address.new_address.county_state"
                        label="State"
                        outlined
                        dense
                        @keydown="validate($event, 'text')"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="7" sm="7" md="7" lg="7" xl="7">
                      <v-autocomplete
                        label="Country"
                        v-model="state.address.new_address.country"
                        :items="state.country_codes"
                        outlined
                        dense
                        item-title="name"
                        item-value="code"
                        @keydown="validate($event, 'country')"
                        return-object
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="state.address.new_address.postal_zip_code"
                        label="Zip"
                        outlined
                        dense
                        @keyup="validate($event, 'zip')"
                        hide-details
                      />
                      <small v-if="state.address.new_address.zip_error"
                        >Please enter a valid zip code.</small
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-btn class="mt-3" @click="state.address.add_address = false">
                Cancel
              </v-btn>
              <v-btn
                style="color: #9d9021"
                class="mt-3 ms-3"
                :disabled="!state.validated"
                @click="add_address()"
              >
                Add Address
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-if="!auth.user.addresses || !auth.user.addresses.shipping.length"
        >
          <p class="text-start">
            No addresses found. Please add a default address for your products.
          </p>
        </v-col>
        <v-col
          v-else
          v-for="(address, a) in auth.user.addresses.shipping"
          :key="a"
          cols="12"
          sm="12"
          md="5"
          lg="5"
          xl="5"
        >
          <div
            class="ctr-address px-3 w-100 py-4 me-3 d-flex flex-column align-start justify-start"
            :class="
              auth.user.selected_addresses &&
              address.street === auth.user.selected_addresses.street
                ? 'selected'
                : ''
            "
          >
            <h3
              v-if="
                auth.user.selected_addresses &&
                address.street === auth.user.selected_addresses.street
              "
              class="fw-bold mb-3"
            >
              Default
            </h3>
            <div class="info">
              <p class="fw-bold">
                <strong>Name:</strong> {{ address.first_name }}
                {{ address.last_name }}
              </p>
              <p class="fw-bold">
                <strong>Street:</strong> {{ address.street }}
              </p>
              <p class="fw-bold">
                <strong>Street:</strong> {{ address.street_2 }}
              </p>
              <p class="fw-bold">
                <strong>City:</strong> {{ address.town_city }}
              </p>
              <p class="fw-bold">
                <strong>State:</strong> {{ address.county_state }}
              </p>
              <p class="fw-bold">
                <strong>Zip:</strong> {{ address.postal_zip_code }}
              </p>
            </div>
            <div class="w-100 d-flex flex-row justify-start align-start">
              <v-btn
                color="info"
                size="x-small"
                text
                class="mt-3"
                @click="
                  state.address.edit_address = address;
                  state.address.edit_modal = true;
                "
              >
                Edit

                <v-dialog v-model="state.address.edit_modal" max-width="500">
                  <v-card>
                    <v-card-title> Edit Address </v-card-title>
                    <v-card-text>
                      <v-col>
                        <v-form>
                          <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                              <v-text-field
                                v-model="state.address.edit_address.first_name"
                                label="First"
                                outlined
                                dense
                                hide-details
                                @keydown="validate($event, 'text')"
                              />
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                              <v-text-field
                                v-model="state.address.edit_address.last_name"
                                label="Last"
                                outlined
                                dense
                                hide-details
                                @keydown="validate($event, 'text')"
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                              <v-text-field
                                v-model="state.address.edit_address.street"
                                label="Street"
                                outlined
                                dense
                                @keydown="validate($event, 'text')"
                                hide-details
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                              <v-text-field
                                v-model="state.address.edit_address.street_2"
                                label="Street 2 (Optional)"
                                outlined
                                @keydown="validate($event, 'text')"
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
                                @keydown="validate($event, 'text')"
                                hide-details
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                              <v-text-field
                                v-model="
                                  state.address.edit_address.county_state
                                "
                                label="State"
                                outlined
                                dense
                                @keydown="validate($event, 'text')"
                                hide-details
                              />
                            </v-col>
                            <v-col cols="7" sm="7" md="7" lg="7" xl="7">
                              <v-autocomplete
                                label="Country"
                                v-model="state.address.edit_address.country"
                                :items="state.country_codes"
                                outlined
                                dense
                                item-title="name"
                                item-value="code"
                                @keydown="validate($event, 'country')"
                                return-object
                              ></v-autocomplete>
                            </v-col>
                            <v-col cols="5">
                              <v-text-field
                                v-model="
                                  state.address.edit_address.postal_zip_code
                                "
                                label="Zip"
                                outlined
                                dense
                                @keyup="validate($event, 'zip')"
                                hide-details
                              />
                              <small v-if="state.address.edit_address.zip_error"
                                >Please enter a valid zip code.</small
                              >
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-col>
                    </v-card-text>
                    <v-card-actions>
                      <v-col>
                        <v-btn
                          class="mt-3"
                          @click="state.address.edit_address = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="info"
                          class="mt-3 ms-3"
                          @click="edit_address(address)"
                        >
                          Save
                        </v-btn>
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-btn
                color="error"
                size="x-small"
                class="mt-3 ms-3"
                text
                @click="state.address.delete_address = true"
              >
                Delete

                <v-dialog
                  v-model="state.address.delete_address"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title> Delete Address </v-card-title>
                    <v-card-text>
                      <p>Are you sure you want to delete this address?</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        class="mt-3"
                        style="color: #9d9021"
                        @click="state.address.delete_address = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="error"
                        class="mt-3 ms-3"
                        @click="delete_address(address)"
                      >
                        Delete Address
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-btn
                v-if="
                  auth.user.selected_addresses &&
                  address.street !== auth.user.selected_addresses.street
                "
                color="primary"
                size="x-small"
                class="mt-3 ms-3"
                text
                @click="set_address_default(address)"
              >
                Default
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
// Libraries + Config
import { v4 as uuidv4 } from "uuid";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";
const runtimeConfig = useRuntimeConfig();

// Stores
const settings = settingsStore();

// Medusa
const medusa_client = useMedusaClient();

const state = reactive({
  address: {
    add_address: false,
    new_address: {
      first_name: "",
      last_name: "",
      street: "",
      street_2: "",
      town_city: "",
      county_state: "",
      postal_zip_code: "",
      country: {
        name: "United States",
        dial_code: "+1",
        code: "US",
      },
    },
    validate: false,
    edit_address: false,
    edit_modal: false,
    delete_address: false,
    set_default: false,
  },
  validated: false,
  country_codes: [
    {
      name: "Afghanistan",
      dial_code: "+93",
      code: "AF",
    },
    {
      name: "Aland Islands",
      dial_code: "+358",
      code: "AX",
    },
    {
      name: "Albania",
      dial_code: "+355",
      code: "AL",
    },
    {
      name: "Algeria",
      dial_code: "+213",
      code: "DZ",
    },
    {
      name: "AmericanSamoa",
      dial_code: "+1684",
      code: "AS",
    },
    {
      name: "Andorra",
      dial_code: "+376",
      code: "AD",
    },
    {
      name: "Angola",
      dial_code: "+244",
      code: "AO",
    },
    {
      name: "Anguilla",
      dial_code: "+1264",
      code: "AI",
    },
    {
      name: "Antarctica",
      dial_code: "+672",
      code: "AQ",
    },
    {
      name: "Antigua and Barbuda",
      dial_code: "+1268",
      code: "AG",
    },
    {
      name: "Argentina",
      dial_code: "+54",
      code: "AR",
    },
    {
      name: "Armenia",
      dial_code: "+374",
      code: "AM",
    },
    {
      name: "Aruba",
      dial_code: "+297",
      code: "AW",
    },
    {
      name: "Australia",
      dial_code: "+61",
      code: "AU",
    },
    {
      name: "Austria",
      dial_code: "+43",
      code: "AT",
    },
    {
      name: "Azerbaijan",
      dial_code: "+994",
      code: "AZ",
    },
    {
      name: "Bahamas",
      dial_code: "+1242",
      code: "BS",
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      code: "BH",
    },
    {
      name: "Bangladesh",
      dial_code: "+880",
      code: "BD",
    },
    {
      name: "Barbados",
      dial_code: "+1246",
      code: "BB",
    },
    {
      name: "Belarus",
      dial_code: "+375",
      code: "BY",
    },
    {
      name: "Belgium",
      dial_code: "+32",
      code: "BE",
    },
    {
      name: "Belize",
      dial_code: "+501",
      code: "BZ",
    },
    {
      name: "Benin",
      dial_code: "+229",
      code: "BJ",
    },
    {
      name: "Bermuda",
      dial_code: "+1441",
      code: "BM",
    },
    {
      name: "Bhutan",
      dial_code: "+975",
      code: "BT",
    },
    {
      name: "Bolivia, Plurinational State of",
      dial_code: "+591",
      code: "BO",
    },
    {
      name: "Bosnia and Herzegovina",
      dial_code: "+387",
      code: "BA",
    },
    {
      name: "Botswana",
      dial_code: "+267",
      code: "BW",
    },
    {
      name: "Brazil",
      dial_code: "+55",
      code: "BR",
    },
    {
      name: "British Indian Ocean Territory",
      dial_code: "+246",
      code: "IO",
    },
    {
      name: "Brunei Darussalam",
      dial_code: "+673",
      code: "BN",
    },
    {
      name: "Bulgaria",
      dial_code: "+359",
      code: "BG",
    },
    {
      name: "Burkina Faso",
      dial_code: "+226",
      code: "BF",
    },
    {
      name: "Burundi",
      dial_code: "+257",
      code: "BI",
    },
    {
      name: "Cambodia",
      dial_code: "+855",
      code: "KH",
    },
    {
      name: "Cameroon",
      dial_code: "+237",
      code: "CM",
    },
    {
      name: "Canada",
      dial_code: "+1",
      code: "CA",
    },
    {
      name: "Cape Verde",
      dial_code: "+238",
      code: "CV",
    },
    {
      name: "Cayman Islands",
      dial_code: "+ 345",
      code: "KY",
    },
    {
      name: "Central African Republic",
      dial_code: "+236",
      code: "CF",
    },
    {
      name: "Chad",
      dial_code: "+235",
      code: "TD",
    },
    {
      name: "Chile",
      dial_code: "+56",
      code: "CL",
    },
    {
      name: "China",
      dial_code: "+86",
      code: "CN",
    },
    {
      name: "Christmas Island",
      dial_code: "+61",
      code: "CX",
    },
    {
      name: "Cocos (Keeling) Islands",
      dial_code: "+61",
      code: "CC",
    },
    {
      name: "Colombia",
      dial_code: "+57",
      code: "CO",
    },
    {
      name: "Comoros",
      dial_code: "+269",
      code: "KM",
    },
    {
      name: "Congo",
      dial_code: "+242",
      code: "CG",
    },
    {
      name: "Congo, The Democratic Republic of the Congo",
      dial_code: "+243",
      code: "CD",
    },
    {
      name: "Cook Islands",
      dial_code: "+682",
      code: "CK",
    },
    {
      name: "Costa Rica",
      dial_code: "+506",
      code: "CR",
    },
    {
      name: "Cote d'Ivoire",
      dial_code: "+225",
      code: "CI",
    },
    {
      name: "Croatia",
      dial_code: "+385",
      code: "HR",
    },
    {
      name: "Cuba",
      dial_code: "+53",
      code: "CU",
    },
    {
      name: "Cyprus",
      dial_code: "+357",
      code: "CY",
    },
    {
      name: "Czech Republic",
      dial_code: "+420",
      code: "CZ",
    },
    {
      name: "Denmark",
      dial_code: "+45",
      code: "DK",
    },
    {
      name: "Djibouti",
      dial_code: "+253",
      code: "DJ",
    },
    {
      name: "Dominica",
      dial_code: "+1767",
      code: "DM",
    },
    {
      name: "Dominican Republic",
      dial_code: "+1849",
      code: "DO",
    },
    {
      name: "Ecuador",
      dial_code: "+593",
      code: "EC",
    },
    {
      name: "Egypt",
      dial_code: "+20",
      code: "EG",
    },
    {
      name: "El Salvador",
      dial_code: "+503",
      code: "SV",
    },
    {
      name: "Equatorial Guinea",
      dial_code: "+240",
      code: "GQ",
    },
    {
      name: "Eritrea",
      dial_code: "+291",
      code: "ER",
    },
    {
      name: "Estonia",
      dial_code: "+372",
      code: "EE",
    },
    {
      name: "Ethiopia",
      dial_code: "+251",
      code: "ET",
    },
    {
      name: "Falkland Islands (Malvinas)",
      dial_code: "+500",
      code: "FK",
    },
    {
      name: "Faroe Islands",
      dial_code: "+298",
      code: "FO",
    },
    {
      name: "Fiji",
      dial_code: "+679",
      code: "FJ",
    },
    {
      name: "Finland",
      dial_code: "+358",
      code: "FI",
    },
    {
      name: "France",
      dial_code: "+33",
      code: "FR",
    },
    {
      name: "French Guiana",
      dial_code: "+594",
      code: "GF",
    },
    {
      name: "French Polynesia",
      dial_code: "+689",
      code: "PF",
    },
    {
      name: "Gabon",
      dial_code: "+241",
      code: "GA",
    },
    {
      name: "Gambia",
      dial_code: "+220",
      code: "GM",
    },
    {
      name: "Georgia",
      dial_code: "+995",
      code: "GE",
    },
    {
      name: "Germany",
      dial_code: "+49",
      code: "DE",
    },
    {
      name: "Ghana",
      dial_code: "+233",
      code: "GH",
    },
    {
      name: "Gibraltar",
      dial_code: "+350",
      code: "GI",
    },
    {
      name: "Greece",
      dial_code: "+30",
      code: "GR",
    },
    {
      name: "Greenland",
      dial_code: "+299",
      code: "GL",
    },
    {
      name: "Grenada",
      dial_code: "+1473",
      code: "GD",
    },
    {
      name: "Guadeloupe",
      dial_code: "+590",
      code: "GP",
    },
    {
      name: "Guam",
      dial_code: "+1671",
      code: "GU",
    },
    {
      name: "Guatemala",
      dial_code: "+502",
      code: "GT",
    },
    {
      name: "Guernsey",
      dial_code: "+44",
      code: "GG",
    },
    {
      name: "Guinea",
      dial_code: "+224",
      code: "GN",
    },
    {
      name: "Guinea-Bissau",
      dial_code: "+245",
      code: "GW",
    },
    {
      name: "Guyana",
      dial_code: "+595",
      code: "GY",
    },
    {
      name: "Haiti",
      dial_code: "+509",
      code: "HT",
    },
    {
      name: "Holy See (Vatican City State)",
      dial_code: "+379",
      code: "VA",
    },
    {
      name: "Honduras",
      dial_code: "+504",
      code: "HN",
    },
    {
      name: "Hong Kong",
      dial_code: "+852",
      code: "HK",
    },
    {
      name: "Hungary",
      dial_code: "+36",
      code: "HU",
    },
    {
      name: "Iceland",
      dial_code: "+354",
      code: "IS",
    },
    {
      name: "India",
      dial_code: "+91",
      code: "IN",
    },
    {
      name: "Indonesia",
      dial_code: "+62",
      code: "ID",
    },
    {
      name: "Iran, Islamic Republic of Persian Gulf",
      dial_code: "+98",
      code: "IR",
    },
    {
      name: "Iraq",
      dial_code: "+964",
      code: "IQ",
    },
    {
      name: "Ireland",
      dial_code: "+353",
      code: "IE",
    },
    {
      name: "Isle of Man",
      dial_code: "+44",
      code: "IM",
    },
    {
      name: "Israel",
      dial_code: "+972",
      code: "IL",
    },
    {
      name: "Italy",
      dial_code: "+39",
      code: "IT",
    },
    {
      name: "Jamaica",
      dial_code: "+1876",
      code: "JM",
    },
    {
      name: "Japan",
      dial_code: "+81",
      code: "JP",
    },
    {
      name: "Jersey",
      dial_code: "+44",
      code: "JE",
    },
    {
      name: "Jordan",
      dial_code: "+962",
      code: "JO",
    },
    {
      name: "Kazakhstan",
      dial_code: "+77",
      code: "KZ",
    },
    {
      name: "Kenya",
      dial_code: "+254",
      code: "KE",
    },
    {
      name: "Kiribati",
      dial_code: "+686",
      code: "KI",
    },
    {
      name: "Korea, Democratic People's Republic of Korea",
      dial_code: "+850",
      code: "KP",
    },
    {
      name: "Korea, Republic of South Korea",
      dial_code: "+82",
      code: "KR",
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      code: "KW",
    },
    {
      name: "Kyrgyzstan",
      dial_code: "+996",
      code: "KG",
    },
    {
      name: "Laos",
      dial_code: "+856",
      code: "LA",
    },
    {
      name: "Latvia",
      dial_code: "+371",
      code: "LV",
    },
    {
      name: "Lebanon",
      dial_code: "+961",
      code: "LB",
    },
    {
      name: "Lesotho",
      dial_code: "+266",
      code: "LS",
    },
    {
      name: "Liberia",
      dial_code: "+231",
      code: "LR",
    },
    {
      name: "Libyan Arab Jamahiriya",
      dial_code: "+218",
      code: "LY",
    },
    {
      name: "Liechtenstein",
      dial_code: "+423",
      code: "LI",
    },
    {
      name: "Lithuania",
      dial_code: "+370",
      code: "LT",
    },
    {
      name: "Luxembourg",
      dial_code: "+352",
      code: "LU",
    },
    {
      name: "Macao",
      dial_code: "+853",
      code: "MO",
    },
    {
      name: "Macedonia",
      dial_code: "+389",
      code: "MK",
    },
    {
      name: "Madagascar",
      dial_code: "+261",
      code: "MG",
    },
    {
      name: "Malawi",
      dial_code: "+265",
      code: "MW",
    },
    {
      name: "Malaysia",
      dial_code: "+60",
      code: "MY",
    },
    {
      name: "Maldives",
      dial_code: "+960",
      code: "MV",
    },
    {
      name: "Mali",
      dial_code: "+223",
      code: "ML",
    },
    {
      name: "Malta",
      dial_code: "+356",
      code: "MT",
    },
    {
      name: "Marshall Islands",
      dial_code: "+692",
      code: "MH",
    },
    {
      name: "Martinique",
      dial_code: "+596",
      code: "MQ",
    },
    {
      name: "Mauritania",
      dial_code: "+222",
      code: "MR",
    },
    {
      name: "Mauritius",
      dial_code: "+230",
      code: "MU",
    },
    {
      name: "Mayotte",
      dial_code: "+262",
      code: "YT",
    },
    {
      name: "Mexico",
      dial_code: "+52",
      code: "MX",
    },
    {
      name: "Micronesia, Federated States of Micronesia",
      dial_code: "+691",
      code: "FM",
    },
    {
      name: "Moldova",
      dial_code: "+373",
      code: "MD",
    },
    {
      name: "Monaco",
      dial_code: "+377",
      code: "MC",
    },
    {
      name: "Mongolia",
      dial_code: "+976",
      code: "MN",
    },
    {
      name: "Montenegro",
      dial_code: "+382",
      code: "ME",
    },
    {
      name: "Montserrat",
      dial_code: "+1664",
      code: "MS",
    },
    {
      name: "Morocco",
      dial_code: "+212",
      code: "MA",
    },
    {
      name: "Mozambique",
      dial_code: "+258",
      code: "MZ",
    },
    {
      name: "Myanmar",
      dial_code: "+95",
      code: "MM",
    },
    {
      name: "Namibia",
      dial_code: "+264",
      code: "NA",
    },
    {
      name: "Nauru",
      dial_code: "+674",
      code: "NR",
    },
    {
      name: "Nepal",
      dial_code: "+977",
      code: "NP",
    },
    {
      name: "Netherlands",
      dial_code: "+31",
      code: "NL",
    },
    {
      name: "Netherlands Antilles",
      dial_code: "+599",
      code: "AN",
    },
    {
      name: "New Caledonia",
      dial_code: "+687",
      code: "NC",
    },
    {
      name: "New Zealand",
      dial_code: "+64",
      code: "NZ",
    },
    {
      name: "Nicaragua",
      dial_code: "+505",
      code: "NI",
    },
    {
      name: "Niger",
      dial_code: "+227",
      code: "NE",
    },
    {
      name: "Nigeria",
      dial_code: "+234",
      code: "NG",
    },
    {
      name: "Niue",
      dial_code: "+683",
      code: "NU",
    },
    {
      name: "Norfolk Island",
      dial_code: "+672",
      code: "NF",
    },
    {
      name: "Northern Mariana Islands",
      dial_code: "+1670",
      code: "MP",
    },
    {
      name: "Norway",
      dial_code: "+47",
      code: "NO",
    },
    {
      name: "Oman",
      dial_code: "+968",
      code: "OM",
    },
    {
      name: "Pakistan",
      dial_code: "+92",
      code: "PK",
    },
    {
      name: "Palau",
      dial_code: "+680",
      code: "PW",
    },
    {
      name: "Palestinian Territory, Occupied",
      dial_code: "+970",
      code: "PS",
    },
    {
      name: "Panama",
      dial_code: "+507",
      code: "PA",
    },
    {
      name: "Papua New Guinea",
      dial_code: "+675",
      code: "PG",
    },
    {
      name: "Paraguay",
      dial_code: "+595",
      code: "PY",
    },
    {
      name: "Peru",
      dial_code: "+51",
      code: "PE",
    },
    {
      name: "Philippines",
      dial_code: "+63",
      code: "PH",
    },
    {
      name: "Pitcairn",
      dial_code: "+872",
      code: "PN",
    },
    {
      name: "Poland",
      dial_code: "+48",
      code: "PL",
    },
    {
      name: "Portugal",
      dial_code: "+351",
      code: "PT",
    },
    {
      name: "Puerto Rico",
      dial_code: "+1939",
      code: "PR",
    },
    {
      name: "Qatar",
      dial_code: "+974",
      code: "QA",
    },
    {
      name: "Romania",
      dial_code: "+40",
      code: "RO",
    },
    {
      name: "Russia",
      dial_code: "+7",
      code: "RU",
    },
    {
      name: "Rwanda",
      dial_code: "+250",
      code: "RW",
    },
    {
      name: "Reunion",
      dial_code: "+262",
      code: "RE",
    },
    {
      name: "Saint Barthelemy",
      dial_code: "+590",
      code: "BL",
    },
    {
      name: "Saint Helena, Ascension and Tristan Da Cunha",
      dial_code: "+290",
      code: "SH",
    },
    {
      name: "Saint Kitts and Nevis",
      dial_code: "+1869",
      code: "KN",
    },
    {
      name: "Saint Lucia",
      dial_code: "+1758",
      code: "LC",
    },
    {
      name: "Saint Martin",
      dial_code: "+590",
      code: "MF",
    },
    {
      name: "Saint Pierre and Miquelon",
      dial_code: "+508",
      code: "PM",
    },
    {
      name: "Saint Vincent and the Grenadines",
      dial_code: "+1784",
      code: "VC",
    },
    {
      name: "Samoa",
      dial_code: "+685",
      code: "WS",
    },
    {
      name: "San Marino",
      dial_code: "+378",
      code: "SM",
    },
    {
      name: "Sao Tome and Principe",
      dial_code: "+239",
      code: "ST",
    },
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      code: "SA",
    },
    {
      name: "Senegal",
      dial_code: "+221",
      code: "SN",
    },
    {
      name: "Serbia",
      dial_code: "+381",
      code: "RS",
    },
    {
      name: "Seychelles",
      dial_code: "+248",
      code: "SC",
    },
    {
      name: "Sierra Leone",
      dial_code: "+232",
      code: "SL",
    },
    {
      name: "Singapore",
      dial_code: "+65",
      code: "SG",
    },
    {
      name: "Slovakia",
      dial_code: "+421",
      code: "SK",
    },
    {
      name: "Slovenia",
      dial_code: "+386",
      code: "SI",
    },
    {
      name: "Solomon Islands",
      dial_code: "+677",
      code: "SB",
    },
    {
      name: "Somalia",
      dial_code: "+252",
      code: "SO",
    },
    {
      name: "South Africa",
      dial_code: "+27",
      code: "ZA",
    },
    {
      name: "South Sudan",
      dial_code: "+211",
      code: "SS",
    },
    {
      name: "South Georgia and the South Sandwich Islands",
      dial_code: "+500",
      code: "GS",
    },
    {
      name: "Spain",
      dial_code: "+34",
      code: "ES",
    },
    {
      name: "Sri Lanka",
      dial_code: "+94",
      code: "LK",
    },
    {
      name: "Sudan",
      dial_code: "+249",
      code: "SD",
    },
    {
      name: "Suriname",
      dial_code: "+597",
      code: "SR",
    },
    {
      name: "Svalbard and Jan Mayen",
      dial_code: "+47",
      code: "SJ",
    },
    {
      name: "Swaziland",
      dial_code: "+268",
      code: "SZ",
    },
    {
      name: "Sweden",
      dial_code: "+46",
      code: "SE",
    },
    {
      name: "Switzerland",
      dial_code: "+41",
      code: "CH",
    },
    {
      name: "Syrian Arab Republic",
      dial_code: "+963",
      code: "SY",
    },
    {
      name: "Taiwan",
      dial_code: "+886",
      code: "TW",
    },
    {
      name: "Tajikistan",
      dial_code: "+992",
      code: "TJ",
    },
    {
      name: "Tanzania, United Republic of Tanzania",
      dial_code: "+255",
      code: "TZ",
    },
    {
      name: "Thailand",
      dial_code: "+66",
      code: "TH",
    },
    {
      name: "Timor-Leste",
      dial_code: "+670",
      code: "TL",
    },
    {
      name: "Togo",
      dial_code: "+228",
      code: "TG",
    },
    {
      name: "Tokelau",
      dial_code: "+690",
      code: "TK",
    },
    {
      name: "Tonga",
      dial_code: "+676",
      code: "TO",
    },
    {
      name: "Trinidad and Tobago",
      dial_code: "+1868",
      code: "TT",
    },
    {
      name: "Tunisia",
      dial_code: "+216",
      code: "TN",
    },
    {
      name: "Turkey",
      dial_code: "+90",
      code: "TR",
    },
    {
      name: "Turkmenistan",
      dial_code: "+993",
      code: "TM",
    },
    {
      name: "Turks and Caicos Islands",
      dial_code: "+1649",
      code: "TC",
    },
    {
      name: "Tuvalu",
      dial_code: "+688",
      code: "TV",
    },
    {
      name: "Uganda",
      dial_code: "+256",
      code: "UG",
    },
    {
      name: "Ukraine",
      dial_code: "+380",
      code: "UA",
    },
    {
      name: "United Arab Emirates",
      dial_code: "+971",
      code: "AE",
    },
    {
      name: "United Kingdom",
      dial_code: "+44",
      code: "GB",
    },
    {
      name: "United States",
      dial_code: "+1",
      code: "US",
    },
    {
      name: "Uruguay",
      dial_code: "+598",
      code: "UY",
    },
    {
      name: "Uzbekistan",
      dial_code: "+998",
      code: "UZ",
    },
    {
      name: "Vanuatu",
      dial_code: "+678",
      code: "VU",
    },
    {
      name: "Venezuela, Bolivarian Republic of Venezuela",
      dial_code: "+58",
      code: "VE",
    },
    {
      name: "Vietnam",
      dial_code: "+84",
      code: "VN",
    },
    {
      name: "Virgin Islands, British",
      dial_code: "+1284",
      code: "VG",
    },
    {
      name: "Virgin Islands, U.S.",
      dial_code: "+1340",
      code: "VI",
    },
    {
      name: "Wallis and Futuna",
      dial_code: "+681",
      code: "WF",
    },
    {
      name: "Yemen",
      dial_code: "+967",
      code: "YE",
    },
    {
      name: "Zambia",
      dial_code: "+260",
      code: "ZM",
    },
    {
      name: "Zimbabwe",
      dial_code: "+263",
      code: "ZW",
    },
  ],
});
const auth = authStore();

// methods:
const edit_address = async (address) => {
  const medusa_address = {
    first_name: auth.user.first_name,
    last_name: auth.user.last_name,
    address_1: address.street,
    address_2: address.street_2,
    city: address.town_city,
    country_code: address.country,
    postal_code: address.postal_zip_code,
    province: address.county_state,
  };

  // Update Medusa
  medusa_client.customers.addresses
    .updateAddress(address.n_id, medusa_address)
    .then(({ customer }) => {
      auth.user.addresses.shipping.forEach((a, i) => {
        if (a.n_id === address.n_id) {
          auth.user.addresses.shipping[i] = address;
        }
      });
      state.address.edit_modal = false;
      state.address.edit_address = false;
      auth.updateUser();
    });
};
const delete_address = async (address) => {
  // Delete from medusa
  medusa_client.customers.addresses
    .deleteAddress(address.n_id)
    .then((res) => {
      console.log("address deleted from medusa", res);
      auth.user.addresses.shipping.forEach((a, i) => {
        if (a.n_id === address.n_id) {
          auth.user.addresses.shipping.splice(i, 1);
        }
      });
      auth.updateUser();
      state.address.delete_address = false;
    })
    .catch((error) => {
      console.log("error deleting address from medusa", error);
    });
};
const set_address_default = async (address) => {
  auth.user.selected_addresses = address;
  await auth.updateUser();
};
const add_address = async () => {
  const address = {
    name: state.address.new_address.name,
    street: state.address.new_address.street,
    street_2: state.address.new_address.street_2,
    town_city: state.address.new_address.town_city,
    county_state: state.address.new_address.county_state,
    postal_zip_code: state.address.new_address.postal_zip_code,
    country: state.address.new_address.country.code,
  };

  auth.user.addresses.shipping.push(address);
  nextTick(() => {
    auth.updateUser();
    state.address.add_address = false;
  });

  // update Medusa
  // medusa_client.customers.addresses
  //   .addAddress({
  //     address: {
  //       first_name: auth.user.first_name,
  //       last_name: auth.user.last_name,
  //       address_1: address.street,
  //       address_2: address.street_2,
  //       city: address.town_city,
  //       country_code: address.country,
  //       postal_code: address.postal_zip_code,
  //       province: address.county_state,
  //     },
  //   })
  //   .then(({ customer }) => {
  //     console.log("address added to medusa", customer);

  //     auth.user.medusa_id = customer.id;

  //     customer.shipping_addresses.forEach((addr) => {
  //       if (
  //         addr.address_1 == address.street &&
  //         addr.address_2 == address.street_2
  //       ) {
  //         address["n_id"] = addr.id;
  //       }
  //     });

  //     auth.user.addresses.shipping.push(address);
  //     nextTick(() => {
  //       auth.updateUser();
  //       state.address.add_address = false;
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("error adding address to medusa", error);
  //   });
};

// Add address validation:

const validate_new_address = () => {
  let sugar;
  console.log("validating", Object.values(state.address.new_address));
  Object.values(state.address.new_address).forEach((value) => {
    // Ensure that all fields are filled in, even if object:
    if (value === null || value === undefined || value === "") {
      sugar = false;
    } else {
      sugar = true;
    }
  });
  return sugar;
};

const validate = (entry, type) => {
  let val = entry.target.value;
  let val_type = type;

  switch (val_type) {
    case "text":
      state.validated = val.length > 2;
      break;
    case "zip":
      state.validated = postcodeValidator(
        val,
        state.address.new_address.country.code
      );
      // console.log('validating zip', postcodeValidator(val, state.address.new_address.country.code))
      state.address.new_address["zip_error"] = state.validated
        ? false
        : "Please enter a valid zip code.";
      state.address.edit_address["zip_error"] = state.validated
        ? false
        : "Please enter a valid zip code.";
      break;
    default:
      state.validated = val.length > 2;
      break;
  }
};

// state.validated = every field is filled in:
watch(
  () => state.address.new_address,
  (newAddress) => {
    const requiredFields = [
      "name",
      "street",
      "town_city",
      "county_state",
      "postal_zip_code",
      "country",
    ];
    state.validated = requiredFields.every(
      (field) =>
        newAddress.hasOwnProperty(field) &&
        newAddress[field] !== null &&
        newAddress[field] !== undefined &&
        newAddress[field] !== ""
    );
  },
  { deep: true }
);
</script>
<style lang="scss">
.ctr-address {
  height: auto !important;
}
</style>
