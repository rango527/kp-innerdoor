// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/modal-pattern/src/helper-functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopBodyScroll = stopBodyScroll;
exports.isHidden = isHidden;
exports.isElement = isElement;
exports.objAssign = void 0;

function isHidden(el) {
  var style = window.getComputedStyle(el);
  return style.display === 'none';
}

function stopBodyScroll(bool) {
  var isSafariMobile = navigator.userAgent.indexOf("Safari") > -1 && (navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPad") > -1);
  var winInnerHeight = window.innerHeight;

  if (bool) {
    if (isSafariMobile) {
      document.body.classList.add("kp-modal-disable-scroll-ios");
    }

    document.body.classList.add("kp-modal-disable-scroll");
  } else {
    if (isSafariMobile) {
      document.body.classList.remove("kp-modal-disable-scroll-ios");
    }

    document.body.classList.remove("kp-modal-disable-scroll");
  }
}

function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return typeof obj === "object" && obj.nodeType === 1 && typeof obj.style === "object" && typeof obj.ownerDocument === "object";
  }
}

var objAssign = function () {
  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }
}();

exports.objAssign = objAssign;
},{}],"../node_modules/pl-js-utility/src/lib/user-agent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plIsLocalStorage = _plIsLocalStorage;
exports._plIOS = _plIOS;
exports._plMobileDetect = exports._plBrowserDetect = void 0;

/* eslint-disable */
// user agent =============================
// detect browser
const _plBrowserDetect = {
  isChrome: function () {
    return !!window.chrome;
  },
  isFirefox: function () {
    return typeof InstallTrigger !== 'undefined';
  },
  isSafari: function () {
    return /constructor/i.test(window.HTMLElement) || function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    }(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification);
  },
  isIE: function () {
    return (
      /*@cc_on!@*/
      false || !!document.documentMode
    );
  },
  isEdge: function () {
    return !this.isIE() && !!window.StyleMedia;
  }
}; // detect mobile device

exports._plBrowserDetect = _plBrowserDetect;
const _plMobileDetect = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return isiOS;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return this.Android() || this.BlackBerry() || this.iOS() || this.Windows();
  }
};
exports._plMobileDetect = _plMobileDetect;

function _plIsLocalStorage() {
  var test = 'test';

  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function _plIOS() {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) // iPad on iOS 13 detection
  || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
},{}],"../node_modules/pl-js-utility/src/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plGetWindowWidth = _plGetWindowWidth;
exports._plGetCurrentBreakpoint = _plGetCurrentBreakpoint;
exports._plGetElCount = _plGetElCount;
exports._plIsInViewport = _plIsInViewport;
exports._plGetTopOfViewPort = _plGetTopOfViewPort;
exports._plGetOffsetTop = _plGetOffsetTop;
exports._plCreateElementFromHTML = _plCreateElementFromHTML;
exports._plGetHeightOfElement = _plGetHeightOfElement;
exports._plIsElement = _plIsElement;
exports._plCreateInnerWrap = _plCreateInnerWrap;
exports._plInsertAfter = _plInsertAfter;
exports._plElementClosest = _plElementClosest;
exports._plSwapElements = _plSwapElements;
exports._plTruncateContent = _plTruncateContent;

var _userAgent = require("./user-agent");

/* eslint-disable */
// dom =============================
// get current window width
function _plGetWindowWidth() {
  var w = window,
      d = document,
      de = d.documentElement,
      b = de.getElementsByTagName('body')[0],
      windowWidth = w.innerWidth || de.clientWidth || b.clientWidth;
  return windowWidth;
} // get current breakpoint - returns 'desktop', 'tablet', or 'mobile'


function _plGetCurrentBreakpoint() {
  var currentBreakpoint,
      tabletWidth = 601,
      desktopWidth = 769,
      currentWidth = _plGetWindowWidth();

  if (currentWidth >= desktopWidth) {
    currentBreakpoint = 'desktop';
  } else if (currentWidth >= tabletWidth && currentWidth < desktopWidth) {
    currentBreakpoint = 'tablet';
  } else {
    currentBreakpoint = 'mobile';
  }

  return currentBreakpoint;
} // get count of elements


function _plGetElCount(els) {
  var elCount = els.length;
  return elCount;
} // checks if element is currently in viewport


function _plIsInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
} // get distance of element to top of viewport


function _plGetTopOfViewPort(elem) {
  return elem.getBoundingClientRect().top;
} // get distance of element to top of page


function _plGetOffsetTop(elem) {
  var distance = 0;

  if (elem.offsetParent) {
    do {
      distance += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }

  return distance < 0 ? 0 : distance;
} // creates HTML element from HTML string


function _plCreateElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

  return div.firstChild;
} // get height of element


