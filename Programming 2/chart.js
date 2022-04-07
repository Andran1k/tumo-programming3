var socket = io();
statistics = {}
socket.on("data", main);

function main(data) {
    console.log(statistics)
    var xValues = ["Grass", "Gr. Eater", "Predator", "Generator", "Pr. Gen."];
    var yValues = [
        data.grassCounter,
        data.grassEaterCounter,
        data.predatorCounter,
        data.generatorCounter,
        data.predatorGeneratorCounter,
    ];
    var barColors = ["#b3daf1", "yellow", "red", "blue", "orange"];

    new Chart("myChart", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Game of Life"
            }
        }
    });
}