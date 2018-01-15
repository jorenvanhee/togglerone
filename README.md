# Togglerone 🍫

[![Travis](https://img.shields.io/travis/jorenvanhee/togglerone.svg)](https://travis-ci.org/jorenvanhee/togglerone)
[![npm](https://img.shields.io/npm/v/togglerone.svg)](https://www.npmjs.com/package/togglerone)

Opening and closing ui elements can easily be done by toggling classes. You could use `element.classList.toggle('is-open')` or `$('element').toggleClass('is-open')` in jQuery. **Closing elements when clicking outside** of them is a little bit harder. Togglerone takes care of this common pattern.

## Features ✅

- Add or remove one or more classes on an element by clicking on a button
- Remove classes when clicking outside of the element
- Toggle classes on the element (is-open) and the button (is-active)

## Installation

```
npm install togglerone --save-dev
```

```
yarn add togglerone
```

## Usage

### Javascript

```js
var button = document.querySelector('.button')
var element = document.querySelector('.element')

var instance = new Togglerone(button, element, {
  'elementClass': 'is-open'
  // ...
})
```

### Data attributes

```html
<button data-togglerone="..."></button>
<div class="element"></div>
```
