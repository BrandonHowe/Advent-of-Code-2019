const fs = require('fs');

const movePiece = (currentPos, board, dir) => {
    switch (dir) {
        case 0:
            if (board[currentPos.y - 1][currentPos.x] == 0) {
                board[currentPos.y][currentPos.x] = 0; 
                currentPos.y--;
                board[currentPos.y][currentPos.x] = 2; 
            } else if (board[currentPos.y - 1][currentPos.x] > 28) {
                let door = false;
                for (let i in board) {
                    for (let j in board[i]) {
                        if (board[i][j] == board[currentPos.y - 1][currentPos.x] - 25) {
                            door = true;
                            board[i][j] = 0;
                            board[currentPos.y][currentPos.x] = 0; 
                            currentPos.y--;
                            board[currentPos.y][currentPos.x] = 2; 
                        };
                    }
                }
                if (door === false) {
                    board[currentPos.y][currentPos.x - 1] = 0; 
                    board[currentPos.y][currentPos.x] = 0; 
                    currentPos.x--;
                    board[currentPos.y][currentPos.x] = 2;  
                }
            }
            break;
        case 1:
            if (board[currentPos.y][currentPos.x + 1] < 1) {
                board[currentPos.y][currentPos.x] = 0; 
                currentPos.x++;
                board[currentPos.y][currentPos.x] = 2; 
            } else if (board[currentPos.y][currentPos.x + 1] > 28) {
                let door = false;
                for (let i in board) {
                    for (let j in board[i]) {
                        if (board[i][j] == board[currentPos.y][currentPos.x + 1] - 32) {
                            door = true;
                            board[i][j] = 0; 
                            board[currentPos.y][currentPos.x] = 0; 
                            currentPos.x++;
                            board[currentPos.y][currentPos.x] = 2;   
                        };
                    }
                }
                if (door === false) {
                    board[currentPos.y][currentPos.x - 1] = 0; 
                    board[currentPos.y][currentPos.x] = 0; 
                    currentPos.x--;
                    board[currentPos.y][currentPos.x] = 2;  
                }
            }
            break;
        case 2:
            if (board[currentPos.y + 1][currentPos.x] < 1) {
                board[currentPos.y][currentPos.x] = 0; 
                currentPos.y++;
                board[currentPos.y][currentPos.x] = 2; 
            } else if (board[currentPos.y + 1][currentPos.x] > 28) {
                let door = false;
                for (let i in board) {
                    for (let j in board[i]) {
                        if (board[i][j] == board[currentPos.y + 1][currentPos.x] - 32) {
                            door = true;
                            board[i][j] = 0; 
                            board[currentPos.y][currentPos.x] = 0; 
                            currentPos.y++;
                            board[currentPos.y][currentPos.x] = 2;   
                        };
                    }
                }
                if (door === false) {
                    board[currentPos.y][currentPos.x - 1] = 0; 
                    board[currentPos.y][currentPos.x] = 0; 
                    currentPos.x--;
                    board[currentPos.y][currentPos.x] = 2;  
                }
            }
            break;
        case 3:
            if (board[currentPos.y][currentPos.x - 1] < 1) {
                board[currentPos.y][currentPos.x] = 0; 
                currentPos.x--;
                board[currentPos.y][currentPos.x] = 2; 
            } else if (board[currentPos.y][currentPos.x - 1] > 28) {
                let door = false;
                for (let i in board) {
                    for (let j in board[i]) {
                        if (board[i][j] == board[currentPos.y][currentPos.x - 1] - 32) {
                            door = true;
                            board[i][j] = 0; 
                            board[currentPos.y][currentPos.x] = 0; 
                            currentPos.x--;
                            board[currentPos.y][currentPos.x] = 2;   
                        };
                    }
                }
                if (door === false) {
                    board[currentPos.y][currentPos.x - 1] = 0; 
                    board[currentPos.y][currentPos.x] = 0; 
                    currentPos.x--;
                    board[currentPos.y][currentPos.x] = 2;  
                }
            }
            break;
    }
}

