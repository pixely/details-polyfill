# Details Polyfill ES6

[![Build Status](https://travis-ci.org/pixely/details-polyfill-es6.svg?branch=master)](https://travis-ci.org/pixely/details-polyfill-es6)

A simple ES6 polyfill for the `<details>` element. The `<details>` element allows users to toggle the visibility of additional content by using a `<summary>` element as a legend to describe the content of the `<details>` element.

As there is not currently complete browser support (http://caniuse.com/#search=details) this polyfill uses JavaScript and CSS to provide this functionality when required.

For more details on the implementation of the `<details>` element see https://www.w3.org/wiki/HTML/Elements/details.

## Installation

```sh
$ npm install --save details-polyfill-es6
```

Use an import to include the polyfill into your codebase. No further initialisation is required.

```javascript
import 'details-polyfill-es6';
```

## Usage

```html
<details>
  <summary>Show more</summary>
  <p>The content</p>
</details>
```

## How does it work?

The polyfill injects some basic CSS to mimic the functionality of the `<details>` element alongside additional attributes on the markup to increase the accessibility of the markup. The JavaScript listens for clicks and keypresses on the `<summary>` element and toggles the `open` attribute on the parent `<details>` element.

You may override the basic styles in CSS to suit your own designs, with `details[open]` allowing you to style the open state of the `<details>` element.

## Credits

This polyfill uses various fragments of code and learnings from a few existing polyfills.

* https://github.com/leifoolsen/lavu-details-polyfill
* https://github.com/jordanaustin/Details-Expander
* https://mathiasbynens.be/notes/html5-details-jquery#comment-35
