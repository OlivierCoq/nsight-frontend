<template>
  <div
    class="py-3 px-5 m-5 shadow-xl bg-zinc-300 dark:bg-zinc-900 min-h-[300px] rounded-md flex flex-col"
  >
    <div class="w-full flex flex-row justify-between items-center mb-3">
      <h2 class="text-neutral-900 dark:text-white font-bold text-xl m-2">
        Address info
      </h2>
      <button
        class="nsight-btn-primary py-2 px-3 rounded-md"
        @click="state.address.add_modal = true"
      >
        ADD +

        <!-- add dialog: -->
        <PrimeDialog
          v-model:visible="state.address.add_modal"
          modal
          header="Add Address"
          :style="{
            width: '50rem',
            backgroundColor: auth.user.preferences[0].dark_mode ? '#18181a' : '#a1a1aa',
            color: 'white',
            padding: '1rem',
          }"
        >
          <div class="w-full flex flex-col min-h-[25vh] bg-zinc-900 dark:bg-black">

            <div class="input_group w-full flex flex-row mt-3">
              <div class="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder:text-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="First Name"
                  v-model="state.address.new_address.first_name"
                  @keydown="validate($event, 'text')"
                />
              </div>
              <div class="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="Last Name"
                  v-model="state.address.new_address.last_name"
                  @keydown="validate($event, 'text')"
                />
              </div>
            </div>

            <div class="input_group w-full flex flex-row mt-3">
              <div class="w-full px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="Street 1"
                  v-model="state.address.new_address.street"
                  @keydown="validate($event, 'text')"
                />
              </div>
            </div>

            <div class="input_group w-full flex flex-row mt-3">
              <div class="w-full px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="Street 2 (optional)"
                  v-model="state.address.new_address.street_2"
                />
              </div>
            </div>

            <div class="input_group w-full flex flex-row mt-3">
              <div class="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="City"
                  v-model="state.address.new_address.town_city"
                  @keydown="validate($event, 'text')"
                />
              </div>
              <div class="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="State (Ex. CA)"
                  v-model="state.address.new_address.county_state"
                  @keydown="validate($event, 'text')"
                />
              </div>
            </div>

            <div class="input_group w-full flex flex-row mt-3">
              <div class="w-full md:w-1/3 px-2">
                <PrimeAutoComplete v-model="state.address.new_address.country" class="w-full" optionLabel="name" :suggestions="filteredCountries" @complete="search" />
              </div>
              <div class="w-full md:w-1/3 px-2">
                <input
                  type="text"
                  class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                  :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                  placeholder="Postal/Zip Code"
                  v-model="state.address.new_address.postal_zip_code"
                  @keyup="validate($event, 'zip')"
                />
                <small class="text-red-500" v-if="state.address.new_address?.zip_error"
                        >{{state.address.new_address?.zip_error}}</small>
              </div>
              <div class="w-full md:w-1/3 px-2">
                <button class="nsight-btn-primary h-full w-full rounded-md px-3" :disabled="!state.validated"
                @click="add_address()">
                  Add new Address
                </button>
              </div>
            </div>

          </div>
        </PrimeDialog>
      </button>
    </div>
    <div class="w-full flex flex-row justify-between items-center">
      <div v-if="auth.user.addresses.shipping.length" class="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        <div 
          v-for="(address, a) in auth?.user?.addresses?.shipping" 
          :key="a" 
          class="rounded-md shadow-md px-3 py-4  flex flex-col align-start justify-start"
          :class="auth.user.selected_addresses && (address.street === auth.user.selected_addresses.street) ? 'bg-zinc-400 dark:bg-zinc-800' : 'bg-zinc-400 dark:bg-zinc-700 opacity-50'"
        >
          <h3 class="text-neutral-200 dark:text-white font-bold me-2">{{ address.first_name }} {{ address.last_name }}</h3> 
          <p class="text-neutral-200 dark:text-white">{{ address.street }}</p>
          <p v-if="address.street_2.length" class="text-neutral-900 dark:text-white">{{ address.street_2 }}</p>
          <p class="text-neutral-200 dark:text-white">{{ address.town_city }}, {{ address.county_state }} {{ address.postal_zip_code }}</p>
          <p class="text-neutral-200 dark:text-white">{{ address.country }}</p>
          <div class="w-full flex flex-row py-2">

            <button class="px-3 py-1 me-2 bg-sky-600 hover:bg-sky-700 text-white text-xs rounded-sm" @click=" state.address.edit_address = address; state.address.edit_modal = true;">
              Edit

              <!-- edit dialog: -->
              <PrimeDialog
                v-model:visible="state.address.edit_modal"
                modal
                header="Add Address"
                :style="{
                  width: '50rem',
                  backgroundColor: auth.user.preferences[0].dark_mode ? '#18181a' : '#a1a1aa',
                  color: 'white',
                  padding: '1rem',
                }"
              >
                <div class="w-full flex flex-col min-h-[25vh] bg-zinc-900 dark:bg-black">

                  <div class="input_group w-full flex flex-row mt-3">
                    <div class="w-full md:w-1/2 px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder:text-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="First Name"
                        v-model="state.address.edit_address.first_name"
                        @keydown="validate($event, 'text')"
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="Last Name"
                        v-model="state.address.edit_address.last_name"
                        @keydown="validate($event, 'text')"
                      />
                    </div>
                  </div>

                  <div class="input_group w-full flex flex-row mt-3">
                    <div class="w-full px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="Street 1"
                        v-model="state.address.edit_address.street"
                        @keydown="validate($event, 'text')"
                      />
                    </div>
                  </div>

                  <div class="input_group w-full flex flex-row mt-3">
                    <div class="w-full px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="Street 2 (optional)"
                        v-model="state.address.edit_address.street_2"
                      />
                    </div>
                  </div>

                  <div class="input_group w-full flex flex-row mt-3">
                    <div class="w-full md:w-1/2 px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="City"
                        v-model="state.address.edit_address.town_city"
                        @keydown="validate($event, 'text')"
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="State (Ex. CA)"
                        v-model="state.address.edit_address.county_state"
                        @keydown="validate($event, 'text')"
                      />
                    </div>
                  </div>

                  <div class="input_group w-full flex flex-row mt-3">
                    <div class="w-full md:w-1/3 px-2">
                      <PrimeAutoComplete v-model="state.address.edit_address.country" class="w-full" optionLabel="name" :suggestions="filteredCountries" @complete="search" />
                    </div>
                    <div class="w-full md:w-1/3 px-2">
                      <input
                        type="text"
                        class="w-full p-2 mb-1 me-3 rounded-md border-gray-300 bg-transparent placeholder:text-neutral-900 dark:placeholder-white dark:text-white"
                        :class=" auth.user.preferences[0].dark_mode ? 'border-dark' : 'border-light'"
                        placeholder="Postal/Zip Code"
                        v-model="state.address.edit_address.postal_zip_code"
                        @keyup="validate($event, 'zip')"
                      />
                      <small class="text-red-500" v-if="state.address.edit_address?.zip_error"
                              >{{state.address.edit_address?.zip_error}}</small>
                    </div>
                    <div class="w-full md:w-1/3 px-2">
                      <button class="nsight-btn-primary h-full w-full rounded-md px-3 uppercase" :disabled="!state.validated"
                      @click="edit_address(address)">
                        Update
                      </button>
                    </div>
                  </div>

                </div>
              </PrimeDialog>

            </button>

            <button 
              v-if="auth.user.selected_addresses && (address.street !== auth.user.selected_addresses.street)" 
              class="px-3 py-1 me-2 bg-green-400 hover:bg-green-500 text-white text-xs rounded-sm"
              @click="set_address_default(address)"
            >
              Default
            </button>

            <button class="px-3 py-1 me-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-sm" @click="state.address.delete_address = true">
              Delete

              <!-- delete dialog: -->
              <PrimeDialog
                v-model:visible="state.address.delete_address"
                modal
                header="Are you sure you want to delete this address?"
                :style="{
                  width: '50rem',
                  backgroundColor: auth.user.preferences[0].dark_mode ? '#18181a' : '#a1a1aa',
                  color: 'white',
                  padding: '1rem',
                }"
              >
                <div class="w-full flex flex-col min-h-[15vh] p-3 bg-zinc-900 dark:bg-black">
                  <div class="w-3/4 flex flex-row">
                    <button class="bg-neutral-600 hover:bg-neutral-700 rounded-md p-3 me-3 text-white w-1/2" @click="state.address.delete_address = false">
                      Cancel
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 rounded-md p-3 text-white w-1/2" @click="delete_address(address)">
                      Delete
                    </button>
                  </div>
                </div>
              </PrimeDialog>

              
            </button>

          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-neutral-900 dark:text-white">No addresses found yet. Add an address to make sure your items get sent to the right place!</p>
      </div>
    </div>
  </div>
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
      zip_error: "" || false
    },
    validate: false,
    edit_address: false,
    edit_modal: false,
    delete_address: false,
    set_default: false,
    add_modal: false,
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
const countries = ref();
const selectedCountry = ref();
const filteredCountries = ref();

