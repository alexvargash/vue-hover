import Styles from './Styles/styles'

const VueHover = {
  install (Vue, options) {
    Vue.directive('hover', {
      inserted (element, binding, vnode) {
        if (!binding.value) {
          return
        }

        const oldStyles = element.style.cssText
        const newStyles = new Styles(element, binding).getStylesString()

        element.addEventListener('mouseover', () => {
          element.style.cssText = newStyles
        })
        element.addEventListener('mouseleave', () => {
          element.style.cssText = oldStyles
        })
      }
    })
  }
}

export default VueHover
