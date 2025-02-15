 <template>
  <div class="address-card flex gap-10 mb-5 relative">
    <div class="flex-1 flex flex-col gap-2">
      <div class="w-full">
        <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-100"> {{ props.address.full_name }} </h3>
        <p class="text-sm text-gray-500 dark:text-gray-200">
        <span>{{ props.address.street }}</span> <br/>
        <span v-if="props.address.street2"> {{ props.address.street2}} <br/></span> 
        <span>{{ props.address.town_city }}, {{ props.address.county_state }} {{ props.address.postal_zip_code }}</span>
        </p>
      </div>
      <div class="w-full flex flex-col justify-start items-start">
        <div class="w-full flex flex-row justify-start items-center">
          <p v-if="auth.user.selected_addresses" class="m-0">
            <span
              v-if="(auth.user?.selected_addresses?.shipping?.street && (auth.user?.selected_addresses?.shipping?.street === props.address.street))"
            class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-500 uppercase">Default</span>
            <span v-else @click="setAddressAsDefault(props.id)" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-300 cursor-pointer">Set as default</span>
          </p>
          <span @click="state.edit_address = true" class="py-1.5 px-5 font-semibold text-sm me-2 text-yellow-300 cursor-pointer">Edit</span>
          <span @click="state.confirm_delete = true" class="py-1.5 px-5 font-semibold text-sm me-2 text-red-300 cursor-pointer">Delete</span>
        </div>
      </div>
      <!-- Confirm delete modal -->
      <div class="w-full absolute top-0 left-0 h-full w-full bg-black/80 bg-opacity-50" style="z-index: 99999 !important;" v-if="state.confirm_delete">
        <div class="w-96 bg-zinc-900 p-5 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-100 text-center">Are you sure you want to delete this address?</h3>
          <div class="w-full flex flex-row justify-center items-center mt-5">
            <button @click="state.confirm_delete = false" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-300 cursor-pointer">Cancel</button>
            <button @click="deleteAddress(props.id)" class="py-1.5 px-5 font-semibold text-sm me-2 text-red-300 cursor-pointer">Delete</button>
          </div>
        </div>
      </div>
      <!-- Edit address modal -->
      <div class="w-full absolute top-0 left-0 h-full w-full bg-black/80 bg-opacity-50" style="z-index: 99999 !important;" v-if="state.edit_address">
        <div class="w-96 bg-zinc-900 p-5 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 ">
          <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-100 text-center">Edit address</h3>
          <div class="w-full flex flex-col gap-2 mt-5">
            <div class="w-full flex flex-row">
              <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 me-1" v-model="props.address.first_name" />
              <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 me-1" v-model="props.address.last_name" />
            </div>
            <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="props.address.street" />
            <input v-if="props.address.street2" type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700"  v-model="props.address.street2" />
            <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="props.address.town_city" />
            <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="props.address.county_state" />
            <input type="text" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700" v-model="props.address.postal_zip_code" />
            <select v-model="props.address.country" class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700">
              <option v-for="country in auth.country_codes" :value="country.code" :key="country.code">{{ country.name }}</option>
            </select>
            <div class="w-full flex flex-row justify-center items-center mt-5">
              <button @click="state.edit_address = false" class="py-1.5 px-5 font-semibold text-sm me-2 text-blue-300 cursor-pointer">Cancel</button>
              <button @click="updateAddress(props.address)" class="py-1.5 px-5 font-semibold text-sm me-2 text-yellow-300 cursor-pointer">Update</button>
            </div>
          </div>
        </div>
      </div>  
    </div>
    <div v-if="props.address" class="flex flex-col items-center justify-center ctr-address" :id="`mapContainer-${props.id}`">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white">
        <path d="M12 2C7.03 2 3 6.03 3 11c0 4.5 9 13 9 13s9-8.5 9-13c0-4.97-4.03-9-9-9zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 1a2 2 0 100 4 2 2 0 000-4z"/>
      </svg>
      <p class="text-sm text-white"> {{ props.address.street }} </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps, nextTick } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const props = defineProps<{
  address: {
    full_name: string;
    street: string;
    street2: string;
    town_city: string;
    county_state: string;
    postal_zip_code: string;
  };
  id: number;
}>();

// Stores
const auth = authStore()

// state
const state = reactive({
  confirm_delete: false,
  edit_address: false,
})



interface Address {
  full_name: string;
  street: string;
  street2: string | null;
  town_city: string;
  county_state: string;
  postal_zip_code: string;
  country: string | null;
  coordinates: {
    lat: number | null;
    lon: number | null;
  };
}


// Methods
const initMap = (lat: number | string, lon: number | string, id: number) => {
  const map = L.map(`mapContainer-${id}`).setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker([lat, lon]).addTo(map);
};

const getCoordinates = async (address: string, id: number) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      await nextTick(() => {
        initMap(lat, lon, id);
      });
      
    } else {
      console.error('No results found for address:', address);
    }
  } catch (error) {
    console.error('Error fetching geocode for address:', address, error);
  }
};

   // CRUD operations


const deleteAddress = async (id: number) => {
  console.log('Deleting address with id:', id);
  

  const target = auth.user.addresses.shipping.findIndex((addr: any) => addr.street === props.address.street);
  // console.log('Target:', target);
  //remove target from addresses:
  if(target !== -1) {
    auth.user.addresses.shipping.splice(target, 1);
  }
  await auth.updateUser()
  nextTick(()=> {
    state.confirm_delete = false
  })
};

const updateAddress = async (address: Address) => {

  const target = auth.user.addresses.shipping.findIndex((addr: any) => addr.street === address.street);
  // console.log('Target:', target);
  //replace target with address:
  if(target !== -1) {
    auth.user.addresses.shipping[target] = address;
  }
  await auth.updateUser()
  nextTick(()=> {
    state.edit_address = false
  })
};

const setAddressAsDefault = async (id: number) => {
  console.log('Setting address with id as default:', id);
  auth.user.selected_addresses.shipping = props.address;
  await auth.updateUser()
  
};

// Lifecycle hooks
onMounted(async () => {

  if(!props.address.coordinates) {
    const fullAddress = `${props.address.street}, ${props.address.town_city}, ${props.address.county_state}, ${props.address.postal_zip_code}`;
    console.log('Fetching coordinates for:', fullAddress);
    await getCoordinates(fullAddress, props.id);
  } else {
    await nextTick(() => {
      initMap(props.address.coordinates.lat!, props.address.coordinates.lon!, props.id);
    });
  }
  
});
</script>

<style lang="scss" scoped>

</style>