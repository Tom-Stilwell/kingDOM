# kingDOM

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

<img src="https://github.com/Tom-Stilwell/kingDOM/blob/master/kingDOM.png" alt="spooky" align="center" width="100px" height="100px"/>

[Live Site](https://tom-stilwell.github.io/kingDOM/)

## Overview

kingDOM is a DOM manipulation library that provides simplified methods for
finding, displaying, modifying, and removing HTML from the DOM. The library
is made entirely with JavaScript and allows users to search for elements via
selectors and modify the content, classes, children, and parents of the elements.
kingDOM also allows users to make AJAX requests that return JavaScript promises.

## Snake

The functionality of kingDOM is easily seen in the implementation of a classic
snake game in the browser. The board is entirely rendered upon start and classes are toggled for displaying the logic of the game to the viewer. The game employs
timeouts for animation frames and uses frame rates to increase difficulty as
play progresses.

## AJAX

kingDOM utilizes custom XML HTTP Requests to communicate with APIs. The method
returns a promise that can be resolved or rejected via user-inputted callbacks.

```javascript
// lib/main.js #ajax
return new Promise(function(resolve, reject) {
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (this.status === 200) {
      resolve(this.response);
    } else {
      reject(new Error(this.statusText));
    }
  };
```

## The Future

kingDOM has the ability to be expanded further, especially in the realm of AJAX requests. Future endeavors include:

* Chaining promise resolutions
* More versatile searching
* Broader data storage input
