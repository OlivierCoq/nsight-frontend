// import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { h } from 'vue'

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Brands

// Light

// Regular

// Solid
import { faGear as fasGear } from '@fortawesome/free-solid-svg-icons'
import { faFileLines as fasFileLines } from '@fortawesome/free-solid-svg-icons'

// Thin
// import {faGear as fatGear} from '@fortawesome/pro-thin-svg-icons'
/**
 * Register vue font-awesome-icon as a global component.
 */
// Vue.component('FontAwesomeIcon', FontAwesomeIcon)

/**
 * Disable automatic css.
 *
 * We import it ourselves in the global app.scss style sheet file.
 *
 */
config.autoAddCss = false

/**
 * Font awesome brand icons.
 *
 * Note prefix `fab`.
 */
const BRANDS = []

/**
 * Font awesome light icons.
 *
 * Note prefix `fal`.
 */
const LIGHT = []

/**
 * Font awesome regular icons.
 *
 * Note prefix `far`.
 */
const REGULAR = []

/**
 * Font awesome solid icons.
 *
 * Note prefix `fas`.
 */
const SOLID = [fasGear, fasFileLines]

// Font awesome thin icons
// Prefix: 'fat'
const THIN = [
  // fatGear
]

/**
 * All of our font awesome icons.
 */
const ICONS = [...BRANDS, ...LIGHT, ...REGULAR, ...SOLID, ...THIN]

/**
 * Register icons with font awesome svg core.
 *
 * Each icon must be added before it can be used.
 * This is also allows to use tree shaking.
 * Only the icons we import will be included in the final bundle.
 */
library.add(...ICONS)
/**
 * Vuetify icon definitions object.
 *
 * We register all the icons with vuetify. This enables us access to all imported
 * icons using the $vuetify.icons object.
 *
 * For example: $vuetify.icons.fab-twitter
 */
const faSVGs = {
  component: (props) =>
    h(FontAwesomeIcon, {
      icon: [props.icon.split('-')[0], props.icon.split('-').slice(1).join('-')]
    })
}

export default faSVGs