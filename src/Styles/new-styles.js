class NewStyles {
  /**
   * Create a new NewStyles instance
   *
   * @param {object} styles
   */
  constructor (styles) {
    this.styles = styles
  }

  /**
   * Create a bidimensional array with the properties an their value values.
   *
   * @return {array} propertyAndValues
   */
  getPropertyAndValues () {
    this.propertyAndValues = this.objectToArray().map((newProperty) => {
      const propertyValue = newProperty.split(':')
      propertyValue[0] = this.camelCaseToKebabCase(propertyValue[0])

      return propertyValue
    })

    return this.propertyAndValues
  }

  /**
   * Create an array with only the properties without the values.
   *
   * @return {array} getProperties
   */
  getProperties () {
    return this.propertyAndValues.map(element => element[0])
  }

  /**
   * Convert the object to an array.
   *
   * @return {array} objectToArray
   */
  objectToArray () {
    return JSON.stringify(this.styles).slice(1, -1).replace(/"/g, '').split(',')
  }

  /**
   * Change a string from camel case to kebab case.
   *
   * @param {string} property
   * @return {string} property
   */
  camelCaseToKebabCase (property) {
    return property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  }
}

export default NewStyles
