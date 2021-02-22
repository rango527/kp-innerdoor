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
})({"d5X0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = polyfillInit;

function polyfillInit() {
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = function () {
      var toStr = Object.prototype.toString;

      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };

      var toInteger = function (value) {
        var number = Number(value);

        if (isNaN(number)) {
          return 0;
        }

        if (number === 0 || !isFinite(number)) {
          return number;
        }

        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };

      var maxSafeInteger = Math.pow(2, 53) - 1;

      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      }; // The length property of the from method is 1.


      return function from(arrayLike
      /*, mapFn, thisArg */
      ) {
        // 1. Let C be the this value.
        var C = this; // 2. Let items be ToObject(arrayLike).

        var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
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

        var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

        var k = 0; // 17. Repeat, while k < len… (also steps a - h)

        var kValue;

        while (k < len) {
          kValue = items[k];

          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }

          k += 1;
        } // 18. Let putStatus be Put(A, "length", len, true).


        A.length = len; // 20. Return A.

        return A;
      };
    }();
  } // https://tc39.github.io/ecma262/#sec-array.prototype.find


  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function (predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


        var thisArg = arguments[1]; // 5. Let k be 0.

        var k = 0; // 6. Repeat, while k < len

        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];

          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          } // e. Increase k by 1.


          k++;
        } // 7. Return undefined.


        return undefined;
      },
      configurable: true,
      writable: true
    });
  } // https://tc39.github.io/ecma262/#sec-array.prototype.includes


  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function (searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }
}
},{}],"aZl2":[function(require,module,exports) {
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
},{}],"F7XA":[function(require,module,exports) {
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
},{"./user-agent":"aZl2"}],"pCgX":[function(require,module,exports) {
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
},{}],"JHHG":[function(require,module,exports) {
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
},{"./dom":"F7XA"}],"BDBs":[function(require,module,exports) {
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
},{}],"WE0e":[function(require,module,exports) {
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
},{}],"KX2i":[function(require,module,exports) {
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
},{}],"SIQL":[function(require,module,exports) {
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
},{}],"TTN9":[function(require,module,exports) {
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
},{}],"Qeh7":[function(require,module,exports) {
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
},{}],"T0oY":[function(require,module,exports) {
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
},{"./dom":"F7XA"}],"gK5Z":[function(require,module,exports) {
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
},{"./lib/dom":"F7XA","./lib/events":"pCgX","./lib/focus-trap":"JHHG","./lib/http-requests":"BDBs","./lib/i18n":"WE0e","./lib/iteration":"KX2i","./lib/math":"SIQL","./lib/polyfill":"TTN9","./lib/styling":"Qeh7","./lib/user-agent":"aZl2","./lib/node-traversal":"T0oY"}],"CeMg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = navigationalPickerInit;

var _lib = require("pl-js-utility/src/lib");