function _plGetHeightOfElement(el) {
  var domHeight = _userAgent._plBrowserDetect.isFirefox() || _userAgent._plBrowserDetect.isIE() ? el.offsetHeight - 1 : el.offsetHeight;
  return domHeight;
} // check if object is HTML element


function _plIsElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return typeof obj === "object" && obj.nodeType === 1 && typeof obj.style === "object" && typeof obj.ownerDocument === "object";
  }
} // create an inner wrap element


function _plCreateInnerWrap(parentEl, innerEl, attribute, attributevalue) {
  if (typeof innerEl === 'string') {
    innerEl = document.createElement(innerEl);
  }

  var div = parentEl.appendChild(innerEl).setAttribute(attribute, attributevalue);

  while (parentEl.firstChild !== innerEl) {
    innerEl.appendChild(parentEl.firstChild);
  }
} // insert element after element


function _plInsertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
} // get the .closest() polyfill


function _plElementClosest() {
  if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  if (!Element.prototype.closest) Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
} // swap DOM position of two elements


function _plSwapElements(obj1, obj2) {
  var parent2 = obj2.parentNode;
  var next2 = obj2.nextSibling;

  if (next2 === obj1) {
    parent2.insertBefore(obj1, obj2);
  } else {
    obj1.parentNode.insertBefore(obj2, obj1);

    if (next2) {
      parent2.insertBefore(obj1, next2);
    } else {
      parent2.appendChild(obj1);
    }
  }
} // truncate text by character limit


function _plTruncateContent(htmlContent, charLimit) {
  var stopCounter = false;
  var truncatedContent = '';

  for (var index = 0; index < htmlContent.length; index++) {
    if (!charLimit) {
      break;
    }

    if (htmlContent[index] === '<') {
      stopCounter = true;
    }

    if (!stopCounter) {
      charLimit--;
    }

    if (htmlContent[index] === '>') {
      stopCounter = false;
    }

    truncatedContent += htmlContent[index];
  }

  return truncatedContent;
}
},{"./user-agent":"../node_modules/pl-js-utility/src/lib/user-agent.js"}],"../node_modules/pl-js-utility/src/lib/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plTriggerWindowResize = _plTriggerWindowResize;

/* eslint-disable */
// events =============================
// trigger a window resize event in the browser
function _plTriggerWindowResize() {
  if (document.createEvent) {
    var ev = document.createEvent('Event');
    ev.initEvent('resize', true, true);
    window.dispatchEvent(ev);
  } else {
    var element = document.documentElement;
    var event = document.createEventObject();
    element.fireEvent('onresize', event);
  }
}
},{}],"../node_modules/pl-js-utility/src/lib/focus-trap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plDestroyFocusTrap = exports._plFocusDescendant = exports._plTrapFocus = exports._plInitFocusTrap = void 0;

var _dom = require("./dom");

let ignoreUntilChange = false;

const _plAttemptFocus = element => {
  if (!_plIsFocusable(element)) {
    return false;
  }

  ignoreUntilChange = true;

  try {
    element.focus();
  } catch (e) {}

  ignoreUntilChange = false;
  return document.activeElement === element;
};

const _plFocusDescendant = (element, reverse) => {
  const nodes = Array.from(element.childNodes);
  const children = reverse ? nodes.reverse() : nodes;

  for (var i = 1; i < children.length - 1; i++) {
    if (_plAttemptFocus(children[i]) || _plFocusDescendant(children[i], reverse)) {
      return true;
    }
  }

  return false;
};

exports._plFocusDescendant = _plFocusDescendant;

const _plIsFocusable = element => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute('tabIndex') !== null) {
    return true;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';

    case 'INPUT':
      return element.type != 'hidden' && element.type != 'file';

    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;

    default:
      return false;
  }
};

const _plHandleFocus = event => {
  if (ignoreUntilChange) {
    return;
  }

  const container = event.currentTarget;

  if (!container.contains(event.target) || /bracket-/.test(event.target.className)) {
    _plFocusDescendant(container, /bracket-before/.test(event.target.className));
  }
};

const _plTrapFocus = selector => {
  const container = (0, _dom._plIsElement)(selector) ? selector : document.querySelector(selector);

  if (container && !container.querySelector('.bracket-before')) {
    container.insertAdjacentHTML('afterbegin', '<div tabindex="0" class="bracket-before" />');
    container.insertAdjacentHTML('beforeend', '<div tabindex="0" class="bracket-after" />');
    container.addEventListener('focus', _plHandleFocus, true);
  }
};

exports._plTrapFocus = _plTrapFocus;

