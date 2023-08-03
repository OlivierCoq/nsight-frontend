import { h } from 'vue'
import mediumIcon from '@/components/common/icons/medium'
const customSvgNameToComponent = {
  mediumIcon
}

const customSVGs = {
  component: (props) =>
    h(props.tag, [h(customSvgNameToComponent[props.icon], { class: 'v-icon__svg' })])
}

export { customSVGs /* aliases */ }