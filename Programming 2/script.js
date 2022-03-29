// var Grass = require("./modules/Grass");
// var GrassEater = require("./modules/GrassEater");
// var Predator = require("./modules/Predator");
// var Generator = require("./modules/Generator");
// var PredatorGenerator = require("./modules/PredatorGenerator");

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var generatorArr = [];
var predatorGeneratorArr = [];

var side = 25;

function setup() {
  var matrix = [];
  var weath = 'winter';
  var socket = io();

  // matrix = generateMatrix(30);
  // createObjects();
  // frameRate(5);
  // createCanvas(matrix[0].length * side, matrix.length * side);
  // background('#acacac');

  socket.on("data", draw);
  socket.on("weather", function (data) {
    weath = data;
  })

  function draw(data) {
    matrix = data.matrix;
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
          fill("green");
        } else if (matrix[y][x] == 2) {
          fill("yellow");
        } else if (matrix[y][x] == 3) {
          fill("red");
        } else if (matrix[y][x] == 4) {
          fill("blue");
        } else if (matrix[y][x] == 5) {
          fill("orange");
        } else {
          fill("grey");
        }
        rect(x * side, y * side, side, side);
      }
    }
    for (var i in grassArr) {
      grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
      grassEaterArr[i].eat();
    }

    for (var i in predatorArr) {
      predatorArr[i].eat();
    }

    for (var i in generatorArr) {
      generatorArr[i].generate();
    }

    for (var i in predatorGeneratorArr) {
      predatorGeneratorArr[i].generate();
    }
  }
}

// function createObjects() {
//   for (var y = 0; y < matrix.length; y++) {
//     for (var x = 0; x < matrix[y].length; x++) {
//       if (matrix[y][x] === 1) {
//         var newGrass = new Grass(x, y, 1);
//         grassArr.push(newGrass);
//       } else if (matrix[y][x] === 2) {
//         var newGrassEater = new GrassEater(x, y, 2);
//         grassEaterArr.push(newGrassEater);
//       } else if (matrix[y][x] === 3) {
//         var newPredator = new Predator(x, y, 3);
//         predatorArr.push(newPredator);
//       } else if (matrix[y][x] === 4) {
//         var newGenerator = new Generator(x, y, 4);
//         generatorArr.push(newGenerator);
//       } else if (matrix[y][x] === 5) {
//         var newPredatorGenerator = new PredatorGenerator(x, y, 5);
//         predatorGeneratorArr.push(newPredatorGenerator);
//       }
//     }
//   }
// }

function kill() {
  socket.emit("kill");
}

// function generateMatrix(size) {
//   var newMatrix = [];
//   for (var y = 0; y < size; y++) {
//     newMatrix[y] = [];
//     for (var x = 0; x < size; x++) {
//       var randomId = random(100);
//       if (randomId < 60) {
//         newMatrix[y][x] = 1;
//       } else if (randomId < 62) {
//         newMatrix[y][x] = 2;
//       } else if (randomId < 63) {
//         newMatrix[y][x] = 3;
//       } else if (randomId < 64) {
//         newMatrix[y][x] = 4;
//       } else if (randomId < 66) {
//         newMatrix[y][x] = 5;
//       } else {
//         newMatrix[y][x] = 0;
//       }
//     }
//   }
//   return newMatrix;

// }
