function addNewStyles (event) {
  this.style.cssText = this.options.newStyles
}

function addOldStyles (event) {
  this.style.cssText = this.options.oldStyles
}

export { addNewStyles, addOldStyles }
