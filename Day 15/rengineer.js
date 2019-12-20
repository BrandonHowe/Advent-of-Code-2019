const fs = require("fs");

const display = (arr) => {
    let printString = "";
    for (let thing of arr) {
        for (let char of thing) {
            if (char == -1) {
                printString += ".";
            } else if (char == 0) {
                printString += " ";
            } else if (char == 1) {
                printString += "#";
            } else if (char == 2) {
                printString += "A";
            } else if (char == 3) {
                printString += "S";
            } else {
                printString += "G";
            }
        }
        printString += "\n";
    }
    return printString;
}

let board = [];
for (let i = 0; i < 41; i++) {
    board.push([]);
    for (let j = 0; j < 41; j++) {
        board[i].push(-1);
    }
}

fs.readFile("Day 15/solution.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let splitData = data.split(",").slice(252).map(Number);
    let BLOCKINESS = [...splitData];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (i == 0 || i == 40 || j == 0 || j == 40) {
                board[i][j] = 1;
            } else if (i % 2 == 0 && j % 2 == 0) {
                board[i][j] = 1;
            } else if (i % 2 == 1 && j % 2 == 1) {
                board[i][j] = 0;
            } else {
                // console.log((i % 2) +"|" + (j % 2))
                let status = (Math.floor((i - 1)/2) + ((i + 1)%2) - 1) * 39 + j - 1;
                if (status > BLOCKINESS.length) {
                    board[i][j] = 1;
                } else {
                    console.log((Math.floor(i/2) + i%2) * 39 + +j - 1 + "|" + i + "|" + j + "|" + BLOCKINESS[(Math.floor((i - 1)/2) + (i%2) - 1) * 39 + +j - 1]);
                    if (BLOCKINESS[(Math.floor((i - 1)/2) + ((i + 1)%2) - 1) * 39 + j - 1] < 45) {
                        board[i][j] = 1;
                    } else {
                        board[i][j] = 0;
                    }
                    // board[i][j] = BLOCKINESS[((Math.floor(i/2) + (i%2) - 1)*39) + j - 1] < 45 ? 1 : 0;
                }
            }
        }
    }
    board[39][1] = 2;
    board[21][21] = 3;
    console.log(display(board));
})