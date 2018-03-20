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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Snake {
  constructor(direction, segments) {
    this.direction = direction; // ["N", "E", "S", "W"]
    this.segments = segments; // grid coordinates
    this.head = this.segments[0];
  }

  move() {
    const head = this.segments[0];
    //
    if (this.direction === "N") {
      this.segments.unshift([head[0] - 1, head[1]]);
    } else if (this.direction === "S") {
      this.segments.unshift([head[0] + 1, head[1]]);
    } else if (this.direction === "W") {
      this.segments.unshift([head[0], head[1] - 1]);
    } else {
      this.segments.unshift([head[0], head[1] + 1]);
    }
    //
    this.segments.pop();
    this.head = this.segments[0];
  }

  turn(direction) {
    if (
      direction === null ||
      this.isOppositeDirections(direction, this.direction)
    ) {
      return false;
    }

    this.direction = direction;
  }

  eat() {
    this.segments = this.segments.concat([null]);
  }

  isOppositeDirections(dir1, dir2) {
    if (dir1 === "N" && dir2 === "S") return true;
    if (dir1 === "S" && dir2 === "N") return true;
    if (dir1 === "W" && dir2 === "E") return true;
    if (dir1 === "E" && dir2 === "W") return true;
    return false;
  }
}

module.exports = Snake;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);

class Board {
  constructor() {
    this.snake = new Snake("N", [[4, 5], [5, 5], [6, 5], [7, 5], [8, 5]]);
    this.makeGrid();
  }

  makeGrid() {
    const grid = [];

    for (let i = 0; i < 10; i++) {
      grid.push([]);
      for (let j = 0; j < 10; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }

  isLost() {
    if (
      this.snake.head[0] > 9 ||
      this.snake.head[0] < 0 ||
      this.snake.head[1] > 9 ||
      this.snake.head[1] < 0
    ) {
      return true;
    } else if (
      this.isArrayInArray(this.snake.segments.slice(1), this.snake.head)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function(ele) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }
}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Board = __webpack_require__(1);
const SnakeView = __webpack_require__(3);

$k(() => {
  const rootEl = $k("#game");

  new SnakeView(rootEl);
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Board = __webpack_require__(1);

class View {
  constructor($kel) {
    this.$kel = $kel;
    this.highestScore = 0;
    this.setupStart();
  }

  setupStart() {
    this.$kel.append("<button id='start' >Start Game</button>");
    this.$kel.append(
      "<form id='select-difficulty'><input type='radio' name='difficulty' value='350' checked> Easy<br><input type='radio' name='difficulty' value='200'> Medium<br><input type='radio' name='difficulty' value='150'> Hard</form>"
    );
    this.$kel.append("<div id='highestScore' />");
    $k("#highestScore").html(`Your Highest Score: ${this.highestScore}`);

    $k("#start").on("click", event => {
      this.difficulty = parseInt(
        document.querySelector('input[name="difficulty"]:checked').value
      );
      this.$kel.children().remove();
      this.$kel.append("<div id='score' />");
      for (let i = 0; i < 100; i++) {
        this.$kel.append("<li>");
      }

      $k("li").each((li, idx) => {
        li.id = idx;
        $k(li).data("pos", [Math.floor(idx / 10), idx % 10]);
      });
      this.score = 0;
      this.board = new Board();
      this.updateScore();
      this.bindEvents(this.$kel);
      this.randomApple();
      $k("#loss").remove();
      this.step();
    });
  }

  bindEvents($kel) {
    $k(document).on("keypress", event => {
      let direction = null;
      //
      if (event.keyCode === 97) {
        direction = "W";
      } else if (event.keyCode === 119) {
        direction = "N";
      } else if (event.keyCode === 100) {
        direction = "E";
      } else if (event.keyCode === 115) {
        direction = "S";
      }

      this.board.snake.turn(direction);
    });
  }

  step() {
    const stepFunc = () => {
      this.board.snake.move();
      this.checkApple();
      this.renderBoard();
      if (this.board.isLost()) {
        this.$kel.append("<div id='loss' />");
        $k("#loss").html("Game Over");
        if (this.score > this.highestScore) {
          this.highestScore = this.score;
        }
        this.setupStart();
      } else {
        setTimeout(stepFunc, this.difficulty);
      }
    };
    setTimeout(stepFunc, this.difficulty);
  }

  checkApple() {
    if (this.arraysEqual(this.board.snake.head, this.apple)) {
      this.board.snake.eat();
      this.updateScore(Math.round(100 - this.difficulty / 5));
      this.randomApple();
      this.difficulty = Math.round(this.difficulty * 0.95);
    }
  }

  renderBoard() {
    $k("li").each((li, idx) => {
      const pos = $k(li)
        .data("pos")
        .split(",")
        .map(num => parseInt(num));

      if (this.isArrayInArray(this.board.snake.segments, pos)) {
        $k(li).removeClass();
        $k(li).addClass("segment");
        if (this.arraysEqual(this.board.snake.head, pos)) {
          $k(li).addClass("head");
        }
      } else if (this.arraysEqual(this.apple, pos)) {
        $k(li).addClass("apple");
      } else {
        $k(li).removeClass();
      }
    });
  }

  updateScore(value = 0) {
    this.score += value;
    $k("#score").html(`Score : ${this.score}`);
  }

  arraysEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  randomApple() {
    let apple = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ];

    while (this.isArrayInArray(this.board.snake.segments, apple)) {
      apple = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }

    this.apple = apple;
  }

  isArrayInArray(arr, item) {
    var itemAsString = JSON.stringify(item);

    var contains = arr.some(function(ele) {
      return JSON.stringify(ele) === itemAsString;
    });
    return contains;
  }
}

module.exports = View;


/***/ })
/******/ ]);