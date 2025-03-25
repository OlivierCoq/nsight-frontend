<template>
  <div class="w-full mt-5">
    <div 
      class="w-full  border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="handleDrop"
    >
      <p v-if="!dragging" class="text-neutral-800 dark:text-zinc-200 font-thin text-center my-20">
        Drag and drop images here, or <span class="text-amber-500 font-semibold cursor-pointer" @click="selectFiles">browse</span>
      </p>
      <p v-else class="text-amber-500 font-semibold">Drop images now</p>
      <input type="file" multiple accept="image/*" class="hidden" ref="fileInput" @change="handleFileSelect" />
    </div>

    <div class="mt-3 flex flex-wrap gap-3">
      <div v-for="(image, index) in previewImages" :key="index" class="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300">
        <img :src="image" class="w-full h-full object-cover" />
        <button 
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs h-6 w-6 flex items-center justify-center"
          @click="removeImage(index)"
        >✕</button>
      </div>
    </div>

    <button 
      v-if="selectedFiles.length > 0" 
      class="w-full mt-3 bg-amber-500 text-white rounded-md p-2 fade-in"
      @click="uploadPics()"
      :disabled="state.processing"
    >
      {{ state.processing ? "Uploading..." : "Upload Images" }}
    </button>
    <p v-if="state.picture_upload.success" class="text-green-500 mt-2">{{ state.picture_upload.success }}</p>
    <p v-if="state.picture_upload.error" class="text-red-500 mt-2">{{ state.picture_upload.error }}</p>
  </div>
</template>

<script setup>

  const props = defineProps({
    post: {
      type: Object, 
      required: true
    },
    expand: {
      type: Boolean,
      default: false
    }
  })

  // state
  const state = reactive({
    processing: false,
    picture_upload: {
      success: '',
      error: ''
    }
  })

// Emits
const emit = defineEmits(['pictureUploaded', 'videoUploaded']);


  // Methods
const fileInput = ref(null);
const selectedFiles = ref([]);
const previewImages = ref([]);
const dragging = ref(false);

const selectFiles = () => fileInput.value.click();

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
};

const handleDrop = (event) => {
  dragging.value = false;
  const files = Array.from(event.dataTransfer.files);
  state.picture_upload.error = '';
  processFiles(files);
};

const processFiles = (files) => {
  console.log('Processing files:', files);
  state.picture_upload.error = '';
  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      selectedFiles.value.push(file);
      const reader = new FileReader();
      reader.onload = (e) => previewImages.value.push(e.target.result);
      reader.readAsDataURL(file);
    }
  });
};

const removeImage = (index) => {
  selectedFiles.value.splice(index, 1);
  previewImages.value.splice(index, 1);
};


const fileupload = ref()
const uploadPics = async () => {
  const formData = new FormData();
  // console.log('event:', event);


  selectedFiles.value.forEach((file) => {
    formData.append('files', file);
  });
  // console.log('Sending to backend:', [...formData.entries()]); // Debugging log
  state.processing = true;

  try {
    const response = await fetch('/api/upload/images', {
      method: 'POST',
      body: formData
    });

    // console.log('Upload success:', response);
    if(response.ok) {
      const data = await response.json();
      // console.log('Data:', data);
      
      if(data.statusCode === 500) {
        state.picture_upload.error = `An error occurred while uploading the image${selectedFiles.value.length > 1 ? 's' : ''}. ${data.error}`;
        state.processing = false;
      } else {
        nextTick(() => {
          state.processing = false;
          state.picture_upload.success = `Image${selectedFiles.value.length > 1 ? 's' : ''} uploaded successfully`;
          // clear the selected files
          selectedFiles.value = [];
          // previewImages.value = [];
          emit('pictureUploaded', data.data);
        });
      }
      
    }
  } catch (error) {
    console.error('Upload error:', error);
    state.picture_upload.error = `An error occurred while uploading the image${selectedFiles.length > 1 ? 's' : ''}. `;
  }
};

</script>

<style lang="scss" scoped>

</style>