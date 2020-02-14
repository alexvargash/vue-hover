import OldStyles from './old-styles'
import NewStyles from './new-styles'

class Styles {
  /**
   * Create a new Styles instance
   *
   * @param {object} element
   * @param {object} binding
   */
  constructor (element, binding) {
    this.element = element
    this.important = binding.modifiers.important
    this.newStyles = new NewStyles(binding.value)
    this.oldStyles = new OldStyles(element.style.cssText)
  }

  /**
   * Get the original styles of the element.
   *
   * @return {string} getOldStyles
   */
  getOldStyles () {
    return this.element.style.cssText
  }

  /**
   * Get the old values and new values on array format, merge the arrays and
   * return a concatenated string form the merged vales.
   *
   * @return {string} getNewStyles
   */
  getNewStyles () {
    let newPropertyValues = this.newStyles.getPropertyAndValues()
    const newProperties = this.newStyles.getProperties()

    const oldPropertyValues = this.oldStyles.getPropertyAndValues()

    newPropertyValues = this.mergeProperties(newPropertyValues, newProperties, oldPropertyValues)

    return this.makeStylesString(newPropertyValues)
  }

  /**
   * Check if the old properties exist on the new properties, if not push in to
   * the new properties.
   *
   * @param {array} newPropertyValues
   * @param {array} newProperties
   * @param {array} oldPropertyValues
   * @return {array} newPropertyValues
   */
  mergeProperties (newPropertyValues, newProperties, oldPropertyValues) {
    oldPropertyValues.forEach((property) => {
      if (!newProperties.includes(property[0])) {
        newPropertyValues.push(property)
      }
    })

    return newPropertyValues
  }

  /**
   * Make a inline style string type from an array, with important if it is
   * selected.
   *
   * @param {array} newPropertyValues
   * @return {string} makeStylesString
   */
  makeStylesString (newPropertyValues) {
    let styleString = ''
    newPropertyValues.forEach((property) => {
      styleString = this.important
        ? styleString += property[0] + ': ' + property[1] + ' !important; '
        : styleString += property[0] + ': ' + property[1] + '; '
    })

    return styleString.trim()
  }
}

export default Styles