const search = (event) => {
    setTimeout(() => {
        if (!event?.query?.trim().length) {
            filteredCountries.value = [...state.country_codes];
        } else {
            filteredCountries.value = state.country_codes.filter((country: Object) => {
                return country?.name?.toLowerCase()?.includes(event.query.toLowerCase());
            });
        }
    }, 250);
}

const edit_address = async (address) => {
  // const medusa_address = {
  //   first_name: auth.user.first_name,
  //   last_name: auth.user.last_name,
  //   address_1: address.street,
  //   address_2: address.street_2,
  //   city: address.town_city,
  //   country_code: address.country,
  //   postal_code: address.postal_zip_code,
  //   province: address.county_state,
  // };
  

  auth.user.addresses.shipping.forEach((a, i) => {
    if (a.n_id === address.n_id) {
      auth.user.addresses.shipping[i] = address;
    }
  });
  state.address.edit_modal = false;
  state.address.edit_address = false;
  auth.updateUser();
};
const delete_address = async (address) => {
  auth.user.addresses.shipping.forEach((a, i) => {
    if (a.n_id === address.n_id) {
      auth.user.addresses.shipping.splice(i, 1);
    }
  });
  auth.updateUser();
  state.address.delete_address = false;
};
const set_address_default = async (address) => {
  auth.user.selected_addresses = address;
  await auth.updateUser();
};
const add_address = async () => {
  const address = {
    first_name: state.address.new_address.first_name,
    last_name: state.address.new_address.last_name,
    full_name: `${state.address.new_address.first_name} ${state.address.new_address.last_name}`,
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
    state.address.add_modal = false;
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
      state.address.new_address.zip_error = state.validated
        ? false
        : "Please enter a valid zip code.";
      state.address.edit_address.zip_error = state.validated
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
      "first_name",
      "last_name",
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
<style lang="scss" scoped>
.ctr-address {
  height: auto !important;
}

input::placeholder {
  color: #ffffff9c !important;
}

input {
  color: #ffffff !important;

}

// Placeholder light and dark mode:
.border-dark {
  border: 1px solid #ffffff2e;
}
.border-light {
  border: 1px solid #0000002e;
}
.p-autocomplete {
  
  
  input::placeholder {
    color: #ffffff9c !important;
  }
  input {
    color: #ffffff !important;
    height: 90%;
    width: 100%;
    background-color: transparent;
    border: 1px solid #ffffff2e;
    border-radius: 5px;
  }


}
  .p-autocomplete-panel {
    background-color: #18181a !important;
    color: #ffffff !important;
    border-radius: 5px;

    .p-autocomplete-items {
      // background-color: #000000 !important;
      color: #ffffff !important;
      border-radius: 5px;

      .p-autocomplete-item {

        color: #ffffff !important;
        border-radius: 5px;
      }
    }
  }
</style>
