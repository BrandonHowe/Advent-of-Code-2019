const fs = require('fs');

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

fs.readFile('Day 3/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const splitData = data.split("\n");
    for (let i = 0; i < splitData.length; i++) {
        splitData[i] = splitData[i].split(",")
    }
    // console.log(splitData);
    let board = [];
    for (let i = 0; i < 10000; i++) {
        board.push([]);
        for (let j = 0; j < 10000; j++) {
            board[i].push(0);
        }
    }
    const checkInter = (loc) => {
        if (board[loc[0]][loc[1]] === 2 && loc[0] !== center[0] && loc[1] !== center[1]) {
            intersections.push([loc[1], loc[0]]);
            mandist.push((Math.abs(loc[1] - center[1]) + Math.abs(loc[0] - center[0])));
            return 1;
        }
        return 0;
    }
    const center = [5000, 5000];
    board[5000][5000] = 1;
    let currentMove = [5000, 5000];
    let intersections = [];
    let mandist = [];
    for (let wire of splitData) {
    currentMove = [5000, 5000];
    console.log("new wire");
    for (let command of wire) {
        // console.log(command.slice(1));
        switch (command.charAt(0)) {
            case "U":
                for (let i = 0; i < Number(command.slice(1)); i++) {
                    currentMove[0]++;
                    // console.log(board[currentMove[0]][currentMove[1]])
                    board[currentMove[0]][currentMove[1]]++;
                }
                break;
            case "R":
                for (let i = 0; i < Number(command.slice(1)); i++) {
                    currentMove[1]++;
                    board[currentMove[0]][currentMove[1]]++;
                }
                break;
            case "L":
                for (let i = 0; i < Number(command.slice(1)); i++) {
                    currentMove[1]--;
                    board[currentMove[0]][currentMove[1]]++;
                }
                break;
            case "D":
                for (let i = 0; i < Number(command.slice(1)); i++) {
                    currentMove[0]--;
                    board[currentMove[0]][currentMove[1]]++;
                }
                break;
        }
        // console.log(board);
        // console.log("Current amt: " + board[currentMove[0]][currentMove[1]]);
    }
    }
    for (let i = 0; i < 10000; i++) {
        for (let j = 0; j < 10000; j++) {
            checkInter([i, j]);
        }
    }
    console.log(intersections);
    console.log(Array.min(mandist));
})

/*

const fs = require('fs');

const inputs = fs.readFileSync('solution.txt',{encoding:'utf8'}).toString().split('\n')
    const wire1 = inputs[0].split(',')
    const wire2 = inputs[1].split(',')
    let map = {}, lowest = 999999
    function runWire(wire, check = false) {
        var x = 0, y = 0
        for (var i = 0; i < wire.length; i++) {
            var op = wire[i][0]
            var ct = parseInt(wire[i].substring(1))
            var xx = 0, yy = 0
            if (op == "R") xx = 1
            if (op == "L") xx = -1
            if (op == "U") yy = 1
            if (op == "D") yy = -1
            for (var b = 0; b < ct; b++) {
                x += xx, y += yy
                if (!check) {
                  map[x + '_' + y] = 1
                } else {
                  if (map[x + '_' + y] == 1) {
                    var dist = Math.abs(x) + Math.abs(y)
                    if (dist < lowest) lowest = dist
                }
            }
        }
    } 
}
  
runWire(wire1)
runWire(wire2, true)
console.log(lowest)
let map1steps = {}
map = {}, lowest = 999999

function runWire2(wire, check = false) {
    var x = 0, y = 0, steps = 0
    for (var i = 0; i < wire.length; i++) {
        var op = wire[i][0]
        var ct = parseInt(wire[i].substring(1))
        var xx = 0, yy = 0
        if (op == "R") xx = 1
        if (op == "L") xx = -1
        if (op == "U") yy = 1
        if (op == "D") yy = -1
        for (var b = 0; b < ct; b++) {
            steps++, x += xx, y += yy
            if (!check) {
                map[x + '_' + y] = 1
                if (!map1steps[x + '_' + y]) map1steps[x + '_' + y] = steps
            } else {
                if (map[x + '_' + y] == 1) {
                    var dist = map1steps[x + '_' + y] + steps
                    if (dist < lowest) lowest = dist
                }
            }
        }
    }  
}

runWire2(wire1)
runWire2(wire2, true)
console.log(lowest)

*/