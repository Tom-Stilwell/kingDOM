const Snake = require("./snake.js");
const Board = require("./board.js");
const SnakeView = require("./snake-view.js");

$k(() => {
  const rootEl = $k("#game");

  new SnakeView(rootEl);
});
