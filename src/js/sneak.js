class Direction {
  constructor(axis, modifier) {
    this.axis = axis;
    this.modifier = modifier;
  }

  apply(position) {
    position[this.axis] += this.modifier;
    return position;
  }
}

const NORTH = new Direction("row", -1);
const SOUTH = new Direction("row", +1);
const EAST = new Direction("column", +1);
const WEST = new Direction("column", -1);

class Sneak {
  constructor(position, size) {
    this.position = position;
    this.direction = WEST;
    this.tail = [];
    xTimes(size - 1).forEach(() => this.increaseSize());
  }

  get size() {
    return this.tail.length + 1;
  }

  increaseSize() {
    const len = this.tail.length;
    const { position } = len == 0 ? this : this.tail[len - 1];

    const pos = new Position(position.row, position.column);
    pos[this.direction.axis] -= this.direction.modifier;
    this.tail.push(new SneakTail(this, pos));
  }

  step() {
    for (let i = this.tail.length - 1; i >= 0; i--) {
      if (i === 0) {
        this.tail[i].position.copy(this.position);
      } else {
        this.tail[i].position.copy(this.tail[i - 1].position);
      }
    }
    this.direction.apply(this.position);
    // check if it's outside the canvas
    if (this.position[this.direction.axis] < 0) {
      this.position[this.direction.axis] = BOUNDS[this.direction.axis] - 1;
    }
    if (this.position[this.direction.axis] >= BOUNDS[this.direction.axis]) {
      this.position[this.direction.axis] = 0;
    }
  }
}

class SneakTail {
  constructor(sneak, position) {
    this.sneak = sneak;
    this.position = position;
  }
}
