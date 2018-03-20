const DOMNodeCollection = require("./dom_node_collection");

let funcQueue = [];

Window.prototype.$l = function(arg) {
  if (typeof arg === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  } else if (typeof arg === "object") {
    if (arg instanceof HTMLElement) {
      return new DOMNodeCollection(
        Array.from(document.querySelectorAll([arg]))
      );
    }
  } else if (typeof arg === "function") {
    if (document.readyState === "complete") {
      arg();
      return;
    }
    funcQueue.push(arg);
    // debugger
    // const readiness = setInterval( () => {
    //   if (document.readyState !== "complete") return;
    //   clearInterval(readiness);
    //
    //   while (funcQueue.length > 0) {
    //     funcQueue[0]();
    //     funcQueue.shift();
    //   }
    // }, 0);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  funcQueue.forEach(func => func());
});

Window.prototype.$l.extend = function(obj1, ...objs) {
  while (objs.length > 0) {
    Object.keys(objs[0]).forEach(key => (obj1[key] = objs[0][key]));
    objs.shift();
  }
  return obj1;
};

Window.prototype.$l.ajax = function(options) {
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

  const finalOpts = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(finalOpts.method, finalOpts.url);
  xhr.onload = function() {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(JSON.parse(xhr.response));
  };

  xhr.send(finalOpts);
};

$l(() => console.log("hey 1"));
$l(() => console.log("hey 2"));
$l(() => alert("the document is ready"));
$l(() => console.log("hey 3"));

// document.readyState !== 'complete'

// Window.prototype.docuReady = function () {
//
// };