const _plDestroyFocusTrap = selector => {
  const container = (0, _dom._plIsElement)(selector) ? selector : document.querySelector(selector);
  const focusBrackets = Array.from(container.querySelectorAll('div[class^="bracket-"'));

  if (container && focusBrackets.length) {
    focusBrackets.forEach(bracket => bracket.remove());
    container.removeEventListener('focus', _plHandleFocus);
  }
};

exports._plDestroyFocusTrap = _plDestroyFocusTrap;

const _plInitFocusTrap = () => {
  window.$kp = window.$kp || {};
  const $kp = window.$kp;
  $kp.GS = $kp.GS || {};
  $kp.GS.FocusTrap = {
    init: _plTrapFocus,
    remove: _plDestroyFocusTrap
  };
};

exports._plInitFocusTrap = _plInitFocusTrap;
},{"./dom":"../node_modules/pl-js-utility/src/lib/dom.js"}],"../node_modules/pl-js-utility/src/lib/http-requests.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plGetJSON = _plGetJSON;

/* eslint-disable */
// http requests =============================
// get JSON data by URL
function _plGetJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 400) {
      callback(xhr.response);
    } else {// console.error(xhr.statusText);
    }
  };

  xhr.onerror = function (e) {// console.error(xhr.statusText);
  };

  xhr.send(null);
}
},{}],"../node_modules/pl-js-utility/src/lib/i18n.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plGetCurrentLang = _plGetCurrentLang;

// i18n =============================
// get value of data-lang attribute of element or HTML lang attribute
function _plGetCurrentLang(el) {
  const htmlEl = document.querySelector('html');
  const lang = el.getAttribute('data-lang') || htmlEl.getAttribute('lang');

  if (lang.startsWith('es')) {
    return 'es';
  } else if (lang.startsWith('en')) {
    return 'en';
  } else {
    return 'en';
  }
}
},{}],"../node_modules/pl-js-utility/src/lib/iteration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plObjLength = _plObjLength;
exports._plNullValues = _plNullValues;
exports._plDebounce = _plDebounce;

/* eslint-disable */
// iteration =============================
// get object length
function _plObjLength(obj) {
  var i = 0;

  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      i++;
    }
  }

  return i;
} // checks for null values


function _plNullValues(target) {
  for (var member in target) {
    if (target[member] === null) return true;
  }

  return false;
} // debounce


function _plDebounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
},{}],"../node_modules/pl-js-utility/src/lib/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plRoundNumber = _plRoundNumber;

/* eslint-disable */
// math =============================
// get round number
function _plRoundNumber(num) {
  return Math.round(num);
}
},{}],"../node_modules/pl-js-utility/src/lib/polyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plMatches = exports._plObjAssign = exports._plArrayFrom = exports._plCustomEvent = void 0;

// window.CustomEvent polyfill
const _plCustomEvent = function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
}(); // Object.assign polyfill


exports._plCustomEvent = _plCustomEvent;

const _plObjAssign = function () {
  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        if (target === null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }
}();

exports._plObjAssign = _plObjAssign;

const _plMatches = function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozsMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  }
}();

exports._plMatches = _plMatches;

const _plArrayFrom = function () {
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = function () {
      var symbolIterator;
      var stringIt = '';

      try {
        symbolIterator = Symbol.iterator ? Symbol.iterator : 'Symbol(Symbol.iterator)';
      } catch (stringIt) {
        symbolIterator = 'Symbol(Symbol.iterator)';
      }

      var toStr = Object.prototype.toString;

      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };

      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) return 0;
        if (number === 0 || !isFinite(number)) return number;
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };

      var maxSafeInteger = Math.pow(2, 53) - 1;

      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      var setGetItemHandler = function setGetItemHandler(isIterator, items) {
        var iterator = isIterator && items[symbolIterator]();
        return function getItem(k) {
          return isIterator ? iterator.next() : items[k];
        };
      };

      var getArray = function getArray(T, A, len, getItem, isIterator, mapFn) {
        // 16. Let k be 0.
        var k = 0; // 17. Repeat, while k < len… or while iterator is done (also steps a - h)

        while (k < len || isIterator) {
          var item = getItem(k);
          var kValue = isIterator ? item.value : item;

          if (isIterator && item.done) {
            return A;
          } else {
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
          }

          k += 1;
        }

        if (isIterator) {
          throw new TypeError('Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1');
        } else {
          A.length = len;
        }

        return A;
      }; // The length property of the from method is 1.


      return function from(arrayLikeOrIterator
      /*, mapFn, thisArg */
      ) {
        // 1. Let C be the this value.
        var C = this; // 2. Let items be ToObject(arrayLikeOrIterator).

        var items = Object(arrayLikeOrIterator);
        var isIterator = isCallable(items[symbolIterator]); // 3. ReturnIfAbrupt(items).

        if (arrayLikeOrIterator == null && !isIterator) {
          throw new TypeError('Array.from requires an array-like object or iterator - not null or undefined');
        } // 4. If mapfn is undefined, then let mapping be false.


        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;

        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.


          if (arguments.length > 2) {
            T = arguments[2];
          }
        } // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).


        var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).

        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
        return getArray(T, A, len, setGetItemHandler(isIterator, items), isIterator, mapFn);
      };
    }();
  }
}();