fs.readFile('Day 18/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n").map(l => l.split(""));
    console.log(splitData)
    let currentPos = {x: 0, y: 0};
    let board = [];
    for (let i in splitData) {
        board.push([]);
        for (let j in splitData[i]) {
            switch (splitData[i][j]) {
                case ".":
                    board[i].push(0);
                    break
                case "#":
                    board[i].push(1);
                    break;
                case "@":
                    currentPos.x = +j;
                    currentPos.y = +i;
                    board[i].push(2);
                    break;
                default:
                    board[i].push(splitData[i][j].charCodeAt(0) - 62);
                    break;
            }
        }
    }
    const craftBoard = (currPos, hit) => {
        let board = [];
        for (let i in splitData) {
            board.push([]);
            for (let j in splitData[i]) {
                switch (splitData[i][j]) {
                    case ".":
                        board[i].push(0);
                        break
                    case "#":
                        board[i].push(1);
                        break;
                    case "@":
                        board[i].push(0);
                        break;
                    default:
                        let bad = false;
                        for (let value of hit) {
                            if (value.toLowerCase() == splitData[i][j].toLowerCase()) {
                                bad = true;
                            }
                        }
                        if (bad == false) {
                            board[i].push(splitData[i][j].charCodeAt(0) - 62);
                        }
                        break;
                }
            }
        }
        board[currPos.y][currPos.x] = 2;
        return board;
    }
    const checkBoard = (input) => {
        let tempPos = {...currentPos}
        let tempboard = [];
        for (let row of board) {
            tempboard.push([...row]);
        }
        for (let value of input) {
            movePiece(tempPos, tempboard, value);
            // console.log(tempPos);
        }
        // console.log(board);
        for (let row of tempboard) {
            for (let val of row) {
                if (+val > 2) {
                    return false;
                }
            }
        }
        return true;
    }
    const checkBoardFor = (board, input, target) => {
        let tempPos = {...currentPos}
        let tempboard = [];
        for (let row of board) {
            tempboard.push([...row]);
        }
        for (let value of input) {
            movePiece(tempPos, tempboard, value);
            // console.log(tempPos);
        }
        // console.log(board);
        for (let row of tempboard) {
            for (let val of row) {
                if (+val == target.charCodeAt(0) - 62) {
                    return false;
                }
            }
        }
        return true;
    }
    const actuallyWorks = (board, input) => {
        let tempPos = {...currentPos};
        let tempboard = [];
        for (let row of board) {
            tempboard.push([...board]);
        }
        for (let i = 0; i < input.length - 1; i++) {
            movePiece(tempPos, tempboard, input[i]);
        }
        let prevArr = [];
        for (let row of tempboard) {
            prevArr.push([...row]);
        }
        movePiece(tempPos, tempboard, input[input.length - 1]);
        // console.log(prevArr);
        // console.log(board);
        for (let i in prevArr) {
            for (let j in prevArr[i]) {
                if (prevArr[i][j] != tempboard[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }
    const findHit = (board) => {
        for (let row of board) {
            for (let value of board) {
                
            }
        }
    }
    let layerNum = 0;
    let currentLayer = [{pos: [21, 21], hit: []}];
    let newLayer = [];
    const findPath = (target) => {
        let iter = 0;
        for (let j = 0; j < 5; j++) {
        // while (true) {
            layerNum++;
            console.log("Depth: " + layerNum);
            console.log("State count: " + currentLayer.length);
            console.log(currentLayer[currentLayer.length - 1])
            for (let input of currentLayer) {
                for (let i = 0; i < 4; i++) {
                    // console.log(newinput + "|" + i);
                    let newinput = [i];
                    let newboard = craftBoard(input.pos, input.hit);
                    // console.log(newinput);
                    // console.log(actuallyWorks(newinput));
                    if (actuallyWorks(newboard, newinput) == true) {
                        if (checkBoardFor(newboard, newinput, target) === true) {
                            console.log("Success!");
                            return newinput;
                        }
                        let output = {};
                        switch (i) {
                            case 0:
                                output.pos = {x: input.pos.x, y: input.pos.y - 1};
                                break;
                            case 1:
                                output.pos = {x: input.pos.x + 1, y: input.pos.y};
                                break;
                            case 2:
                                output.pos = {x: input.pos.x, y: input.pos.y + 1};
                                break;
                            case 3:
                                output.pos = {x: input.pos.x - 1, y: input.pos.y};
                                break;
                        }
                        output.hit = input.hit;
                        newLayer.push(output);
                    }
                }
            }
            currentLayer = [...newLayer];
            newLayer = [];
            iter++;
        }
    }
    // console.log(currentLayer);
    console.log(findPath("a").length);
    // movePiece(currentPos, board, 1);
    console.log(checkBoard([1,1,3,3,3,3,3,3]));
})