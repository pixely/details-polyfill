/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	/**
	 * Add support for details element for browsers which require it
	 *
	 * @author Graham Martin <graham@pixely.co.uk>
	 */
	
	exports.default = function Details() {
	  // Check for details element support
	  var isDetailsSupported = 'open' in document.createElement('details');
	
	  // CSS used a lightly modified version of work by @jordanaustin
	  // https://github.com/jordanaustin/Details-Expander/blob/master/src/css/main.css
	  var css = '  \n    /*\n      NOTE:\n      These are defaults meant to mimic the default unstyled brower look.\n      I highly recommend you style your details tags but don\'t do it here.\n      Just overwrite the style. Almost everything can be fully customized.\n      Anything that shouldn\'t be overwritten has an !important on it.\n    */\n    \n    .no-details details {\n      display: block;\n      width: 100%;\n    }\n    \n    .no-details details > summary {\n      display: inline-block !important;\n      width: 100%  !important;\n      min-height: 1.4em;\n      padding: 0.125em;\n      cursor: pointer;\n    }\n    \n    .no-details details summary:before {\n      content:\'\u25BA\';\n      font-size: 0.8em;\n      position: relative;\n      display: inline-block;\n      width: 1em;\n      height: 1em;\n      margin-right: 0.3em;\n      transform-origin: 0.4em 0.6em;\n    }\n    \n    .no-details details[open] > summary:before {\n      content: \'\u25BC\';\n    }\n    \n    .no-details details > *:not(summary) {\n      display: none;\n    }\n    \n    .no-details details[open] > *:not(summary) {\n      /* If you need to display table or something like that feel free */\n      display: block;\n    }';
	
	  // injectStyles is based on work by @leifoolsen
	  // https://github.com/leifoolsen/lavu-details-polyfill/blob/master/src/index.js
	  var injectStyles = function injectStyles() {
	    var style = document.createElement('style');
	    style.id = 'details-polyfill-css';
	    style.textContent = css.replace(/(\/\*([^*]|(\*+[^*/]))*\*+\/)/gm, '').replace(/\s/gm, ' ');
	    style.appendChild(document.createTextNode(''));
	
	    // Must be the first stylesheet so it does not override user css
	    document.head.insertBefore(style, document.head.firstChild);
	    return true;
	  };
	
	  var toggleOpen = function toggleOpen() {
	    var parent = this.parentNode;
	
	    if (parent.tagName.toLowerCase() === 'details') {
	      if (parent.hasAttribute('open')) {
	        parent.removeAttribute('open');
	      } else {
	        parent.setAttribute('open', '');
	      }
	    }
	  };
	
	  if (isDetailsSupported) {
	    return;
	  }
	
	  // Add class to <html> element to hook our styles too
	  document.documentElement.classList.add('no-details');
	
	  // Inject basic details styling
	  injectStyles();
	
	  // Grab references to the detail DOM elements
	  var summaries = document.querySelectorAll('summary');
	  var summary = void 0;
	
	  // Iterate over all summary elements, set accessibility focused attributes and
	  // set event listeners for clicks or keypresses
	  if (summaries) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = summaries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        summary = _step.value;
	
	        summary.setAttribute('role', 'button');
	        summary.setAttribute('tabindex', 0);
	        summary.addEventListener('click', toggleOpen);
	        summary.addEventListener('keypress', function (e) {
	          var key = e.which || e.keyCode;
	          if (key === 13 || key === 32) {
	            // enter or space keys
	            toggleOpen.apply(e.target);
	          }
	        });
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
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=details-polyfill.js.map