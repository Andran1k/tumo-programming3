var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Grass extends LivingCreature {
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
