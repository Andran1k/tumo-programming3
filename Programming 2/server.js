//
weath = "winter"
//! Requiring modules  --  START
var Grass = require("./classes/Grass.js");
var GrassEater = require("./classes/GrassEater.js");
var Predator = require("./classes/Predator");
var Generator = require("./classes/Generator");
var PredatorGenerator = require("./classes/PredatorGenerator");
var random = require('./classes/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
generatorArr = [];
predatorGeneratorArr = [];
matrix = [];
//! Setting global arrays  -- END

var fs = require('fs');

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predatorArr, generatorArr, predatorGeneratorArr) {
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let o = 0; o < matrixSize; o++) {
      matrix[i][o] = 0;
    }
  }
  for (let i = 0; i < grass; i++) {
    let customX = Math.floor(random(matrixSize)); // 0-9
    let customY = Math.floor(random(matrixSize)); // 4
    matrix[customY][customX] = 1;
  }
  for (let i = 0; i < grassEater; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 2;
  }
  for (let i = 0; i < predatorArr; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 3;
  }
  for (let i = 0; i < generatorArr; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 4;
  }
  for (let i = 0; i < predatorGeneratorArr; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 5;
  }
}

matrixGenerator(20, 1, 1);

//! Creating MATRIX -- END

function weather() {
  if (weath === "winter") {
    weath = "spring";
  } else if (weath === "spring") {
    weath = "summer";
  } else if (weath === "summer") {
    weath = "autumn";
  } else if (weath === "autumn") {
    weath = "winter";
  }
  io.sockets.emit('weather', weath)
}

setInterval(weather, 5000);

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('index.html');
});
server.listen(3000);

//! SERVER STUFF END  --  END


function creatingObjects() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 2) {
        var grassEater = new GrassEater(x, y);
        grassEaterArr.push(grassEater);
      } else if (matrix[y][x] === 1) {
        var grass = new Grass(x, y);
        grassArr.push(grass);
      }
    }
  }
}

function game() {
  if (grassArr[0] !== undefined) {
    if (weath !== 'autumn') {
      for (var i in grassArr) {
        grassArr[i].mul();
      }
    }

  }
  if (grassEaterArr[0] !== undefined) {
    for (var i in grassEaterArr) {
      grassEaterArr[i].eat();
    }
  }

  //! Object to send
  let sendData = {
    matrix: matrix,
    grassCounter: grassArr.length
  }

  //! Send data over the socket to clients who listens "data"
  io.sockets.emit("data", sendData);
}


setInterval(game, 1000)

//// Add event
function kill() {
  grassArr = [];
  grassEaterArr = []
  predatorArr = []
  generatorArr = []
  predatorGeneratorArr = []
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
}

io.on('connection', function (socket) {
  creatingObjects();
  socket.on("kill", kill);
});
////   Create static Json
var statistics = {};

setInterval(function () {
  statistics.grass = grassArr.length;
  statistics.grassEater = grassEaterArr.length;
  statistics.predator = grassEaterArr.predator;
  statistics.generator = grassEaterArr.generator;
  statistics.predatorGenerator = grassEaterArr.predatorGenerator;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
  })
}, 1000)