exports._plArrayFrom = _plArrayFrom;
},{}],"../node_modules/pl-js-utility/src/lib/styling.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._plGetStyle = _plGetStyle;
exports._plIsHidden = _plIsHidden;
exports._plTransform = _plTransform;

/* eslint-disable */
// styling =============================
// get styling value of element by prop
function _plGetStyle(el, styleProp) {
  var styleValue = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  return styleValue;
} // checks if element is currently hidden


function _plIsHidden(el) {
  var style = window.getComputedStyle(el);
  return style.display === 'none';
} // set transform values


function _plTransform(el, transformValue) {
  el.style.webkitTransform = transformValue;
  el.style.msTransform = transformValue;
  el.style.transform = transformValue;
}
},{}],"../node_modules/pl-js-utility/src/lib/node-traversal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._PlDomTraverse = void 0;

var _dom = require("./dom");

class _PlDomTraverse {
  constructor(element, attrs) {
    this.element = element;
    this.parentSelectors = [];
    this.attrs = attrs || [{
      'aria-hidden': true
    }];
    this.parent = this.element.parentElement;
  }

  init() {
    this.parentSelectors = [];
    this.selectElementsUp();
    this.applyAttrs();
  }

  destroy() {
    this.removeAttrs();
  }

  removeAttrs() {
    this.parentSelectors.forEach(function (el, index) {
      el.removeAttribute('aria-hidden');
    });
  }

  applyAttrs() {
    // remove attrs that already have aria-selected
    this.parentSelectors = this.parentSelectors.filter(selector => !selector.hasAttribute('aria-hidden')).filter(selector => selector.querySelectorAll('.kp-foundation-modal, .kp-modals-container').length <= 0).filter(selector => !selector.classList.contains('kp-foundation-modal') && !selector.classList.contains('kp-modals-container')).filter(selector => selector.offsetParent !== null);
    this.parentSelectors.forEach(function (el, index) {
      el.setAttribute('aria-hidden', true);
    });
  }