function navigationalPickerInit(parentSelector) {
  // set your select pattern init function name
  var parentSelectorEl, domScope, patternClass, patternClassInitialized, elsPrevious, elsNew;
  parentSelector = parentSelector || null;
  parentSelectorEl = document.querySelector(parentSelector);
  domScope = parentSelector ? parentSelectorEl ? parentSelectorEl : null : document;

  if (domScope) {
    patternClass = 'navigational-picker', // set your select pattern class name
    patternClassInitialized = patternClass + '--initialized';
    elsPrevious = document.querySelectorAll('.' + patternClassInitialized);
    elsNew = domScope.querySelectorAll('.' + patternClass + ':not(.' + patternClassInitialized + ')');

    var init = function (el, index) {
      el.classList.add(patternClassInitialized); // buttons event listeners
      // ul event listers

      var dropdownButton = el.querySelector(".navigational-select-dropdown"),
          optionsList = el.querySelector(".navigational-select-dropdown__list"),
          options = optionsList.querySelectorAll(".navigational-select-value"),
          selectDropdownValue;
      var dropdownTag = el.querySelector(".navigational-select-dropdown-value");

      if (el.querySelector(".navigational-select-dropdown-value")) {
        selectDropdownValue = el.querySelector(".navigational-select-dropdown-value");
      } else {
        selectDropdownValue = el.querySelector(".proxy-select-dropdown-value");
      }

      if (navigator.userAgent.indexOf("iPhone") > -1) {
        dropdownButton.addEventListener("touchstart", function (e) {
          var target = e.currentTarget;
          toggleDropdown(optionsList, target);
        });
        dropdownButton.addEventListener("click", function (e) {
          var target = e.currentTarget;
          toggleDropdown(optionsList, target);
        });
      }

      dropdownButton.addEventListener("click", function (e) {
        var target = e.currentTarget;
        toggleDropdown(optionsList, target);
      });
      dropdownButton.addEventListener("keydown", function (e) {
        var target = e.currentTarget;

        if (e.which === 40 || e.which === 38) {
          e.preventDefault();
          toggleDropdown(optionsList, target);
        }
      });
      window.addEventListener("click", function (e) {
        var isInsideOfParentMarkup = el.contains(e.target);

        if (!isInsideOfParentMarkup) {
          closeDropdown(optionsList, options, dropdownButton);
        }
      });
      optionsList.addEventListener("click", function (e) {
        var target = e.currentTarget;
        selectOption(e, options);
        closeDropdown(target, options, dropdownButton);
      });
      optionsList.addEventListener("keydown", function (e) {
        if (e.which === 40) {
          e.preventDefault();
          focusOnNextOption();
        }

        if (e.which === 38) {
          e.preventDefault();
          focusOnPreviousOption();
        }

        if (e.which === 32 || e.which === 13) {
          e.preventDefault();
          selectOption(e, options);
          closeDropdown(optionsList, options, dropdownButton);
        }

        if (e.which === 27 || e.which === 9) {
          closeDropdown(optionsList, options, dropdownButton);
        }
      });

      var toggleDropdown = function toggleDropdown(list, button) {
        list.classList.toggle('-expanded');
        var ariaExpanded = button.getAttribute('aria-expanded');
        button.setAttribute('aria-expanded', !ariaExpanded);

        if (list.classList.contains('-expanded')) {
          button.setAttribute('aria-expanded', true);
          var options = list.querySelectorAll("li");
          getSelectedOption(options).focus();
        }
      };

      var selectOption = function (event, options) {
        event.preventDefault();
        getSelectedOption(options).setAttribute('aria-selected', false);
        event.target.setAttribute('aria-selected', true);
        event.target.setAttribute('tabIndex', 0);
        closeDropdown(optionsList, options, dropdownButton);
      };

      var getSelectedOption = function (options) {
        var selectedOption = [].find.call(options, function (option) {
          return option.getAttribute('aria-selected') === 'true';
        });
        return selectedOption ? selectedOption : options[0];
      };

      [].forEach.call(options, function (dataValue) {
        var optionsList = optionsList;
        var options = options;
        var dropdownButton = dropdownButton;
        dataValue.addEventListener("click", function () {
          selectDropdownValue.textContent = dataValue.dataset.value;
        });
        dataValue.addEventListener("keydown", function (e) {
          var key = e.which || e.keyCode;
          e.preventDefault();

          if (key === 13) {
            selectDropdownValue.textContent = dataValue.dataset.value.trim();
          }

          if (key === 32) {
            selectDropdownValue.textContent = dataValue.dataset.value.trim();
            closeDropdown(optionsList, options, dropdownButton);
          }
        });
      });

      var focusOnPreviousOption = function focusOnPreviousOption() {
        var previousOption = document.activeElement.previousElementSibling;

        if (previousOption) {
          document.activeElement.setAttribute('tabIndex', -1);
          previousOption.setAttribute('tabIndex', 0);
          previousOption.focus();
        }
      };

      var focusOnNextOption = function focusOnNextOption() {
        var nextOption = document.activeElement.nextElementSibling;

        if (nextOption) {
          document.activeElement.setAttribute('tabIndex', -1);
          nextOption.setAttribute('tabIndex', 0);
          nextOption.focus();
        }
      };

      var closeDropdown = function closeDropdown(list, options, button) {
        if (list.classList.contains('-expanded')) {
          list.classList.remove('-expanded');
          button.setAttribute('aria-expanded', false);
          getSelectedOption(options).blur();
          button.focus();
        }
      };

      var elIndex = index + elsPrevious.length;
      el.setAttribute('id', patternClass + '--' + elIndex);
    };

    if (elsNew.length) {
      [].forEach.call(elsNew, function (el, index) {
        init(el, index);
      });
    }
  }
}
},{"pl-js-utility/src/lib":"gK5Z"}],"gFsF":[function(require,module,exports) {
"use strict";

var _polyfills = _interopRequireDefault(require("navigational-picker-pattern/src/polyfills"));

var _navigationalPicker = _interopRequireDefault(require("navigational-picker-pattern/src/navigational-picker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    (0, _polyfills.default)();
    (0, _navigationalPicker.default)();
  }
};
},{"navigational-picker-pattern/src/polyfills":"d5X0","navigational-picker-pattern/src/navigational-picker":"CeMg"}]},{},["gFsF"], null)
//# sourceMappingURL=proxy-picker.1b5b1c93.js.map