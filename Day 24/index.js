const fs = require('fs');

const evalBoard = (board) => {
    let newboard = [];
    for (let row of board) {
        newboard.push([...row]);
    }
    for (let i in board) {
        for (let j in board[i]) {
            i = +i;
            j = +j;
            let count = 0;
            if (i - 1 >= 0) {
                if (board[i - 1][j] == 1) {
                    count++;
                }
            }
            if (i + 1 < board.length) {
                if (board[i + 1][j] == 1) {
                    count++;
                }
            }
            if (j + 1 < board[0].length) {
                if (board[i][j + 1] == 1) {
                    count++;
                }
            }
            if (j - 1 >= 0) {
                if (board[i][j - 1] == 1) {
                    count++;
                }
            }
            if (board[i][j] == 0) {
                if (count == 1 || count == 2) {
                    newboard[i][j] = 1;
                }
            } else if (board[i][j] == 1) {
                if (count != 1) {
                    newboard[i][j] = 0;
                }
            }
        }
    }
    return newboard;
}

const findBio = (board) => {
    let total = 0;
    for (let i in board) {
        for (let j in board[i]) {
            i = +i;
            j = +j;
            let biocount = i*5 + j;
            biocount = Math.pow(2, biocount);
            if (board[i][j] == 1) {
                total += biocount;
            }
        }
    }
    return total
}

const decomposeBio = (num) => {
    let newboard = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    for (let i = 24; i >= 0; i--) {
        if (num >= Math.pow(2, i)) {
            console.log(Math.floor(i / 5) + "|" + (i % 5));
            newboard[Math.floor(i / 5)][i % 5] = 1;
            num -= Math.pow(2, i);
        }
    }
    return newboard;
}

fs.readFile('solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\r\n").map(l => l.split(""));
    for (let i in splitData) {
        for (let j in splitData[i]) {
            const value = splitData[i][j];
            if (value === "#") {
                splitData[i][j] = 1;
            } else if (value === ".") {
                splitData[i][j] = 0;
            }
        }
    }
    let seen = [];
    let done = false;
    while (done == false) {
        splitData = evalBoard(splitData);
        let newbio = findBio(splitData);
        if (seen.indexOf(newbio) >= 0) {
            console.log(newbio);
            console.log(decomposeBio(newbio));
            done = true;
            break;
        }
        seen.push(newbio);
    }
    let layers = [];
})