  getSiblings(elem) {
    var self = this; // Setup siblings array and get the first sibling

    var siblings = []; // fail gracefully if these properties don't exist

    if (!elem.parentNode || !elem.parentNode.firstChild) return siblings;
    var sibling = elem.parentNode.firstChild; // Loop through each sibling and push to the array

    while (sibling) {
      if ((0, _dom._plIsElement)(sibling) && sibling !== self.element && !sibling.contains(self.element)) {
        siblings.push(sibling);
      }

      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  selectElementsUp() {
    var self = this;
    var node = this.element;

    while (node) {
      if ((0, _dom._plIsElement)(node)) {
        var siblings = this.getSiblings(node); // get all the siblings going up

        this.parentSelectors = this.parentSelectors.concat(siblings);
      }

      if (node === document.body) {
        break;
      }

      node = node.parentElement;
    }
  }

}

exports._PlDomTraverse = _PlDomTraverse;
},{"./dom":"../node_modules/pl-js-utility/src/lib/dom.js"}],"../node_modules/pl-js-utility/src/lib.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "_plGetWindowWidth", {
  enumerable: true,
  get: function () {
    return _dom._plGetWindowWidth;
  }
});
Object.defineProperty(exports, "_plGetCurrentBreakpoint", {
  enumerable: true,
  get: function () {
    return _dom._plGetCurrentBreakpoint;
  }
});
Object.defineProperty(exports, "_plGetElCount", {
  enumerable: true,
  get: function () {
    return _dom._plGetElCount;
  }
});
Object.defineProperty(exports, "_plIsInViewport", {
  enumerable: true,
  get: function () {
    return _dom._plIsInViewport;
  }
});
Object.defineProperty(exports, "_plGetTopOfViewPort", {
  enumerable: true,
  get: function () {
    return _dom._plGetTopOfViewPort;
  }
});
Object.defineProperty(exports, "_plGetOffsetTop", {
  enumerable: true,
  get: function () {
    return _dom._plGetOffsetTop;
  }
});
Object.defineProperty(exports, "_plCreateElementFromHTML", {
  enumerable: true,
  get: function () {
    return _dom._plCreateElementFromHTML;
  }
});
Object.defineProperty(exports, "_plGetHeightOfElement", {
  enumerable: true,
  get: function () {
    return _dom._plGetHeightOfElement;
  }
});
Object.defineProperty(exports, "_plIsElement", {
  enumerable: true,
  get: function () {
    return _dom._plIsElement;
  }
});
Object.defineProperty(exports, "_plCreateInnerWrap", {
  enumerable: true,
  get: function () {
    return _dom._plCreateInnerWrap;
  }
});
Object.defineProperty(exports, "_plInsertAfter", {
  enumerable: true,
  get: function () {
    return _dom._plInsertAfter;
  }
});
Object.defineProperty(exports, "_plElementClosest", {
  enumerable: true,
  get: function () {
    return _dom._plElementClosest;
  }
});
Object.defineProperty(exports, "_plSwapElements", {
  enumerable: true,
  get: function () {
    return _dom._plSwapElements;
  }
});
Object.defineProperty(exports, "_plTruncateContent", {
  enumerable: true,
  get: function () {
    return _dom._plTruncateContent;
  }
});
Object.defineProperty(exports, "_plTriggerWindowResize", {
  enumerable: true,
  get: function () {
    return _events._plTriggerWindowResize;
  }
});
Object.defineProperty(exports, "_plInitFocusTrap", {
  enumerable: true,
  get: function () {
    return _focusTrap._plInitFocusTrap;
  }
});
Object.defineProperty(exports, "_plTrapFocus", {
  enumerable: true,
  get: function () {
    return _focusTrap._plTrapFocus;
  }
});
Object.defineProperty(exports, "_plFocusDescendant", {
  enumerable: true,
  get: function () {
    return _focusTrap._plFocusDescendant;
  }
});
Object.defineProperty(exports, "_plDestroyFocusTrap", {
  enumerable: true,
  get: function () {
    return _focusTrap._plDestroyFocusTrap;
  }
});
Object.defineProperty(exports, "_plGetJSON", {
  enumerable: true,
  get: function () {
    return _httpRequests._plGetJSON;
  }
});
Object.defineProperty(exports, "_plGetCurrentLang", {
  enumerable: true,
  get: function () {
    return _i18n._plGetCurrentLang;
  }
});
Object.defineProperty(exports, "_plObjLength", {
  enumerable: true,
  get: function () {
    return _iteration._plObjLength;
  }
});
Object.defineProperty(exports, "_plNullValues", {
  enumerable: true,
  get: function () {
    return _iteration._plNullValues;
  }
});
Object.defineProperty(exports, "_plDebounce", {
  enumerable: true,
  get: function () {
    return _iteration._plDebounce;
  }
});
Object.defineProperty(exports, "_plRoundNumber", {
  enumerable: true,
  get: function () {
    return _math._plRoundNumber;
  }
});
Object.defineProperty(exports, "_plCustomEvent", {
  enumerable: true,
  get: function () {
    return _polyfill._plCustomEvent;
  }
});
Object.defineProperty(exports, "_plArrayFrom", {
  enumerable: true,
  get: function () {
    return _polyfill._plArrayFrom;
  }
});
Object.defineProperty(exports, "_plObjAssign", {
  enumerable: true,
  get: function () {
    return _polyfill._plObjAssign;
  }
});
Object.defineProperty(exports, "_plMatches", {
  enumerable: true,
  get: function () {
    return _polyfill._plMatches;
  }
});
Object.defineProperty(exports, "_plGetStyle", {
  enumerable: true,
  get: function () {
    return _styling._plGetStyle;
  }
});
Object.defineProperty(exports, "_plIsHidden", {
  enumerable: true,
  get: function () {
    return _styling._plIsHidden;
  }
});
Object.defineProperty(exports, "_plTransform", {
  enumerable: true,
  get: function () {
    return _styling._plTransform;
  }
});
Object.defineProperty(exports, "_plBrowserDetect", {
  enumerable: true,
  get: function () {
    return _userAgent._plBrowserDetect;
  }
});
Object.defineProperty(exports, "_plMobileDetect", {
  enumerable: true,
  get: function () {
    return _userAgent._plMobileDetect;
  }
});
Object.defineProperty(exports, "_plIsLocalStorage", {
  enumerable: true,
  get: function () {
    return _userAgent._plIsLocalStorage;
  }
});
Object.defineProperty(exports, "_plIOS", {
  enumerable: true,
  get: function () {
    return _userAgent._plIOS;
  }
});
Object.defineProperty(exports, "_PlDomTraverse", {
  enumerable: true,
  get: function () {
    return _nodeTraversal._PlDomTraverse;
  }
});

