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
