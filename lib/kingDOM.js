/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(4);

let funcQueue = [];

Window.prototype.$k = function(arg) {
  // debugger;
  if (typeof arg === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  } else if (arg === document) {
    return new DOMNodeCollection([document]);
  } else if (typeof arg === "object") {
    if (arg instanceof HTMLElement) {
      if (arg.id) {
        return new DOMNodeCollection([document.getElementById(arg.id)]);
      }
      return new DOMNodeCollection(
        Array.from(document.querySelectorAll([arg.tagName]))
      );
    }
  } else if (typeof arg === "function") {
    if (document.readyState === "complete") {
      arg();
      return;
    }
    funcQueue.push(arg);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  funcQueue.forEach(func => func());
});

Window.prototype.$k.extend = function(obj1, ...objs) {
  while (objs.length > 0) {
    Object.keys(objs[0]).forEach(key => (obj1[key] = objs[0][key]));
    objs.shift();
  }
  return obj1;
};

Window.prototype.$k.ajax = function(options) {
  const defaults = {
    method: "GET",
    url: `${document.URL}`,
    data: "Here is your data as an object, array, or string",
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    dataType: "json",
    error: () => alert("~Error!~"),
    success: () => alert("Congration. You done it.")
  };

  const finalOpts = $k.extend(defaults, options);

  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    xhr.open(finalOpts.method, finalOpts.url);
    // xhr.onload = function() {
    //   console.log(xhr.status);
    //   console.log(xhr.responseType);
    //   console.log(JSON.parse(xhr.response));
    // };

    xhr.send(finalOpts);
  });
};

// $k(() => console.log("hey 1"));
// $k(() => console.log("hey 2"));
// $k(() => alert("the document is ready"));
// $k(() => console.log("hey 3"));

// document.readyState !== 'complete'

// Window.prototype.docuReady = function () {
//
// };


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(arr) {
    this.HTMLarr = arr;
  }

  html(innerText) {
    if (innerText) {
      this.HTMLarr.forEach(node => (node.innerHTML = innerText));
    } else {
      return this.HTMLarr[0].innerHTML;
    }
  }

  index(idx) {
    // debugger;
    return this.HTMLarr[idx];
  }

  empty() {
    this.HTMLarr.forEach(node => (node.innerHTML = ""));
  }

  each(callback) {
    this.HTMLarr.forEach(callback);
  }

  data(key, value) {
    if (!value) {
      return this.HTMLarr[0].dataset[key];
    }

    this.HTMLarr.forEach(node => {
      return (node.dataset[key] = value);
    });
  }

  append(arg) {
    if (typeof arg === "string") {
      this.HTMLarr.forEach(node => (node.innerHTML += arg));
    } else if (typeof arg === "object") {
      if (arg instanceof HTMLElement) {
        this.HTMLarr.forEach(node => (node.innerHTML += arg.outerHTML));
      } else if (arg instanceof DOMNodeCollection) {
        this.HTMLarr.forEach(node =>
          arg.HTMLarr.forEach(argNode => (node.innerHTML += argNode.outerHTML))
        );
      }
    }
  }

  attr(name, value) {
    if (value) {
      this.HTMLarr.forEach(node => (node[name] = value));
    } else {
      return this.HTMLarr[0][name];
    }
  }

  addClass(name) {
    this.HTMLarr.forEach(node => (node.className += ` ${name}`));
  }

  removeClass(name) {
    if (name) {
      this.HTMLarr.forEach(
        node => (node.className = node.className.replace(`${name}`, ""))
      );
    } else {
      this.HTMLarr.forEach(node => (node.className = ""));
    }
  }
  // traversal //

  children() {
    let dom = new DOMNodeCollection([]);

    this.HTMLarr.forEach(node =>
      Array.from(node.children).forEach(child => dom.HTMLarr.push(child))
    );

    return dom;
  }

  parent() {
    let dom = new DOMNodeCollection([]);

    this.HTMLarr.forEach(node => dom.HTMLarr.push(node.parentNode));

    return dom;
  }

  find(selector) {
    let dom = new DOMNodeCollection([]);
    let kids = [];

    this.HTMLarr.forEach(node => {
      kids = Array.from(node.querySelectorAll(selector));
      dom.HTMLarr = dom.HTMLarr.concat(kids);
    });

    return dom;
  }

  remove() {
    this.empty();

    let parentCollection = this.parent();

    for (let i = 0; i < parentCollection.HTMLarr.length; i++) {
      let parent = parentCollection.HTMLarr[i];
      parent.removeChild(this.HTMLarr[i]);
    }
  }

  on(type, callback) {
    this.HTMLarr.forEach(node => {
      node.addEventListener(type, callback);
    });

    this.attr("eventCallback", callback);
  }

  off(type) {
    const callback = this.attr("eventCallback");

    this.HTMLarr.forEach(node => {
      node.removeEventListener(type, callback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);