var _dom = require("./lib/dom");

var _events = require("./lib/events");

var _focusTrap = require("./lib/focus-trap");

var _httpRequests = require("./lib/http-requests");

var _i18n = require("./lib/i18n");

var _iteration = require("./lib/iteration");

var _math = require("./lib/math");

var _polyfill = require("./lib/polyfill");

var _styling = require("./lib/styling");

var _userAgent = require("./lib/user-agent");

var _nodeTraversal = require("./lib/node-traversal");
},{"./lib/dom":"../node_modules/pl-js-utility/src/lib/dom.js","./lib/events":"../node_modules/pl-js-utility/src/lib/events.js","./lib/focus-trap":"../node_modules/pl-js-utility/src/lib/focus-trap.js","./lib/http-requests":"../node_modules/pl-js-utility/src/lib/http-requests.js","./lib/i18n":"../node_modules/pl-js-utility/src/lib/i18n.js","./lib/iteration":"../node_modules/pl-js-utility/src/lib/iteration.js","./lib/math":"../node_modules/pl-js-utility/src/lib/math.js","./lib/polyfill":"../node_modules/pl-js-utility/src/lib/polyfill.js","./lib/styling":"../node_modules/pl-js-utility/src/lib/styling.js","./lib/user-agent":"../node_modules/pl-js-utility/src/lib/user-agent.js","./lib/node-traversal":"../node_modules/pl-js-utility/src/lib/node-traversal.js"}],"../node_modules/modal-pattern/src/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderButtons = orderButtons;
exports.modalInit = exports.Modal = exports.initModal = void 0;

var _helperFunctions = require("./helper-functions");

var _lib = require("pl-js-utility/src/lib");

function orderButtons(context) {
  context = typeof context === "string" ? document.querySelector(context) : context;
  var parentSelector = ".modal-buttons",
      targetSelector = "button, a",
      isMobile = window.outerWidth <= 600,
      parentEl,
      targetSelectors,
      targetSelectorsArr;
  if (!isMobile) return;
  if (!context) return;
  parentEl = context.querySelector(parentSelector);

  if (parentEl) {
    targetSelectors = parentEl.querySelectorAll(targetSelector);

    if (targetSelectors.length > 0) {
      targetSelectorsArr = [].slice.call(targetSelectors);

      for (var i = 0; i < targetSelectorsArr.length; i++) {
        if (targetSelectorsArr[i].classList.contains("-continue") || targetSelectorsArr[i].classList.contains("primary") || targetSelectorsArr[i].classList.contains("modal-btn1") || targetSelectorsArr[i].classList.contains("mobile_top")) {
          targetSelectorsArr[i].parentNode.prepend(targetSelectorsArr[i]);
        }
      }
    }
  }
}

const wireFocusEvents = function (e) {
  var self = this;
  if (!this.modal) return;
  var modalContainer = this.modal.querySelector(".modal-container");
  (0, _lib._plTrapFocus)(modalContainer);
};

const initKeyboardEvents = function () {
  var self = this;
  document.addEventListener("keydown", function (e) {
    docKeyHandler.call(self, e);
  });
};

const wireClickEvents = function () {
  var self = this;
  if (!this.modal) return;
  this.modal.addEventListener('click', function (e) {
    clickListener.call(self, e);
  });
};

const wireTriggerEvents = function () {
  var self = this;
  [].forEach.call(this.modalTriggerBtn, function (el) {
    el.addEventListener('click', function (e) {
      self.open(el);
    });
  });
};

const wireCloseEvents = function () {
  var self = this;

  if (this.closeButton) {
    this.closeButton.addEventListener('click', function (e) {
      self.close();
    });
  }
};

const setDefaults = function () {
  if (this.modal) {
    this.modal.classList.add(`modal-pattern-${this.id}`, "modal-pattern--initialized");
  }
};

const setFocus = function () {
  var self = this; // return if modal is not existant

  if (!this.modal) return;
  var modalInner = this.modal.querySelector(".modal-inner");
  (0, _lib._plFocusDescendant)(modalInner);
  this.lastModalFocus = document.activeElement;
  var event = new CustomEvent("focusOnOpen.sg", {
    detail: {
      closed: false,
      firstFocus: true,
      modalId: self.id
    }
  });
  this.modal.dispatchEvent(event);
};

