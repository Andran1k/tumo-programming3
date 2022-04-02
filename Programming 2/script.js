var side = 25;
var socket = io();

function setup() {
  var matrix = [];
  var weath = 'winter';

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

        if (matrix[y][x] === 1) {
          fill("green");
        } else if (matrix[y][x] === 2) {
          fill("yellow");
        } else if (matrix[y][x] === 3) {
          fill("red");
        } else if (matrix[y][x] === 4) {
          fill("blue");
        } else if (matrix[y][x] === 5) {
          fill("orange");
        } else {
          fill("grey");
        }
        rect(x * side, y * side, side, side);
      }
    }
  }
}

function kill() {
  socket.emit("kill");
}