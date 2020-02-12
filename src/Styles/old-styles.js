class OldStyles {
  /**
   * Create a new OldStyles instance.
   *
   * @param {string} styles
   */
  constructor (styles) {
    this.styles = styles
  }

  /**
   * Split the string and create a new bidimensional array with properties and
   * values.
   *
   * @return {array} oldPropertyValue
   */
  getPropertyAndValues () {
    let oldPropertyValue = this.styles.split(';')
    oldPropertyValue = this.removeLastItem(oldPropertyValue)

    return oldPropertyValue.map(oldProperty => oldProperty.split(':').map(property => property.trim()))
  }

  /**
   * Remove the last item of an array beacause it is empty.
   *
   * @return {array} oldPropertyValue
   */
  removeLastItem (propertiesArray) {
    return propertiesArray.slice(0, propertiesArray.length - 1)
  }
}

export default OldStyles
