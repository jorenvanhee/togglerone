var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Togglerone = function () {
  function Togglerone(element, toggler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Togglerone);

    // Store all the instances.
    if (Togglerone.instances === undefined) {
      Togglerone.instances = [];
    }
    Togglerone.instances.push(this);

    this.options = Object.assign({}, {
      'togglerClass': 'is-active',
      'elementClass': 'is-open'
    }, options);

    // Add id to instance, we'll use this later.
    this.id = Togglerone.instances.length;

    // Store elements.
    this.element = element;
    this.toggler = toggler;

    // Store event listeners here, so that we can easily remove them later.
    this.eventListenerReferences = {};

    this.bindEventListeners();
  }

  _createClass(Togglerone, [{
    key: 'bindEventListeners',
    value: function bindEventListeners() {
      this.eventListenerReferences.onElementClick = this.onElementClick.bind(this);
      this.eventListenerReferences.onTogglerClick = this.onTogglerClick.bind(this);

      this.element.addEventListener('click', this.eventListenerReferences.onElementClick);
      this.toggler.addEventListener('click', this.eventListenerReferences.onTogglerClick);

      // Only add this event listener once, not for every instance.
      if (Togglerone.instances.length === 1) {
        document.addEventListener('click', Togglerone.onDocumentClick);
      }
    }

    /**
     * Toggle classes for this instance, and close other instances.
     */

  }, {
    key: 'onTogglerClick',
    value: function onTogglerClick(event) {
      this.element.classList.toggle(this.options.elementClass);
      this.toggler.classList.toggle(this.options.togglerClass);

      Togglerone.closeAllInstances(this);

      event.handledByTogglerone = true;
      event.preventDefault();
    }

    /**
     * When clicked on this.element, close other instances, not this one.
     */

  }, {
    key: 'onElementClick',
    value: function onElementClick(event) {
      // Do nothing if the event is already handled by another part of Togglerone.
      // We don't want instances to close twice for instance. This could happen if
      // this.toggler is inside of this.element.
      if (event.handledByTogglerone === true) return;

      Togglerone.closeAllInstances(this);
      event.handledByTogglerone = true;
    }

    /**
     * Remove classes for this instance.
     */

  }, {
    key: 'close',
    value: function close() {
      this.element.classList.remove(this.options.elementClass);
      this.toggler.classList.remove(this.options.togglerClass);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Remove from instances array.
      var key = Togglerone.instances.indexOf(this);
      Togglerone.instances.splice(key, 1);

      // Remove event listeners.
      this.element.removeEventListener('click', this.eventListenerReferences.onElementClick);
      this.toggler.removeEventListener('click', this.eventListenerReferences.onTogglerClick);

      // Only remove this event listener if there are no instances anymore.
      if (Togglerone.instances.length === 0) {
        document.removeEventListener('click', Togglerone.onDocumentClick);
      }
    }
  }], [{
    key: 'onDocumentClick',
    value: function onDocumentClick(event) {
      if (event.handledByTogglerone === true) return;
      Togglerone.closeAllInstances();
    }
  }, {
    key: 'closeAllInstances',
    value: function closeAllInstances(originInstance) {
      if (Togglerone.instances === undefined) return;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Togglerone.instances[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instance = _step.value;

          // Don't close the instance calling this method.
          if (originInstance && originInstance.id === instance.id) continue;

          // Don't close parent instances.
          if (originInstance && instance.element.contains(originInstance.element)) continue;

          instance.close();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'destroyAllInstances',
    value: function destroyAllInstances() {
      if (Togglerone.instances === undefined) return;

      while (Togglerone.instances.length > 0) {
        Togglerone.instances[0].destroy();
      }
    }
  }]);

  return Togglerone;
}();

export default Togglerone;
