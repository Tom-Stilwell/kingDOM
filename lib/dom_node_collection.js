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
