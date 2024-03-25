
import {createApp} from 'vue';
import ToastService from 'primevue/toastservice';



export default defineNuxtPlugin(({vueApp}) => {

  // const app = createApp(App);
  vueApp.use(ToastService);

})