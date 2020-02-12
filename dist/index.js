'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var OldStyles =
/*#__PURE__*/
function () {
  /**
   * Create a new OldStyles instance.
   *
   * @param {string} styles
   */
  function OldStyles(styles) {
    _classCallCheck(this, OldStyles);

    this.styles = styles;
  }
  /**
   * Split the string and create a new bidimensional array with properties and
   * values.
   *
   * @return {array} oldPropertyValue
   */


  _createClass(OldStyles, [{
    key: "getPropertyAndValues",
    value: function getPropertyAndValues() {
      var oldPropertyValue = this.styles.split(';');
      oldPropertyValue = this.removeLastItem(oldPropertyValue);
      return oldPropertyValue.map(function (oldProperty) {
        return oldProperty.split(':').map(function (property) {
          return property.trim();
        });
      });
    }
    /**
     * Remove the last item of an array beacause it is empty.
     *
     * @return {array} oldPropertyValue
     */

  }, {
    key: "removeLastItem",
    value: function removeLastItem(propertiesArray) {
      return propertiesArray.slice(0, propertiesArray.length - 1);
    }
  }]);

  return OldStyles;
}();

var NewStyles =
/*#__PURE__*/
function () {
  /**
   * Create a new NewStyles instance
   *
   * @param {object} styles
   */
  function NewStyles(styles) {
    _classCallCheck(this, NewStyles);

    this.styles = styles;
  }
  /**
   * Create a bidimensional array with the properties an their value values.
   *
   * @return {array} propertyAndValues
   */


  _createClass(NewStyles, [{
    key: "getPropertyAndValues",
    value: function getPropertyAndValues() {
      var _this = this;

      this.propertyAndValues = this.objectToArray().map(function (newProperty) {
        var propertyValue = newProperty.split(':');
        propertyValue[0] = _this.camelCaseToKebabCase(propertyValue[0]);
        return propertyValue;
      });
      return this.propertyAndValues;
    }
    /**
     * Create an array with only the properties without the values.
     *
     * @return {array} getProperties
     */

  }, {
    key: "getProperties",
    value: function getProperties() {
      return this.propertyAndValues.map(function (element) {
        return element[0];
      });
    }
    /**
     * Convert the object to an array.
     *
     * @return {array} objectToArray
     */

  }, {
    key: "objectToArray",
    value: function objectToArray() {
      return JSON.stringify(this.styles).slice(1, -1).replace(/"/g, '').split(',');
    }
    /**
     * Change a string from camel case to kebab case.
     *
     * @param {string} property
     * @return {string} property
     */

  }, {
    key: "camelCaseToKebabCase",
    value: function camelCaseToKebabCase(property) {
      return property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    }
  }]);

  return NewStyles;
}();

var Styles =
/*#__PURE__*/
function () {
  /**
   * Create a new Styles instance
   *
   * @param {object} element
   * @param {object} binding
   */
  function Styles(element, binding) {
    _classCallCheck(this, Styles);

    this.important = binding.modifiers.important;
    this.newStyles = new NewStyles(binding.value);
    this.oldStyles = new OldStyles(element.style.cssText);
  }
  /**
   * Get the old values and new values on array format, merge the arrays and
   * return a concatenated string form the merged vales.
   *
   * @return {string} getStylesString
   */


  _createClass(Styles, [{
    key: "getStylesString",
    value: function getStylesString() {
      var newPropertyValues = this.newStyles.getPropertyAndValues();
      var newProperties = this.newStyles.getProperties();
      var oldPropertyValues = this.oldStyles.getPropertyAndValues();
      newPropertyValues = this.mergeProperties(newPropertyValues, newProperties, oldPropertyValues);
      return this.makeStylesString(newPropertyValues);
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

  }, {
    key: "mergeProperties",
    value: function mergeProperties(newPropertyValues, newProperties, oldPropertyValues) {
      oldPropertyValues.forEach(function (property) {
        if (!newProperties.includes(property[0])) {
          newPropertyValues.push(property);
        }
      });
      return newPropertyValues;
    }
    /**
     * Make a inline style string type from an array, with important if it is
     * selected.
     *
     * @param {array} newPropertyValues
     * @return {string} makeStylesString
     */

  }, {
    key: "makeStylesString",
    value: function makeStylesString(newPropertyValues) {
      var _this = this;

      var styleString = '';
      newPropertyValues.forEach(function (property) {
        styleString += _this.important ? styleString += property[0] + ': ' + property[1] + ' !important; ' : styleString += property[0] + ': ' + property[1] + '; ';
      });
      return styleString.trim();
    }
  }]);

  return Styles;
}();

var VueHover = {
  install: function install(Vue, options) {
    Vue.directive('hover', {
      inserted: function inserted(element, binding, vnode) {
        if (!binding.value) {
          return;
        }

        var oldStyles = element.style.cssText;
        var newStyles = new Styles(element, binding).getStylesString();
        element.addEventListener('mouseover', function () {
          element.style.cssText = newStyles;
        });
        element.addEventListener('mouseleave', function () {
          element.style.cssText = oldStyles;
        });
      }
    });
  }
};

module.exports = VueHover;
