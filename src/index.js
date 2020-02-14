import directive from './directive'

const VueHover = {
  install (Vue, options) {
    Vue.directive('hover', directive)
  }
}

export default VueHover
