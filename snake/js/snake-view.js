const Snake = require("./snake.js");
const Board = require("./board.js");

class View {
  constructor($kel) {
    this.$kel = $kel;
    this.highestScore = 0;
    this.setupStart();
  }

  setupStart() {
    this.$kel.append("<button id='start' >Start Game</button>");
    this.$kel.append("<div id='highestScore' />");
    $k("#highestScore").html(`Your Highest Score: ${this.highestScore}`);
    $k("#start").on("click", event => {
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
    $kel.on("keypress", event => {
      let direction = null;
      // debugger
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
    const id = setInterval(() => {
      this.board.snake.move();
      this.checkApple();
      this.renderBoard();
      if (this.board.isLost()) {
        this.$kel.append("<div id='loss' />");
        $k("#loss").html("You Lose");
        clearInterval(id);
        if (this.score > this.highestScore) {
          this.highestScore = this.score;
        }
        this.setupStart();
      }
    }, 200);
    // debugger;
  }

  checkApple() {
    if (this.arraysEqual(this.board.snake.head, this.apple)) {
      this.board.snake.eat();
      this.updateScore(1);
      this.randomApple();
    }
  }

  renderBoard() {
    $k("li").each((li, idx) => {
      const pos = $k(li)
        .data("pos")
        .split(",")
        .map(num => parseInt(num));
      // debugger;

      if (this.isArrayInArray(this.board.snake.segments, pos)) {
        $k(li).removeClass();
        $k(li).addClass("segment");
      } else if (this.arraysEqual(this.apple, pos)) {
        $k(li).addClass("apple");
      } else {
        // debugger;
        $k(li).removeClass();
      }
    });
  }

  updateScore(value = 0) {
    // debugger;
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
