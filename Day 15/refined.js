const fs = require('fs');

let relbase = 0;

const display = (arr) => {
    let printString = "";
    for (let thing of arr) {
        for (let char of thing) {
            if (char == 0) {
                printString += "#";
            } else if (char == 1) {
                printString += " ";
            } else if (char == 2) {
                printString += "A";
            } else if (char == 3) {
                printString += "U";
            } else if (char == 4) {
                printString += "O";
            } else if (char == -1) {
                printString += ".";
            } else {
                printString += "G";
            }
        }
        printString += "\n";
    }
    return printString;
}
const changeVals = (arr, opidx, input) => {
    // console.log("Result: " + (arr[arr[opidx[0] + 1]] + arr[arr[opidx[0] + 2]]));
    const op = arr[opidx[0].toString()];
    // console.log("OP " + op + "|" + opidx[0] + "|" + relbase);
    const instr = op % 100;
    if (instr === 99) {
        return "done";
    }
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
            // console.log("not relbase");
            arr[arr[(opidx[0] + 1).toString()].toString()] = input.shift();
        } else if (p1mode == 2) {
            // console.log("Relbase: " + (relbase + "|" + (relbase + (opidx[0] + 1)).toString()));
            arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()] = input.shift();
        }
    } else if (instr === 4) {
        // console.log(relbase + arr[(opidx[0] + 1).toString()])
        // console.log("Output! It is " + arr[(relbase + arr[(opidx[0] + 1).toString()]).toString()]);
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

const intcode = (nvarr, opcode, input) => {
    // console.log(nvarr);
    let outputArr = [];
    let complete = false;
    relbase = 0;
    while (complete == false) {
    // for (let i = 0; i < 100; i++) {
        // console.log(relbase);
        // console.log(opcode[0]);
        // console.log(nvarr);
        let lelength = getLength(nvarr, opcode[0]);
        // console.log("Length: " + opcode[0] + "|" + lelength);
        let output = changeVals(nvarr, opcode, input);
        if (output == "done") {
            // console.log("First slot: " + nvarr[0]);
            complete = true;
            return outputArr;
        } else if (output == Number(output)) {
            // console.log("Output: " + output);
            outputArr.push(output);
        }
        opcode[0] += Number(lelength);
    }
}

const convertString = (string) => {
    let arr = string.split(",").map(Number);
    let result = {};
    for (let i in arr) {
        result[i] = arr[i];
    }
    return result;
}

const createBoard = (x, y, val) => {
    let board = [];
    for (let i = 0; i < y; i++) {
        board.push([]);
        for (let j = 0; j < x; j++) {
            board[i].push(val);
        }
    }
    return board;
}

fs.readFile('Day 15/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split(",").map(Number);
    let opcode = [0];
    let nvarr = {};
    for (let i = 0; i < splitData.length; i++) {
        nvarr[i] = splitData[i];
    }
    let board = createBoard(41, 41, -1);
    for (let i in board) {
        for (let j in board) {
            if (i == 0 || i == 40 || j == 0 || j == 40) {
                board[i][j] = 0;
                continue;
            }
            if (i%2 == 0 && j%2 == 0) {
                board[i][j] = 0;
                continue;
            }
            if (i%2 == 1 && j%2 == 1) {
                board[i][j] = 1;
                continue;
            }
        }
    }
    let cp = {x: 21, y: 21};
    let currentPos = {x: 21, y: 21};
    let input = [];
    const doThing = (input, currentPos) => {
    let top = 10000;
    for (let i = 0; i < top; i++) {
        if (i % (top / 100) == 0) {
            // console.log((i / (top / 100)) + "% finished.")
        }
        let newnum;
        if (cp.y%2 == 1 && cp.x%2 == 1) {
            newnum = Math.ceil(Math.random() * 4);
        } else if (cp.y % 2 == 0 && cp.x % 2 == 1) {
            newnum = Math.ceil(Math.random() * 2);
        } else if (cp.y % 2 == 1 && cp.x % 2 == 0) {
            newnum = Math.ceil(Math.random() * 2) + 2;
        } else {
            newnum = Math.ceil(Math.random() * 4);
        }
        if (newnum === 1 && input[input.length - 1] == 2) {

        } else if (newnum === 2 && input[input.length - 1] == 3) {

        } else if (newnum === 3 && input[input.length - 1] == 4) {
            
        } else if (newnum === 4 && input[input.length - 1] == 3) {
        
        } else {
            input.push(newnum);
            // let output = intcode({...nvarr}, [...opcode], [...input]);
            // if (output[output.length - 1] != 0) {
                switch (newnum) {
                    case 1:
                        cp.y--;
                        break;
                    case 2:
                        cp.y++;
                        break;
                    case 3:
                        cp.x--;
                        break;
                    case 4:
                        cp.x++;
                        break;
                }
            // }
        }
    }
    // console.log(input);
    let output = intcode({...nvarr}, [...opcode], [...input]);
    // console.log("Output printed.");
    let prevMove = 2;
    let dist = 0;
    for (let i in output) {
        // console.log(i + "/" + output.length + " complete.");
        prevMove = input[i - 1];
        if (output[i] === 2) {
            console.log("Distance: " + dist);
            break;
        }
        switch (input[i]) {
            case 1:
                if (output[i] === 1) {
                    if (prevMove == 2) {
                        dist--;
                    } else {
                        dist++;
                    }
                    board[currentPos.y--][currentPos.x] = 1;
                } else {
                    board[currentPos.y - 1][currentPos.x] = output[i];
                }
                break;
            case 2:
                if (output[i] === 1) {
                    if (prevMove == 1) {
                        dist--;
                    } else {
                        dist++;
                    }
                    board[currentPos.y++][currentPos.x] = 1;
                } else {
                    board[currentPos.y + 1][currentPos.x] = output[i];
                }
                break;
            case 3:
                if (output[i] === 1) {
                    if (prevMove == 4) {
                        dist--;
                    } else {
                        dist++;
                    }
                    board[currentPos.y][currentPos.x--] = 1;
                } else {
                    board[currentPos.y][currentPos.x - 1] = output[i];
                }
                break;
            case 4:
                if (output[i] === 1) {
                    if (prevMove == 3) {
                        dist--;
                    } else {
                        dist++;
                    }
                    board[currentPos.y][currentPos.x++] = 1;
                } else {
                    board[currentPos.y][currentPos.x + 1] = output[i];
                }
                break;
        }
    }
    console.log(dist);
    console.log(display(board));
    console.log(currentPos);
    }
    doThing(input, currentPos);
    doThing(input, currentPos);
    doThing(input, currentPos);
    // console.log(output);
})