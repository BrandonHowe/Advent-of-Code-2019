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
    let board = {};
    const location = (loc) => (((loc[0] + loc[1]) * (loc[0] + loc[1] + 1) * 0.5) + loc[1])
    // const checkInter = (loc) => {
    //     if (board[location([loc[0],loc[1]])] >= 2 && loc[0] !== center[0] && loc[1] !== center[1]) {
    //         crossed.push(location(loc));
    //         intersections.push([loc[1], loc[0]]);
    //         mandist.push((Math.abs(loc[1] - center[1]) + Math.abs(loc[0] - center[0])));
    //         return 1;
    //     }
    //     return 0;
    // }
    const arrIn = (val, arr) => {
        for (let value of arr) {
            if (val == value) {
                return false;
            }
        }
        return true;
    }
    const center = [5000, 5000];
    board[location([5000, 5000])] = 1;
    let realboard = [{}, {}];
    let inters = [[],[]];
    let currentMove = [5000, 5000];
    for (let j = 0; j < 2; j++) {
        currentMove = [5000, 5000];
        let crossed = [];
        let step = 0;
        var intersections = inters[j];
        for (let command of splitData[j]) {
            // console.log(command.slice(1));
            switch (command.charAt(0)) {
                case "U":
                    for (let i = 0; i < Number(command.slice(1)); i++) {
                        step++;
                        currentMove[0]++;
                        // console.log(board[currentMove[0]][currentMove[1]])
                        if (arrIn(location(currentMove), crossed)) {
                            if (board[location(currentMove)]) {
                                crossed.push(location(currentMove));
                                intersections.push([...currentMove]);
                                board[location(currentMove)]++;
                                realboard[j][location(currentMove)] = step;
                            } else {
                                board[location(currentMove)] = 1;
                                realboard[j][location(currentMove)] = step;
                            }
                        }
                    }
                    break;
                case "R":
                    for (let i = 0; i < Number(command.slice(1)); i++) {
                        step++;
                        currentMove[1]++;
                        if (arrIn(location(currentMove), crossed)) {
                            if (board[location(currentMove)]) {
                                crossed.push(location(currentMove));
                                intersections.push([...currentMove]);
                                board[location(currentMove)]++;
                                realboard[j][location(currentMove)] = step;
                            } else {
                                board[location(currentMove)] = 1;
                                realboard[j][location(currentMove)] = step;
                            }
                        }
                    }
                    break;
                case "L":
                    for (let i = 0; i < Number(command.slice(1)); i++) {
                        step++;
                        currentMove[1]--;
                        if (arrIn(location(currentMove), crossed)) {
                            if (board[location(currentMove)]) {
                                crossed.push(location(currentMove));
                                intersections.push([...currentMove]);
                                board[location(currentMove)]++;
                                realboard[j][location(currentMove)] = step;
                            } else {
                                board[location(currentMove)] = 1;
                                realboard[j][location(currentMove)] = step;
                            }
                        }
                    }
                    break;
                case "D":
                    for (let i = 0; i < Number(command.slice(1)); i++) {
                        step++;
                        currentMove[0]--;
                        if (arrIn(location(currentMove), crossed)) {
                            if (board[location(currentMove)]) {
                                crossed.push(location(currentMove));
                                intersections.push([...currentMove]);
                                board[location(currentMove)]++;
                                realboard[j][location(currentMove)] = step;
                            } else {
                                board[location(currentMove)] = 1;
                                realboard[j][location(currentMove)] = step;
                            }
                        }
                    }
                    break;
            }
            // console.log(crossed);
            // console.log(intersections.length);
            // console.log(board);
            // console.log("Current amt: " + board[currentMove[0]][currentMove[1]]);
        }
    }
    // for (let i in board) {
    //     checkInter(i);
    // }
    let mandist = 9999999;
    for (let val of intersections) {
        if (mandist > (realboard[0][location([val[0], val[1]])] + realboard[1][location([val[0], val[1]])])) {
            mandist = (realboard[0][location([val[0], val[1]])] + realboard[1][location([val[0], val[1]])])
            console.log(realboard[0][location([val[0], val[1]])] + realboard[1][location([val[0], val[1]])]);
        }
    }
    // console.log(intersections);
    console.log("Value: " + mandist);
})