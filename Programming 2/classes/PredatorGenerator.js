let LivingCreature = require("./LivingCreature");

class PredatorGenerator extends LivingCreature {
  constructor(x, y, id) {
    super(x, y, id);
    this.energy = 8;
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

    if (this.timer % 20 == 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];

      var newPredator = new Predator(newX, newY, this.id - 2);
      predatorArr.push(newPredator);

      matrix[newY][newX] = this.id - 2;

      this.die();
    }

    this.timer++;
  }

  generateYourself() {
    var borderX = floor(random(0, matrix.length));
    var borderY = floor(random(0, matrix.length));
    for (var y = borderY; y < matrix.length; y++) {
      for (var x = borderX; x < matrix.length; x++) {
        if (matrix[y][x] == 0) {
          var newX = x;
          var newY = y;

          var newPredatorGenerator = new PredatorGenerator(newX, newY, this.id);
          predatorGeneratorArr.push(newPredatorGenerator);

          matrix[newY][newX] = this.id;
          break;
        }
      }
      break;
    }
  }

  die() {
    if (this.timer >= 40) {
      matrix[this.y][this.x] = 0;

      for (var i in predatorGeneratorArr) {
        if (
          predatorGeneratorArr[i].x == this.x &&
          predatorGeneratorArr[i].y == this.y
        ) {
          predatorGeneratorArr.splice(i, 1);
          break;
        }
      }
      this.generateYourself();
    }
  }
}
