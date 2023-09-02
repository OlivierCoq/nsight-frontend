// https://stackoverflow.com/questions/72723309/how-do-you-get-font-awesome-setup-on-nuxt-3
import { defineNuxtPlugin } from '#app'; // remove if 'vue3' is recognised and global by default

import {library, config} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


import { faCircleUser as fasCircleUser } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

library.add(fas);
library.add(fasCircleUser);

export default defineNuxtPlugin(({vueApp}) => {
  vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})