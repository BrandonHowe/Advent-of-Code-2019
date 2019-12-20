const fs = require('fs');

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

const evaluateOne = (board, depth) => {
    for (let i in board) {
        for (let j in board[i]) {
            if (board[+i][+j] == depth) {
                if (i - 1 >= 0) {
                    if (board[+i - 1][+j] == 0) {
                        board[+i - 1][+j] = depth + 1;
                    } else if (board[+i-1][+j] != -1 && board[+i-1][+j] != -2) {
                        let firstportal = board[+i-2][+j] + board[+i-1][+j];
                        for (let i in board) {
                            for (let j in board[+i]) {
                                if (board[+i][+j] == firstportal[0]) {
                                    if (board[+i][+j + 1] == firstportal[1]) {
                                        if (board[+i][+j + 2] == 0) {
                                            board[+i][+j + 2] = depth;
                                        } else if (board[+i][+j - 1] == 0) {
                                            board[+i][+j - 1] = depth;
                                        }
                                    } else if (board[+i+1][+j] == firstportal[1]) {
                                        if (board[+i + 2][+j] == 0) {
                                            board[+i + 2][+j] = depth;
                                        } else if (board[+i - 1][+j] == 0) {
                                            board[+i - 1][+j] = depth;
                                        }
                                    }
                                }
                            }
                        }
                    }
                if (i + 1 < board.length) {
                    if (board[+i + 1][+j] == 0) {
                        board[+i + 1][+j] = depth + 1;
                    } else if (board[+i+1][+j] != -1 && board[+i+1][+j] != -2) {
                        let firstportal = board[+i+1][+j] + board[+i+2][+j];
                        for (let i in board) {
                            for (let j in board[+i]) {
                                if (board[+i][+j] == firstportal[0]) {
                                    if (board[+i][+j + 1] == firstportal[1]) {
                                        if (board[+i][+j + 2] == 0) {
                                            board[+i][+j + 2] = depth;
                                        } else if (board[+i][+j - 1] == 0) {
                                            board[+i][+j - 1] = depth;
                                        }
                                    } else if (board[+i+1][+j] == firstportal[1]) {
                                        if (board[+i + 2][+j] == 0) {
                                            board[+i + 2][+j] = depth;
                                        } else if (board[+i - 1][+j] == 0) {
                                            board[+i - 1][+j] = depth;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (j + 1 < board[0].length) {
                    if (board[+j][+j + 1] == 0) {
                        board[+j][+j + 1] = depth + 1;
                    } else if (board[+i][+j + 1] != -1 && board[+i][+j+1] != -2) {
                        let firstportal = board[+i][+j+1] + board[+i][+j+2];
                        for (let i in board) {
                            for (let j in board[+i]) {
                                if (board[+i][+j] == firstportal[0]) {
                                    if (board[+i][+j + 1] == firstportal[1]) {
                                        if (board[+i][+j + 2] == 0) {
                                            board[+i][+j + 2] = depth;
                                        } else if (board[+i][+j - 1] == 0) {
                                            board[+i][+j - 1] = depth;
                                        }
                                    } else if (board[+i+1][+j] == firstportal[1]) {
                                        if (board[+i + 2][+j] == 0) {
                                            board[+i + 2][+j] = depth;
                                        } else if (board[+i - 1][+j] == 0) {
                                            board[+i - 1][+j] = depth;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (j - 1 >= 0) {
                    if (board[+j][+j + 1] == 0) {
                        board[+j][+j + 1] = depth + 1;
                    } else if (board[+i][+j + 1] != -1 && board[+i][+j+1] != -2) {
                        let firstportal = board[+i][+j-2] + board[+i][+j-1];
                        for (let i in board) {
                            for (let j in board[+i]) {
                                if (board[+i][+j] == firstportal[0]) {
                                    if (board[+i][+j + 1] == firstportal[1]) {
                                        if (board[+i][+j + 2] == 0) {
                                            board[+i][+j + 2] = depth;
                                        } else if (board[+i][+j - 1] == 0) {
                                            board[+i][+j - 1] = depth;
                                        }
                                    } else if (board[+i+1][+j] == firstportal[1]) {
                                        if (board[+i + 2][+j] == 0) {
                                            board[+i + 2][+j] = depth;
                                        } else if (board[+i - 1][+j] == 0) {
                                            board[+i - 1][+j] = depth;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
}

fs.readFile('Day 20/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n").map(l => l.split(""));
    for (let i in splitData) {
        for (let j in splitData[i]) {
            switch (splitData[i][j]) {
                case " ":
                    splitData[i][j] = -1;
                    break;
                case "#":
                    splitData[i][j] = 1;
                    break;
                case ".":
                    splitData[i][j] = 0;
                    break;
            }
        }
    }
    let distb = [];
    for (let i = 0; i < splitData.length; i++) {
        distb.push([]);
        for (let j = 0; j < splitData[i].length; j++) {
            switch (splitData[i][j]) {
                case -1:
                    distb[i].push(-2);
                    break;
                case 0:
                    distb[i].push(0);
                    break;
                case 1:
                    distb[i].push(-1);
                    break;
                default:
                    distb[i].push(splitData[i][j]);
                    break;
            }
        }
    }
    let depth = 1;
    // console.log(splitData[1]);
    for (let i = 0; i < splitData.length - 1; i++) {
        for (let j = 0; j < splitData.length; j++) {
            // console.log((+i + 1) + "|" + j);
            // console.log(splitData[+i][+j] + "|" + splitData[+i][+j + 1] + "|" + splitData[+i+1][+j] + "|" + i + "|" + j);
            if (splitData[+i][+j] == "A") {
                if (splitData[+i][+j + 1] == "A") {
                    if (splitData[+i][+j + 2] == 0) {
                        distb[+i][+j + 2] = depth;
                    } else if (splitData[i][j - 1] == 0) {
                        distb[+i][+j - 1] = depth;
                    }
                } else if (splitData[+i+1][+j] == "A") {
                    if (distb[+i + 2][+j] == 0) {
                        distb[+i + 2][+j] = depth;
                    } else if (splitData[+i - 1][+j] == 0) {
                        distb[+i - 1][+j] = depth;
                    }
                }
            }
        }
    }
    evaluateOne(distb, 1)
    console.log(display(distb));
})