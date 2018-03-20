const DOMNodeCollection = require("./dom_node_collection");

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
