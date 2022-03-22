let LivingCreature = require("./LivingCreature");

class Generator extends LivingCreature {
  constructor(x, y, id) {
    super(x, y, id);
    this.timer = 0;
    this.getNewCordinates();
  }

  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCordinates();
    return super.chooseCell(character);
  }

  generate() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (this.timer > 3 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];

      var newGrass = new Grass(newX, newY, this.id - 3);
      grassArr.push(newGrass);

      matrix[newY][newX] = this.id - 3;

      this.timer = 0;
    }

    this.timer++;
  }
}
