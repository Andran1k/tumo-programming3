class Generator {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
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
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCordinates();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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