function docKeyHandler(e) {
  if (!this.modal) return;
  var modalInner = this.modal.querySelector(".modal-inner");

  if (e.which === 27) {
    // ESC
    if (this.modal.classList.contains("modal-showing")) {
      this.close();
      var event = new CustomEvent("modalEsc.sg", {
        detail: {
          closed: true,
          modalId: this.id
        }
      });
      this.modal.dispatchEvent(event);
      e.preventDefault();
      return;
    }
  } else if (!this.modal.contains(e.target) && e.which !== 9) {
    if (this.modal && !this.modal.hidden) {
      // if the active element is not inside the modal,
      // the modal is not hidden,
      // and a tab event is not happening
      (0, _lib._plFocusDescendant)(modalInner);
    }
  }
}

function checkWindowResize() {
  var self = this;
  window.addEventListener("resize", function () {
    if (self.modal) {
      if (!(0, _helperFunctions.isHidden)(self.modal)) {
        var winInnerHeight = window.innerHeight;
        document.documentElement.style.height = winInnerHeight + "px";
        document.body.style.height = winInnerHeight + "px";
      }
    }
  });
}

function clickListener(e) {
  // return if modal is not existant
  if (e.target.matches(".modal-inner > [class^='-close']")) {
    e.preventDefault();
    e.stopPropagation();
    this.close();
    return false;
  }

  if (e.target.classList.contains("modal-fade-screen")) {
    setFocus.call(this);
  }
}

