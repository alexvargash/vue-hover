import Styles from './styles/styles'

function addNewStyles (event) {
  this.style.cssText = this.options.newStyles
}

function addOldStyles (event) {
  this.style.cssText = this.options.oldStyles
}

const VueHover = {
  install (Vue, options) {
    Vue.directive('hover', {
      bind (element, binding, vnode) {
        if (binding.value) {
          const styles = new Styles(element, binding)
          element.options = {
            oldStyles: styles.getOldStyles(),
            newStyles: styles.getNewStyles()
          }
        }
      },
      inserted (element, binding, vnode) {
        if (binding.value) {
          element.addEventListener('mouseover', addNewStyles)
          element.addEventListener('mouseleave', addOldStyles)
        }
      },
      unbind (element, binding, vnode) {
        if (binding.value) {
          element.removeEventListener('mouseover', addNewStyles)
          element.removeEventListener('mouseleave', addOldStyles)
        }
      }
    })
  }
}

export default VueHover
