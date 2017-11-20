const Togglerone = class {
  constructor (element, toggler, options = {}) {
    // Store all the instances.
    if (Togglerone.instances === undefined) {
      Togglerone.instances = []
    }
    Togglerone.instances.push(this)

    this.options = Object.assign({}, {
      'togglerClass': 'is-active',
      'elementClass': 'is-open'
    }, options)

    // Add id to instance, we'll use this later.
    this.id = Togglerone.instances.length

    // Store elements.
    this.element = element
    this.toggler = toggler

    // Store event listeners here, so that we can easily remove them later.
    this.eventListenerReferences = {}

    this.bindEventListeners()
  }

  bindEventListeners () {
    this.eventListenerReferences.onElementClick = this.onElementClick.bind(this)
    this.eventListenerReferences.onTogglerClick = this.onTogglerClick.bind(this)

    this.element.addEventListener('click', this.eventListenerReferences.onElementClick)
    this.toggler.addEventListener('click', this.eventListenerReferences.onTogglerClick)

    // Only add this event listener once, not for every instance.
    if (Togglerone.instances.length === 1) {
      document.addEventListener('click', Togglerone.onDocumentClick)
    }
  }

  /**
   * Toggle classes for this instance, and close other instances.
   */
  onTogglerClick (event) {
    this.element.classList.toggle(this.options.elementClass)
    this.toggler.classList.toggle(this.options.togglerClass)

    Togglerone.closeAllInstances(this)

    event.handledByTogglerone = true
    event.preventDefault()
  }

  /**
   * When clicked on this.element, close other instances, not this one.
   */
  onElementClick (event) {
    // Do nothing if the event is already handled by another part of Togglerone.
    // We don't want instances to close twice for instance. This could happen if
    // this.toggler is inside of this.element.
    if (event.handledByTogglerone === true) return

    Togglerone.closeAllInstances(this)
    event.handledByTogglerone = true
  }

  /**
   * Remove classes for this instance.
   */
  close () {
    this.element.classList.remove(this.options.elementClass)
    this.toggler.classList.remove(this.options.togglerClass)
  }

  destroy () {
    // Remove from instances array.
    var key = Togglerone.instances.indexOf(this)
    Togglerone.instances.splice(key, 1)

    // Remove event listeners.
    this.element.removeEventListener('click', this.eventListenerReferences.onElementClick)
    this.toggler.removeEventListener('click', this.eventListenerReferences.onTogglerClick)

    // Only remove this event listener if there are no instances anymore.
    if (Togglerone.instances.length === 0) {
      document.removeEventListener('click', Togglerone.onDocumentClick)
    }
  }

  static onDocumentClick (event) {
    if (event.handledByTogglerone === true) return
    Togglerone.closeAllInstances()
  }

  static closeAllInstances (originInstance) {
    if (Togglerone.instances === undefined) return

    for (const instance of Togglerone.instances) {
      // Don't close the instance calling this method.
      if (originInstance && originInstance.id === instance.id) continue

      // Don't close parent instances.
      if (originInstance && instance.element.contains(originInstance.element)) continue

      instance.close()
    }
  }

  static destroyAllInstances () {
    if (Togglerone.instances === undefined) return

    while (Togglerone.instances.length > 0) {
      Togglerone.instances[0].destroy()
    }
  }
}

export default Togglerone
