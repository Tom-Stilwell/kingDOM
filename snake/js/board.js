const Snake = require("./snake.js");

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
