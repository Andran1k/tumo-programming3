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
          if (weath === "winter") {
            fill("#b3daf1");
          } else if (weath === "spring") {
            fill("#35a60b");
          } else if ("summer"){
              fill("#fbc326");
          } else if ("autumn") {
            fill("#fb7126")
          }
        } else if (matrix[y][x] === 2) {
          fill("yellow");
        } else if (matrix[y][x] === 3) {
          fill("red");
        } else if (matrix[y][x] === 4) {
          fill("blue");
        } else if (matrix[y][x] === 5) {
          fill("orange");
        } else {
          if (weath === "winter") {
            fill("#cdd4fd");
          } else if (weath === "spring") {
            fill("#cdfdf9");
          } else if ("summer"){
              fill("#effdcd");
          } else if ("autumn") {
            fill("#fde1cd")
          }
        }
        rect(x * side, y * side, side, side);
      }
    }
  }
}

function kill() {
  socket.emit("kill");
}

function generate() {
  socket.emit("generate");
}