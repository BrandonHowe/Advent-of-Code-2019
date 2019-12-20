const fs = require('fs');

let relbase = 0;

const changeVals = (arr, opidx, input) => {
    // console.log("Result: " + (arr[arr[opidx[0] + 1]] + arr[arr[opidx[0] + 2]]));
    const op = arr[opidx[0].toString()];
    // console.log("OP " + op + "|" + opidx[0] + "|" + relbase);
    const instr = op % 100;
    const p1mode = Math.floor(op / 100 % 10);
    let p2mode, p3mode;
    if (instr != 3 || instr != 4) {
        p2mode = Math.floor(op / 1000 % 10);
        p3mode = Math.floor(op / 10000 % 10);
    }
    // console.log(p1mode + "|" + p2mode + "|" + p3mode);
    let p1value, p2value;
    if (p1mode === 0) {
        p1value = arr[arr[(opidx[0] + 1).toString()].toString()];
    } else if (p1mode === 1) {
        p1value = arr[(opidx[0] + 1).toString()];
    } else if (p1mode === 2) { 
        p1value = arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()];
        // console.log("P2: " + p2value);
    }
    if (p2mode === 0) {
        p2value = arr[arr[(opidx[0] + 2).toString()].toString()];
    } else if (p2mode === 1) {
        // console.log("aso")
        p2value = arr[(opidx[0] + 2).toString()];
    } else if (p2mode === 2) {
        p2value = arr[(relbase + arr[(opidx[0] + 2).toString()]).toString()];
        // console.log("P2: " + p2value);
    }
    let p3value;
    if (arr[(opidx[0] + 3).toString()]) {
        p3value = arr[arr[(opidx[0] + 3).toString()].toString()];
    } else {
        p3value = 0;   
    }
    if (p3mode === 2) {
        p3value = relbase + arr[(opidx[0] + 3).toString()]
    }
    if (instr === 1) {
        // console.log("Sum: " + p1value + "|" + p2value);
        if (p3mode === 0) {
            arr[arr[(opidx[0] + 3).toString()].toString()] = p1value + p2value;
        } else if (p3mode === 2) {
            arr[(relbase + arr[(opidx[0] + 3).toString()]).toString()] = p1value + p2value;
        }
    } else if (instr === 2) {
        if (p3mode === 0) {
            arr[arr[(opidx[0] + 3).toString()].toString()] = p1value * p2value;
        } else if (p3mode === 2) {
            arr[(relbase + arr[(opidx[0] + 3).toString()]).toString()] = p1value * p2value;
        }
    } else if (instr === 3) {
        // console.log("Input!");
        if (p1mode == 0) {
            arr[arr[(opidx[0] + 1).toString()].toString()] = input.shift();
        } else if (p1mode == 2) {
            console.log("Relbase: " + (relbase + "|" + (relbase + (opidx[0] + 1)).toString()));
            arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()] = input.shift();
        }
    } else if (instr === 4) {
        // console.log(relbase + arr[(opidx[0] + 1).toString()])
        // console.log("Output! It is " + arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()]);
        // console.log("Ouput! " + arr[arr[(opidx[0] + 1).toString()].toString()]);
        if (p1mode == 0) {
            return arr[arr[(opidx[0] + 1).toString()].toString()];
        } else if (p1mode === 1) {
            return arr[(opidx[0] + 1).toString()];
        } else if (p1mode == 2) {
            return arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()];
        }
    } else if (instr === 5) {
        if (p1value != 0) {
            opidx[0] = Number(p2value);
        } else {
            opidx[0] += 3;
        }
    } else if (instr === 6) {
        if (p1value == 0) {
            opidx[0] = Number(p2value);
        } else {
            opidx[0] = Number(opidx[0]) + 3;
        }
    } else if (instr === 7) {
        if (p3mode === 0) {
            if (p1value < p2value) {
                arr[arr[(opidx[0] + 3).toString()].toString()] = 1;
            } else {
                arr[arr[(opidx[0] + 3).toString()].toString()] = 0;
            }
        } else if (p3mode === 2) {
            if (p1value < p2value) {
                arr[(relbase + arr[(opidx[0] + 3).toString()]).toString()] = 1;
            } else {
                arr[(relbase + arr[(opidx[0] + 3).toString()]).toString()] = 0;
            }
        }
    } else if (instr === 8) {
        // console.log("8P3: " + p3mode);
        if (p3mode === 0) {
            if (p1value == p2value) {
                arr[arr[(opidx[0] + 3).toString()].toString()] = 1;
            } else {
                arr[arr[(opidx[0] + 3).toString()].toString()] = 0;
            }
        } else {
            if (p1value == p2value) {
                arr[(relbase + arr[(opidx[0] + 3).toString()]).toString()] = 1;
            } else {
                arr[(relbase + arr[(opidx[0] + 3).toString()]).toString()] = 0;
            }
        }
    } else if (instr === 9) {
        if (p1mode == 0) {
            relbase += arr[arr[(opidx[0] + 1).toString()].toString()];
        } else if (p1mode == 1) {
            relbase += arr[(opidx[0] + 1).toString()];
        } else if (p1mode === 2) {
            relbase += arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()];
        }
    } else if (instr === 99) {
        return "done";
    }
}

