var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Grass extends LivingCreature {
  constructor(x, y, id) {
    super(x, y, id);
    this.multiply = 0;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }
  mul() {
    this.multiply++;

    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (this.multiply >= 8 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];

      matrix[newY][newX] = this.id;

      var newGrass = new Grass(newX, newY, this.id);
      grassArr.push(newGrass);

      this.multiply = 0;
    }
  }
}
