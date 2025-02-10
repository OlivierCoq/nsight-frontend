 <template>
  <div class="address-card flex gap-10 mb-5">
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-100"> {{ props.address.full_name }} </h3>
      <p class="text-sm text-gray-500 dark:text-gray-200">
        <span>{{ props.address.street }}</span> <br/>
       <span v-if="props.address.street_2"> {{ props.address.street_2}} <br/></span> 
      <span>{{ props.address.town_city }}, {{ props.address.county_state }} {{ props.address.postal_zip_code }}</span>
      </p>
    </div>
    <div class="flex flex-col items-center justify-center ctr-address" :id="`mapContainer-${props.id}`">
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
    street_2: string;
    town_city: string;
    county_state: string;
    postal_zip_code: string;
  };
  id: number;
}>();

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
      await nextTick();
      initMap(lat, lon, id);
    } else {
      console.error('No results found for address:', address);
    }
  } catch (error) {
    console.error('Error fetching geocode for address:', address, error);
  }
};

onMounted(() => {
  const fullAddress = `${props.address.street}, ${props.address.town_city}, ${props.address.county_state}, ${props.address.postal_zip_code}`;
  console.log('Fetching coordinates for:', fullAddress);
  getCoordinates(fullAddress, props.id);
});
</script>

<style lang="scss" scoped>

</style>