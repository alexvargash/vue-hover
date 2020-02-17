import Styles from './styles/styles'
import { addNewStyles, addOldStyles } from './events'

function bind (element, binding, vnode) {
  if (binding.value && Object.keys(binding.value).length > 0) {
    const styles = new Styles(element, binding)
    element.options = {
      oldStyles: styles.getOldStyles(),
      newStyles: styles.getNewStyles()
    }
  }
}

function inserted (element, binding, vnode) {
  if (binding.value && Object.keys(binding.value).length > 0) {
    element.addEventListener('mouseover', addNewStyles)
    element.addEventListener('mouseleave', addOldStyles)
  }
}

function unbind (element, binding, vnode) {
  if (binding.value && Object.keys(binding.value).length > 0) {
    element.removeEventListener('mouseover', addNewStyles)
    element.removeEventListener('mouseleave', addOldStyles)
  }
}

export default { bind, inserted, unbind }
