//
weath = "winter"
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator");
var Generator = require("./modules/Generator");
var PredatorGenerator = require("./modules/PredatorGenerator");
var random = require('./modules/random');
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
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
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

matrixGenerator(25, 100, 10, 10, 10, 10);

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
            if (matrix[y][x] === 1) {
                var newGrass = new Grass(x, y, 1);
                grassArr.push(newGrass);
            } else if (matrix[y][x] === 2) {
                var newGrassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(newGrassEater);
            } else if (matrix[y][x] === 3) {
                var newPredator = new Predator(x, y, 3);
                predatorArr.push(newPredator);
            } else if (matrix[y][x] === 4) {
                var newGenerator = new Generator(x, y, 4);
                generatorArr.push(newGenerator);
            } else if (matrix[y][x] === 5) {
                var newPredatorGenerator = new PredatorGenerator(x, y, 5);
                predatorGeneratorArr.push(newPredatorGenerator);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }

    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }

    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }

    if (generatorArr[0] !== undefined) {
        for (var i in generatorArr) {
            generatorArr[i].generate();
        }
    }

    if (predatorGeneratorArr[0] !== undefined) {
        for (var i in predatorGeneratorArr) {
            predatorGeneratorArr[i].generate();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        predatorCounter: predatorArr.length,
        generatorCounter: generatorArr.length,
        predatorGeneratorCounter: predatorGeneratorArr.length,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 2000)

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

function generate() {
    matrixGenerator(25, 100, 10, 10, 10, 10);
    creatingObjects();
}

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("generate", generate);
});