const getLength = (arr, opidx) => {
    const op = arr[opidx]
    const instr = op % 100;
    if (instr === 1) {
        return 4;
    } else if (instr === 2) {
        return 4;
    } else if (instr === 3) {
        return 2;
    } else if (instr === 4) {
        return 2;
    } else if (instr === 5 || instr == 6) {
        return 0;
    } else if (instr === 7 || instr == 8) {
        return 4;
    } else if (instr === 9) {
        return 2; 
    } else if (instr === 99) {
        return 1;
    }
}

    const countNums = (arr) => {
        let ones = 0;
        for (let row of arr) {
            for (let char of row) {
                if (char == 1) {
                    ones++;
                }
            }
        }
        return ones;
    }

    const display = (arr) => {
        let printString = "";
        for (let thing of arr) {
            for (let char of thing) {
                if (char == 0) {
                    printString += " ";
                } else if (char == 1) {
                    printString += "#";
                } else {
                    printString += char;
                }
            }
            printString += "\n";
        }
        return printString;
    }

fs.readFile('Day 11/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const splitData = data.split(",").map(Number);
    let opcode = [0];
    let input = [1];
    const center = {x: 100, y: 100};
    let currPlace = {x: 100, y: 100};
    let direction = 0;
    let outputState = false;
    let board = [];
    for (let i = 0; i < center.y * 2; i++) {
        board.push([]);
        for (let j = 0; j < center.x * 2; j++) {
            board[i].push(0);
        }
    }
    let seenStates = [];
    for (let row of board) {
        seenStates.push([...row]);
    }
    let nvarr = {};
    for (let i = 0; i < splitData.length; i++) {
        nvarr[i] = splitData[i];
    }
    let total = 0;
    let complete = false;
    while (complete !== true) {
    // for (let i = 0; i < 20000; i++) {
        let lelength = getLength(nvarr, opcode[0]);
        // console.log("Length: " + opcode[0] + "|" + lelength);
        // console.log("Input: " + input);
        let output = changeVals(nvarr, opcode, input);
        if (output == "done") {
            // console.log("First slot: " + nvarr[0]);
            complete = true;
        } else if (!isNaN(output) && output != undefined) {
            // console.log("Output: " + output);
            // console.log(currPlace.y + "|" + currPlace.x + "|" + output);
            if (outputState == false) {
                board[currPlace.y][currPlace.x] = Number(output);
                if (seenStates[currPlace.y][currPlace.x] == 0) {
                    total++;
                }
                seenStates[currPlace.y][currPlace.x] = 1;
                // console.log(display(board));
                outputState = true;
            } else {
                if (output == 0) {
                    // console.log("woot");
                    if (direction == 0) {
                        direction = 3;
                    } else {
                        direction--;
                    }
                } else {
                    if (direction == 3) {
                        direction = 0;
                    } else {
                        direction++;
                    }
                }
                outputState = false;
                // console.log("Direction: " + direction);
                switch (direction) {
                    case 0:
                        currPlace.y--;
                        break;
                    case 1:
                        currPlace.x++;
                        break;
                    case 2:
                        currPlace.y++;
                        break;
                    case 3:
                        currPlace.x--;
                        break;
                    default:
                        console.log("BROKEN");
                        break;
                }
                console.log("Board: " + board[currPlace.y][currPlace.x]);
                input = [board[currPlace.y][currPlace.x]];
            }
            // complete = true;
        }
        opcode[0] += Number(lelength);
    }

    console.log(countNums(seenStates));
    console.log(total);
    // console.log(seenStates);
    console.log(display(board));
})