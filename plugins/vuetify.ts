import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Icons from '@/utils/Icons.js'
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { mdi } from 'vuetify/iconsets/mdi'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/vue-fontawesome' 
import { customSVGs } from '@/components/common/icons/customSvgs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)

  const vuetify = createVuetify({
    treeShake: true,
      components: {
        ...components,
        FontAwesomeIcon,
        VDataTable,
        VDatePicker, 
        VDataTableServer 
    },
    directives,
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      defaultTheme: 'custom',
      themes: {
        custom: {
          dark: false,
          colors: {
            primary: '#F81717',
            yellow: '#F2B71A',
            magenta: '#b2006a',
            dark: '#272727',
            purple: '#261853',
            black: '#0A0A0A',
            gray: '#F9F9F9'
          }
        }
      }
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        fa: Icons,
        mdi,
        custom: customSVGs
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})