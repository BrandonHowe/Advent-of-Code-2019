const fs = require('fs');
const _ = require("lodash");

const display = (arr) => {
    let printString = "";
    for (let thing of arr) {
        for (let char of thing) {
            if (char == 0) {
                printString += ".";
            } else if (char == 1) {
                printString += "#";
            } else if (char == 2) {
                printString += "A";
            } else if (char == 3) {
                printString += "U";
            } else if (char == 4) {
                printString += "O";
            } else if (char == -1) {
                printString += " ";
            } else {
                printString += char;
            }
        }
        printString += "\n";
    }
    return printString;
}

const deleteIndex = (arr, match) => {
    for (let i in arr) {
        if (arr[i] == match) {
            arr.splice(i, 1);
        }
    }
}

const replaceIndex = (arr, match, dest) => {
    for (let i in arr) {
        i = +i;
        for (let j in arr[i]) {
            j = +j;
            if (arr[i][j] == match) {
                arr[i][j] = dest;
            }
        }
    }
}

const genBoard = (base, keys, currentLoc) => {
    let newbase = [];
    for (let row of base) {
        newbase.push([...row]);
    }
    replaceIndex(newbase, "@", ".");
    for (let value of keys) {
        replaceIndex(newbase, value.toLowerCase(), ".");
        replaceIndex(newbase, value.toUpperCase(), ".");
    }
    newbase[currentLoc.y][currentLoc.x] = "@";
    return newbase;
}

const move = (iboard, keys, currentLoc, direction) => {
    let board = [];
    for (let row of iboard) {
        board.push([...row]);
    }
    switch (direction) {
        case 0:
            if (board[currentLoc.y - 1][currentLoc.x] != "#") {
                if (board[currentLoc.y - 1][currentLoc.x] == ".") {
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y - 1][currentLoc.x] = "@";
                    currentLoc.y--;
                } else if (board[currentLoc.y - 1][currentLoc.x].toLowerCase() === board[currentLoc.y - 1][currentLoc.x] && board[currentLoc.y - 1][currentLoc.x] != "@") {
                    keys.push(board[currentLoc.y - 1][currentLoc.x]);
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y - 1][currentLoc.x] = "@";
                    currentLoc.y--;
                }
            }
            break;
        case 1:
            if (board[currentLoc.y][currentLoc.x + 1] != "#") {
                if (board[currentLoc.y][currentLoc.x + 1] == ".") {
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y][currentLoc.x + 1] = "@";
                    currentLoc.x++;
                } else if (board[currentLoc.y][currentLoc.x + 1].toLowerCase() === board[currentLoc.y][currentLoc.x + 1] && board[currentLoc.y][currentLoc.x + 1] != "@") {
                    keys.push(board[currentLoc.y][currentLoc.x + 1]);
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y][currentLoc.x + 1] = "@";
                    currentLoc.x++;
                }
            }
            break;
        case 2:
            if (board[currentLoc.y + 1][currentLoc.x] != "#") {
                if (board[currentLoc.y + 1][currentLoc.x] == ".") {
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y + 1][currentLoc.x] = "@";
                    currentLoc.y++;
                } else if (board[currentLoc.y + 1][currentLoc.x].toLowerCase() === board[currentLoc.y + 1][currentLoc.x] && board[currentLoc.y + 1][currentLoc.x] != "@") {
                    keys.push(board[currentLoc.y + 1][currentLoc.x]);
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y + 1][currentLoc.x] = "@";
                    currentLoc.y++;
                }
            }
            break;
        case 3:
            if (board[currentLoc.y][currentLoc.x - 1] != "#") {
                if (board[currentLoc.y][currentLoc.x - 1] == ".") {
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y][currentLoc.x - 1] = "@";
                    currentLoc.x--;
                } else if (board[currentLoc.y][currentLoc.x - 1].toLowerCase() === board[currentLoc.y][currentLoc.x - 1] && board[currentLoc.y][currentLoc.x - 1] != "@") {
                    keys.push(board[currentLoc.y][currentLoc.x - 1]);
                    replaceIndex(board, "@", ".");
                    board[currentLoc.y][currentLoc.x - 1] = "@";
                    currentLoc.x--;
                }
            }
            break;
    }
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const countKeys = (board) => {
    let total = 0;
    let seen = [];
    for (let row of board) {
        for (let value of row) {
            if (seen.indexOf(value.toLowerCase()) === -1 && isLetter(value)) {
                seen.push(value.toLowerCase());
                total++;
            }
        }
    }
    return total;
}

fs.readFile('Day 18/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n").map(l => l.split(""));
    // //console.log(splitData);
    let currentPos = {x: 0, y: 0};
    for (let i in splitData) {
        i = +i;
        //console.log(typeof i);
        for (let j in splitData[i]) {
            j = +j
            if (splitData[i][j] == "@") {
                currentPos.y = i;
                currentPos.x = j;
            }
        }
    }
    replaceIndex(splitData, "@", ".");
    let totalKeys = countKeys(splitData);
    //console.log(display(splitData));
    let smallestDist = 999999999;
    let keys = [];
    let states = [{keys: [...keys], currentPos: {...currentPos}, dist: 1}];
    let newstates = [];
    for (let i = 0; i < 150; i++) {
        console.log(i + "th iteration: " + states.length);
        for (let value of states) {
            let oldvalue = {}
            for (let j = 0; j < 4; j++) {
                oldvalue.keys = [...value.keys];
                oldvalue.currentPos = {...value.currentPos};
                oldvalue.dist = i;
                let leboard = genBoard([...splitData], oldvalue.keys, oldvalue.currentPos)
                // console.log(display(leboard));
                move(genBoard([...leboard], oldvalue.keys, oldvalue.currentPos), oldvalue.keys, oldvalue.currentPos, j);
                // console.log(oldvalue);
                // console.log(value);
                // console.log("\n");
                if (_.isEqual(oldvalue.keys, value.keys) == false || _.isEqual(oldvalue.currentPos, value.currentPos) == false) {
                    // if (_.isEqual(oldvalue.keys, value.keys) == true && _.isEqual(oldvalue.currentPos, value.currentPos) == true) {

                    // } else {
                        newstates.push({keys: [...oldvalue.keys],   currentPos: {...oldvalue.currentPos}, dist: i});
                    // }
                    // console.log(newstates.length);
                }
            }
        }
        for (let value of newstates) {
            let newval  = {...value};
            newval.dist = i + 1;
            states.push(newval);
        }
        states = _.uniqWith(states, _.isEqual);
        for (let i in states) {
            for (let j in states) {
                if (i == j) {
                    continue;
                }
                if (_.isEqual(states[i].currentPos,states[j].currentPos)) {
                    if (_.isEqual(states[i].keys, states[j].keys)) {
                        if (states[i].dist < states[j].dist) {
                            states.splice(j, 1);
                            j--;
                        } else {
                            states.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        }
        for (let row of states) {
            if (row.keys.length == totalKeys) {
                console.log(row.dist);
                if (row.dist < smallestDist) {
                    return;
                    break;
                    smallestDist = row.dist;
                }
            }
        }
        // console.log(states);
        newstates = [];
    }
    // //console.log(newstates);
    console.log(keys);
    console.log(currentPos);
    // //console.log(_.uniqWith(states, _.isEqual));
    for (let row of states) {
        if (row.keys.length == totalKeys) {
            console.log(row.dist);
            if (row.dist < smallestDist) {
                smallestDist = row.dist;
            }
        }
    }
    console.log("Smallest distance: " + smallestDist);
    //console.log(display(genBoard(splitData, keys, currentPos)));
})