function disableScrollIOS() {
  var self = this;
  var isSafariMobile = navigator.userAgent.indexOf("Safari") > -1 && (navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPad") > -1);
  if (!isSafariMobile) return;
  document.body.addEventListener('touchstart', function (e) {
    if (!(0, _helperFunctions.isHidden)(self.modal)) {
      if (!self.modal.querySelector(".modal-inner").contains(e.target)) {
        e.preventDefault();
      }
    }
  });
}

function backToTop(modalId) {
  var self = this;
  modalId = modalId || "my-modal";
  var modal = document.querySelector("#" + modalId);
  if (!modal) return;
  var modalBackToTop = modal.querySelector("[data-btt]");
  if (!modalBackToTop) return;
  modalBackToTop.addEventListener("click", function (e) {
    e.preventDefault();
    setFocus.call(self, modalId);
  });
}

class Modal {
  constructor(options, id) {
    options = options || {};
    id = id || 0;
    var optionsAssign,
        focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
        firstFocusable = focusable[0];
    this.defaults = {
      domScope: null,
      // DOM element
      modalTriggerBtn: null,
      // DOM element
      modalTrigger: null,
      // String selector
      modal: null,
      focusOnClose: null,
      // string Selector
      closeButton: null,
      orderButtons: false
    };
    this.initials = {
      domScope: null,
      modalTriggerBtn: null,
      modal: null,
      closeButton: null,
      focusOnClose: null,
      id: null,
      ignoreUtilFocusChanges: null,
      domtr: null
    };
    Object.assign(self, this.initials);
    optionsAssign = Object.assign(this.defaults, options);
    this.options = optionsAssign;

    if (this.options.modal) {
      this.options.modalTrigger = this.options.modal;
    }

    this.options.domScope = !this.options.domScope ? document : this.options.domScope;
    this.domScope = this.options.domScope || null;
    this.modalTriggerBtn = this.options.modalTriggerBtn ? this.options.modalTriggerBtn : [];

    if (this.options.modalTriggerBtn) {
      this.modalTriggerBtn = (0, _helperFunctions.isElement)(this.options.modalTriggerBtn) ? [this.options.modalTriggerBtn] : this.domScope.querySelectorAll(this.options.modalTriggerBtn);
    }

    if (this.options.modalTrigger) {
      this.modal = (0, _helperFunctions.isElement)(this.options.modalTrigger) ? this.options.modalTrigger : this.domScope.querySelector(this.options.modalTrigger);
    }

    if (this.modal) {
      this.domtr = new _lib._PlDomTraverse(this.modal);

      if (this.options.closeButton) {
        this.closeButton = (0, _helperFunctions.isElement)(this.options.closeButton) ? this.options.closeButton : this.domScope.querySelector(this.options.closeButton);
      } else {
        this.closeButton = this.modal.querySelector(".modal-inner > [class^='-close']");
      }
    }

    this.id = id;

    if (this.options.focusOnClose) {
      if (typeof this.options.focusOnClose === "string") {
        this.focusOnClose = this.domScope.querySelector(this.options.focusOnClose);
      } else {
        this.focusOnClose = this.options.focusOnClose;
      }
    } else {
      this.focusOnClose = firstFocusable;
    }

    setDefaults.call(this);
  }

  init() {
    wireTriggerEvents.call(this);
    wireCloseEvents.call(this); // Add back to top functionality.

    backToTop.call(this); // Add focus, keyboard, and click events.
    // keyboard trapping

    wireFocusEvents.call(this); // close modal, focus on click outside

    wireClickEvents.call(this); // esc key listener, keyboard outside

    initKeyboardEvents.call(this);
    checkWindowResize.call(this);
    disableScrollIOS.call();
  } // exposed


  close(focusOnClose) {
    focusOnClose = focusOnClose || this.focusOnClose;
    var targetButton,
        self = this;
    if (!this.modal) return;

    if (focusOnClose) {
      if ((0, _helperFunctions.isElement)(focusOnClose)) {
        this.focusOnClose = focusOnClose;
      } else {
        this.focusOnClose = document.querySelector(focusOnClose);
      }
    }

    this.modal.classList.remove("modal-showing");
    this.modal.removeAttribute("aria-hidden"); // distroy DOM traversal

    if (this.domtr) this.domtr.destroy(); // Turn on Body scroll

    (0, _helperFunctions.stopBodyScroll)(false); // Default to firstFocusable if modalIdName or focusOnClose are not present.

    var focusable = document.body.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
        firstFocusable = focusable[0]; // determine focusButton once modal is closed

    if (this.focusOnClose || this.options.focusOnClose) {
      targetButton = this.focusOnClose || this.options.focusOnClose;
    } else {
      targetButton = firstFocusable;
    }

    if (targetButton) targetButton.focus();
    var event = new CustomEvent("closeModal.sg", {
      detail: {
        closed: true,
        modalId: self.id
      }
    });
    this.modal.dispatchEvent(event);
    return false;
  } // exposed


  open(focusOnClose) {
    focusOnClose = focusOnClose || null; // Return if nothing is found.

    if (!this.modal || this.modal.length <= 0) return;

    if (focusOnClose) {
      if ((0, _helperFunctions.isElement)(focusOnClose)) {
        this.focusOnClose = focusOnClose;
      } else {
        this.focusOnClose = document.querySelector(focusOnClose);
      }
    } // operate DOM traversal


    if (this.domtr) this.domtr.init(); // For any size, prevent body scrolling.

    _helperFunctions.stopBodyScroll.call(this, true);

    this.modal.removeAttribute("aria-hidden");
    this.modal.classList.add("modal-showing");
    var event = new CustomEvent("modalOpen.sg", {
      detail: {
        closed: false,
        modalId: this.id
      }
    });
    this.modal.dispatchEvent(event);

    if (this.options.orderButtons === true) {
      orderButtons(this.modal);
    }

    setFocus.call(this);
  }

} // set the default options and initialize the pattern


exports.Modal = Modal;

var modalInit = function (options) {
  options = options || {};
  var parentSelector, parentSelectorEl, newOptions;
  parentSelector = options.domScope || null;
  parentSelectorEl = document.querySelector(parentSelector);
  options.domScope = parentSelector ? parentSelectorEl ? parentSelectorEl : null : document;

  if (options.domScope) {
    options.modalTriggerBtn = options.modalTriggerBtn || options.domScope.querySelectorAll(".full-screen-trigger, .modal-button, .modal-link");

    if (options.modalTriggerBtn.length > 0) {
      [].forEach.call(options.modalTriggerBtn, function (el, index) {
        options.modalTriggerBtn = el;
        options.focusOnClose = el;
        options.closeButton = ".modal-inner [class^='-close']";
        newOptions = setModalDefaultOptions(el, options);
        var modalInit = new Modal(newOptions, index);
        modalInit.init();
      });
    }
  }
};

exports.modalInit = modalInit;

var setModalDefaultOptions = function (elem, options) {
  for (var prop in elem.dataset) {
    options[prop] = elem.dataset[prop];
  }

  if (elem.dataset.modalTrigger) {
    options.modalTrigger = "#" + elem.dataset.modalTrigger;
  }

  return options;
};

const initModal = options => {
  const $kp = window.$kp = window.$kp || {};
  $kp.PL = $kp.PL || {};
  $kp.PL.Modal = new Modal(options);
};

exports.initModal = initModal;
},{"./helper-functions":"../node_modules/modal-pattern/src/helper-functions.js","pl-js-utility/src/lib":"../node_modules/pl-js-utility/src/lib.js"}],"components/benefits-modal/benefits-modal.js":[function(require,module,exports) {
"use strict";

var _modal = require("modal-pattern/src/modal");

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    (0, _modal.modalInit)();
  }
};
},{"modal-pattern/src/modal":"../node_modules/modal-pattern/src/modal.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50377" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","components/benefits-modal/benefits-modal.js"], null)
//# sourceMappingURL=/benefits-modal.a13e04b4.js.map